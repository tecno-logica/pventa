import argon2 from "argon2";
import { Company } from "../db/entities/onlineusers/Company";
import { MyContext } from "../types";
import {
  Arg,
  Ctx,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";

import { User } from "../db/entities/onlineusers/User";
import {
  UsernamePasswordInput,
  UsernamePasswordRoleInput,
} from "../types/UsernamePasswordInput";
import FieldError from "../types/FieldError";
import { CompanyUserPivot } from "../db/entities/onlineusers/CompanyUserPivot";
import { PUser } from "../db/entities/pventa/Usuario";
import { Vendedor } from "../db/entities/pventa/Vendedor";
import { Connection, getConnection } from "typeorm";
import { SESSION_COOKIE_NAME } from "../constants";
import { createPventaConnection } from "../utils/createPventaConnection";
import { createConnectionName } from "../utils/createConnectionName";
import { Config } from "../db/entities/pventa/Config";

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

@ObjectType()
class UserResponseWithPassword extends UserResponse {
  @Field(() => String, { nullable: true })
  password?: string;
}

@Resolver()
export class UserResolver {
  @Query(() => User, { nullable: true })
  async me(@Ctx() { req }: MyContext): Promise<User | null> {
    if (!req.session?.user?.id) {
      return null;
    }
    const currentUser = await User.findOne(req.session.user.id);
    return currentUser || null;
  }

  @Mutation(() => UserResponseWithPassword)
  async register(
    @Arg("options") { cedula, password, role }: UsernamePasswordRoleInput,
    @Ctx() { req }: MyContext
  ): Promise<UserResponseWithPassword> {
    const companyIsSelected = !!req.session.companyId;

    if (role !== 1 && companyIsSelected)
      return {
        errors: [{ field: "cedula", message: "Elija una empresa." }],
      };

    if (!cedula)
      return {
        errors: [{ field: "cedula", message: "ingrece una cedula" }],
      };

    if (!(cedula.length >= 9))
      return {
        errors: [{ field: "cedula", message: "debe mas de 9 caracteres" }],
      };

    if (!(cedula.length <= 11))
      return {
        errors: [
          { field: "cedula", message: "debe tener menos de 11 caracteres" },
        ],
      };

    if (!role)
      return {
        errors: [{ field: "role", message: "el campo rol es requerido" }],
      };

    if (!(role >= 1 && role <= 3))
      return {
        errors: [{ field: "role", message: "rol invalido" }],
      };

    let newPassword: string;
    let pUser: PUser | undefined;
    let seller: Vendedor | undefined;

    if (role === 1) {
      if (!password || !(password.length >= 6))
        return {
          errors: [
            {
              field: "password",
              message: "la contraseña debe tener mas de 6 caracteres.",
            },
          ],
        };

      newPassword = password || "";
    } else if (companyIsSelected) {
      let currentCompany = await Company.findOne(req.session.companyId);
      if (!currentCompany)
        return {
          errors: [
            { field: "cedula", message: "No se pudo encontrar la empresa." },
          ],
        };

      // Checking if connection already exist
      const connectionName = createConnectionName(
        currentCompany.rnc,
        currentCompany.name
      );
      let pventaConnection: Connection;
      try {
        // This will throw an error if it doesn't
        pventaConnection = getConnection(connectionName);
      } catch (err) {
        try {
          // Now we try connecting if we didn't find it
          pventaConnection = await createPventaConnection(
            connectionName,
            currentCompany.dbHost,
            currentCompany.dbUser,
            currentCompany.dbPassword,
            currentCompany.dbName
          );
        } catch (err) {
          // if we cannot connect for some reason make sure the user knows
          return {
            errors: [
              { field: "cedula", message: "Error de conexion a la empresa." },
            ],
          };
        }
      }

      Config.useConnection(pventaConnection);
      switch (role) {
        // Role 1 (ADMIN) already taken care of on top (password should be given)
        case 2:
          PUser.useConnection(pventaConnection);
          pUser = await PUser.findOne({ where: { CEDULA: cedula } });
          if (!pUser)
            return {
              errors: [
                {
                  field: "cedula",
                  message: "Usuario con cedula " + cedula + " no encontrado",
                },
              ],
            };

          newPassword = pUser.NAMES?.split(" ")[0] + currentCompany.rnc + "123";

          break;
        case 3:
          Vendedor.useConnection(pventaConnection);
          seller = await Vendedor.findOne({ where: { Cedula: cedula } });
          if (!seller)
            return {
              errors: [
                {
                  field: "cedula",
                  message: "Vendedor con cedula " + cedula + " no encontrado",
                },
              ],
            };

          newPassword =
            seller.Nombre?.split(" ")[0] + currentCompany.rnc + "123";

          break;
        default:
          // wating one more line of code actually
          newPassword = Math.random() * 10 + cedula;
          break;
      }

      // But if the user hasn't selected a company then just randomize the password
    } else newPassword = Math.random() * 10 + cedula;

    const hashedPassword = await argon2.hash(newPassword);
    let names = "";
    if (pUser?.NAMES) {
      names = pUser.NAMES;
    } else if (seller?.Nombre) {
      names = seller.Nombre;
    }
    let firstName = "";
    let lastName = "";
    if (names) {
      firstName = names.split(" ")[0];
      lastName = names.split(" ")[0];
    }
    const createdUser = await User.create({
      cedula,
      password: hashedPassword,
      firstName,
      lastName,
    }).save();

    let link: CompanyUserPivot | undefined;

    if (companyIsSelected && (pUser || seller)) {
      link = await CompanyUserPivot.create({
        companyId: req.session.companyId,
        userId: createdUser.id,
        role,
      }).save();
    }

    if (!link)
      return {
        errors: [
          {
            field: "cedula",
            message: "No se pudo registrar el usuario a la empresa",
          },
        ],
      };

    return { user: createdUser, password: newPassword };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("options") options: UsernamePasswordInput,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    if (!options.cedula)
      return {
        errors: [{ field: "cedula", message: "ingrece una cedula" }],
      };

    const user = await User.findOne({ where: { cedula: options.cedula } });
    if (!user) {
      return {
        errors: [{ field: "cedula", message: "Usuario no registrado." }],
      };
    }
    if (!options.password)
      return {
        errors: [
          {
            field: "password",
            message: "ingrese una contraseña.",
          },
        ],
      };

    const validPassword = await argon2.verify(user.password, options.password);

    if (!validPassword) {
      return {
        errors: [
          { field: "password", message: "Las contraseñas no coinciden" },
        ],
      };
    }
    let pUser: PUser | undefined;
    let seller: Vendedor | undefined;

    if (req.session.companyId) {
      let pventaConnection = getConnection(req.session.connectionName);

      var link = await CompanyUserPivot.findOne({
        where: {
          companyId: req.session.companyId,
          userId: user.id,
        },
      });

      PUser.useConnection(pventaConnection);
      Vendedor.useConnection(pventaConnection);

      switch (user.role) {
        case 1:
          pUser = await PUser.findOne({ where: { USERID: "ADMIN" } });
          break;
        case 2:
          pUser = await PUser.findOne({ where: { CEDULA: options.cedula } });
          break;
        case 3:
          seller = await Vendedor.findOne({
            where: { CEDULA: options.cedula },
          });
          break;
        default:
          break;
      }

      if (!seller && !pUser)
        return {
          errors: [
            {
              field: "cedula",
              message: "Usuario no registrado en la empresa",
            },
          ],
        };
    }

    const role = link?.role || user.role;

    req.session.user = {
      id: user.id,
      role,
      cedula: options.cedula,
    };

    return { user };
  }

  @Mutation(() => Boolean)
  async logout(@Ctx() { req, res }: MyContext) {
    return await new Promise((resolve) =>
      req.session.destroy((err) => {
        if (err) {
          console.log(err);
          resolve(false);
          return;
        }
        res.clearCookie(SESSION_COOKIE_NAME);
        resolve(true);
      })
    );
  }
}
