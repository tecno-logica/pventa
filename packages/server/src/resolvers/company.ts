import { Company } from "../db/entities/onlineusers/Company";
import { MyContext } from "src/types";
import {
  Arg,
  Ctx,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";

import { CompanyRegistrationInput } from "../types/CompanyRegistrationInput";
import { Connection, createConnection, getConnection } from "typeorm";
import FieldError from "../types/FieldError";
import isError from "../utils/isError";
import { Config } from "../db/entities/pventa/Config";

import {
  ACCESSDENIEDERROR,
  DBACCESS_DENIED_ERRNO,
  EAI_AGAIN,
  EBADDB,
  ENOTFOUND,
  ENOTSUPPORTEDAUTHMETHOD,
} from "../constants";
import isMysqlError from "../utils/isMysqlError";
import { decrypt, encrypt } from "../utils/encription";
import CompanyLoginInput from "../types/CompanyLoginInput";
import { CompanyUserPivot } from "../db/entities/onlineusers/CompanyUserPivot";
import { createConnectionName } from "../utils/createConnectionName";
import {
  createPventaConnection,
  createPventaConnectionOptions,
} from "../utils/createPventaConnection";
import { hasCompany } from "../middleware/hasCompany";
import { isAuth } from "src/middleware/isAuth";

@ObjectType()
class CompanyResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Company, { nullable: true })
  company?: Company;

  @Field(() => Config, { nullable: true })
  config?:
    | Config
    | {
        Direccion?: string;
        FirmaDigital?: string;
        Logo?: string;
      };
}

@Resolver()
export class CompanyResolver {
  @Query(() => CompanyResponse)
  @UseMiddleware(hasCompany)
  async currentCompany(@Ctx() { req }: MyContext): Promise<CompanyResponse> {
    const company = await Company.findOne(req.session.company.id);

    const config = await getConnection(req.session.connectionName)
      .getRepository(Config)
      .findOne();

    return {
      company,
      config: {
        ...config,
        Direccion: config?.Direccion.toString(),
        FirmaDigital: config?.FirmaDigital.toString(),
        Logo: config?.Logo?.toString(),
      },
    };
  }

  @Mutation(() => CompanyResponse)
  @UseMiddleware(isAuth)
  async loginCompany(
    @Arg("options") { name }: CompanyLoginInput,
    @Ctx() { req }: MyContext //
  ): Promise<CompanyResponse> {
    let company = await Company.findOne({ name });

    if (!company)
      return {
        errors: [{ field: "name", message: "empresa no encontrada" }],
      };

    if (req.session?.user?.id && req.session?.user?.role !== 1) {
      const link = await CompanyUserPivot.findOne({
        where: { companyId: company.id, userId: req.session.user.id },
      });

      if (!link)
        return {
          errors: [
            { field: "name", message: "usuario no registrado en la empresa" },
          ],
        };
    }

    const connectionName = createConnectionName(company.rnc, name);
    let connection: Connection;
    try {
      connection = await getConnection(connectionName);
    } catch (err) {
      const dbPassword = company.dbPassword;
      console.log(dbPassword);
      connection = await createPventaConnection(
        connectionName,
        company.dbHost,
        company.dbUser,
        dbPassword,
        company.dbName
      );
    }
    if (!connection.isConnected) {
      console.log("turns out it wasn't connected");
      await connection.connect();
    }
    Config.useConnection(connection);
    const configRepository = connection.getRepository(Config);
    const config = await configRepository.findOne();

    req.session.connectionName = connectionName;
    req.session.company = { id: company.id, rnc: company.rnc };

    return {
      company,
      config: {
        ...config,
        Direccion: config?.Direccion.toString(),
        FirmaDigital: config?.FirmaDigital.toString(),
        Logo: config?.Logo?.toString(),
      },
    };
  }

