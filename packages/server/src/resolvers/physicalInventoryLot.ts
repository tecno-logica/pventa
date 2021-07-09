import { Inventario } from "../db/entities/pventa/Inventario";
import { InventarioFisico } from "../db/entities/pventa/InventarioFisico";
import { InventarioFisicoLote } from "../db/entities/pventa/InventarioFisicoLote";
import { hasCompany } from "../middleware/hasCompany";
import { isAuth } from "../middleware/isAuth";
import { isUser } from "../middleware/isUser";
import { MyContext } from "../types";
import FieldError from "../types/FieldError";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { getConnection } from "typeorm";

@ObjectType()
class PhysicalInventoryLotResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => InventarioFisicoLote, { nullable: true })
  physicalInventoryLot?: InventarioFisicoLote;

  @Field(() => InventarioFisico, { nullable: true })
  physicalInventory?: InventarioFisico;

  @Field(() => Inventario, { nullable: true })
  inventory?: Inventario;
}

@InputType()
class CodTransacCodigoLocationInput {
  @Field()
  transacCode: number;

  @Field()
  inventoryId: number;

  @Field()
  location!: string;
}

@InputType()
class IdInput {
  @Field()
  id!: number;
}

@Resolver()
export class PhysicalInventoryLotResolver {
  @Mutation(() => PhysicalInventoryLotResponse)
  @UseMiddleware(isAuth)
  @UseMiddleware(hasCompany)
  @UseMiddleware(isUser)
  async createPhysicalInventoryLot(
    @Arg("input")
    { transacCode, inventoryId, location }: CodTransacCodigoLocationInput,
    @Ctx() { req }: MyContext
  ): Promise<PhysicalInventoryLotResponse> {
    let pventaConnection = getConnection(req.session.connectionName);

    const inventory = await pventaConnection
      .getRepository(Inventario)
      .findOne(inventoryId);
    if (!inventory)
      return {
        errors: [{ field: "inventoryId", message: "Inventario no encontrado" }],
      };

    const physicalInventory = await pventaConnection
      .getRepository(InventarioFisico)
      .findOne(transacCode);
    if (!physicalInventory)
      return {
        errors: [
          { field: "transacCode", message: "InventarioFisico no encontrado" },
        ],
      };

    const physicalInventoryLot = await pventaConnection
      .getRepository(InventarioFisicoLote)
      .create({
        CodTransac: transacCode,
        Codigo: inventoryId,
        Cantidad: 0,
        RegistroSanitario: "",
        Ubicacion: location,
      })
      .save();

    return { physicalInventoryLot, physicalInventory, inventory };
  }

  @Mutation(() => PhysicalInventoryLotResponse)
  @UseMiddleware(isAuth)
  @UseMiddleware(hasCompany)
  @UseMiddleware(isUser)
  async destroyPhysicalInventoryLot(
    @Arg("input")
    { id }: IdInput,
    @Ctx() { req }: MyContext
  ): Promise<PhysicalInventoryLotResponse> {
    let pventaConnection = getConnection(req.session.connectionName);

    const physicalInventoryLot = await pventaConnection
      .getRepository(InventarioFisicoLote)
      .findOne({
        Id: id,
      });

    await physicalInventoryLot?.remove();

    return { physicalInventoryLot };
  }
}