  @Mutation(() => CompanyResponse)
  async registerCompany(
    @Arg("options")
    { host, database, password, username }: CompanyRegistrationInput,
    @Ctx() { req }: MyContext
  ): Promise<CompanyResponse> {
    if (!host)
      return {
        errors: [{ field: "host", message: "ingrece un host" }],
      };

    if (!database)
      return {
        errors: [{ field: "database", message: "ingrece el nombre" }],
      };

    if (!username)
      return {
        errors: [{ field: "username", message: "ingrece un usuario" }],
      };

    if (!password)
      return {
        errors: [{ field: "password", message: "ingrece una contraseña" }],
      };
    let pventaConnection: Connection | undefined;

    let connectionOptions = createPventaConnectionOptions(
      Math.random().toString(),
      host,
      username,
      password,
      database
    );

    try {
      pventaConnection = await createConnection(connectionOptions);
    } catch (err) {
      if (isError(err)) {
        switch (err.code) {
          case EAI_AGAIN:
            return {
              errors: [
                {
                  field: "host",
                  message: "host no encontrado.",
                },
              ],
            };
          case ENOTFOUND:
            return {
              errors: [
                {
                  field: "host",
                  message: "host no encontrado.",
                },
              ],
            };
        }
      }
      if (isMysqlError(err)) {
        switch (err.errno) {
          case EBADDB:
            return {
              errors: [
                {
                  field: "database",
                  message: "base de datos no encontrada.",
                },
              ],
            };
          case DBACCESS_DENIED_ERRNO:
            return {
              errors: [
                {
                  field: "username",
                  message: "usuario no autorizado a la base de datos.",
                },
              ],
            };

          case ENOTSUPPORTEDAUTHMETHOD:
            return {
              errors: [
                {
                  field: "username",
                  message: "usuario no encontrado.",
                },
              ],
            };

          case ACCESSDENIEDERROR:
            return {
              errors: [
                {
                  field: "password",
                  message: "contraseña incorrecta.",
                },
              ],
            };

          default:
            console.log(err);
        }
      }
      return {
        errors: [
          {
            field: "host",
            message: "Unable to stablish the connection to the database.",
          },
        ],
      };
    }

    Config.useConnection(pventaConnection);
    const configuration = await Config.findOne();
    if (!configuration) {
      return {
        errors: [
          {
            field: "host",
            message: "La empresa no tiene config.",
          },
        ],
      };
    }
    const companiesAtSameHost = await Company.find({
      where: { dbHost: host },
    });

    const companyExist = companiesAtSameHost.find((company) => {
      return (
        company.dbHost == host &&
        company.dbName == database &&
        company.dbUser == username
      );
    });

    if (companyExist)
      return {
        errors: [
          {
            field: "host",
            message:
              "ya existe una empresa con la misma combinacion host/name/user.",
          },
        ],
      };

    if (!configuration.NomEmpresa) {
      return {
        errors: [
          {
            field: "host",
            message: "la empresa no tiene nombre, no se puede continuar.",
          },
        ],
      };
    }
    const dbPassword = password;
    const newCompany = await Company.create({
      dbHost: host,
      dbName: database,
      dbUser: username,
      dbPassword,
      rnc: configuration.RNC,
      name: configuration.NomEmpresa,
    }).save();

    const connectionName = configuration.RNC + configuration.NomEmpresa;
    connectionOptions = {
      ...connectionOptions,
      name: connectionName,
    }; // name is read only, lets keep it that way (Potential performance issue)

    pventaConnection.close();
    try {
      createConnection(connectionOptions);
    } catch (err) {
      return {
        errors: [
          {
            field: "host",
            message: "Unable to stablish the connection to the database.",
          },
        ],
      };
    }

    req.session.connectionName = connectionName;
    req.session.company = { id: newCompany.id, rnc: newCompany.rnc };

    return {
      company: newCompany,
      config: {
        ...configuration,
        Direccion: configuration?.Direccion?.toString(),
        FirmaDigital: configuration?.FirmaDigital?.toString(),
        Logo: configuration?.Logo?.toString(),
      },
    };
  }
}
