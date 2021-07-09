import { Inventario } from "../db/entities/pventa/Inventario";
import { InventarioFisico } from "../db/entities/pventa/InventarioFisico";
import { InventarioFisicoLote } from "../db/entities/pventa/InventarioFisicoLote";
import { PUser } from "../db/entities/pventa/Usuario";
import { hasCompany } from "../middleware/hasCompany";
import { isAuth } from "../middleware/isAuth";
import { isUser } from "../middleware/isUser";
import { MyContext } from "../types";
import FieldError from "../types/FieldError";
import {
  Resolver,
  Query,
  UseMiddleware,
  Ctx,
  ObjectType,
  Field,
  InputType,
  Arg,
  Mutation,
} from "type-graphql";
import { getConnection } from "typeorm";

@ObjectType()
class PhysicalInventoryResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => InventarioFisico, { nullable: true })
  physicalInventory?: InventarioFisico;

  @Field(() => Inventario, { nullable: true })
  inventory?: Inventario;

  @Field(() => [InventarioFisicoLote], { nullable: true })
  distribution?: InventarioFisicoLote[];
}

@InputType()
class CodigoInput {
  @Field()
  inventoryId!: number;
}

@InputType()
class CodeAmountInput {
  @Field()
  inventoryId!: number;

  @Field({ nullable: true })
  amount?: number;
}

@InputType()
class IdCodeAmountLotsInput extends CodeAmountInput {
  @Field()
  id!: number;

  @Field(() => [InventarioFisicoLote], { nullable: true })
  lots?: InventarioFisicoLote[];
}

@Resolver()
export class physicalInventoryResolver {
  @UseMiddleware(isAuth)
  @UseMiddleware(hasCompany)
  @UseMiddleware(isUser)
  @Query(() => PhysicalInventoryResponse)
  async getFirstPhysicalInventoryEntry(
    @Ctx() { req }: MyContext
  ): Promise<PhysicalInventoryResponse> {
    let physicalInventory: InventarioFisico | undefined;
    let pventaConnection = getConnection(req.session.connectionName);
    if (req.session?.user.role === 1) {
      physicalInventory = await pventaConnection
        .getRepository(InventarioFisico)
        .findOne({ order: { CodTransac: "DESC" } });
    } else {
      const pUser = await pventaConnection.getRepository(PUser).findOne({
        where: {
          CEDULA: req.session.user.cedula,
        },
      });
      if (!pUser) return {};

      physicalInventory = await pventaConnection
        .getRepository(InventarioFisico)
        .findOne({
          where: { Usuario: pUser.USERID },
          order: { CodTransac: "DESC" },
        });
    }

    if (!physicalInventory) return {};
    const [inventory, distribution] = await Promise.all([
      pventaConnection
        .getRepository(Inventario)
        .findOne({ where: { Codigo: physicalInventory.Codigo } }),
      pventaConnection
        .getRepository(InventarioFisicoLote)
        .find({ where: { CodTransac: physicalInventory.CodTransac } }),
    ]);

    return { physicalInventory, inventory, distribution };
  }

  @UseMiddleware(isAuth)
  @UseMiddleware(hasCompany)
  @UseMiddleware(isUser)
  @Query(() => PhysicalInventoryResponse)
  async getPhysicalInventoryByInventory(
    @Arg("input") { inventoryId }: CodigoInput,
    @Ctx() { req }: MyContext
  ): Promise<PhysicalInventoryResponse> {
    let physicalInventory: InventarioFisico | undefined;
    let pventaConnection = getConnection(req.session.connectionName);

    const inventory = await pventaConnection
      .getRepository(Inventario)
      .findOne(inventoryId);

    if (!inventory)
      return {
        errors: [{ field: "inventoryId", message: "Inventario no encontrado" }],
      };

    if (req.session?.user.role === 1) {
      physicalInventory = await pventaConnection
        .getRepository(InventarioFisico)
        .findOne({
          where: { Codigo: inventoryId },
          order: { CodTransac: "DESC" },
        });
    } else {
      const pUser = await pventaConnection.getRepository(PUser).findOne({
        where: {
          CEDULA: req.session.user.cedula,
        },
      });
      if (!pUser) return {};
      physicalInventory = await pventaConnection
        .getRepository(InventarioFisico)
        .findOne({
          where: { Codigo: inventoryId, Usuario: pUser.NAMES },
          order: { CodTransac: "DESC" },
        });
    }
    if (!physicalInventory) return {};

    const distribution = await pventaConnection
      .getRepository(InventarioFisicoLote)
      .find({ where: { CodTransac: physicalInventory.CodTransac } });

    return { physicalInventory, inventory, distribution };
  }

  @Query(() => [InventarioFisico])
  @UseMiddleware(isAuth)
  @UseMiddleware(hasCompany)
  @UseMiddleware(isUser)
  async allPhysicalInventories(@Ctx() { req }: MyContext) {
    let pventaConnection = getConnection(req.session.connectionName);

    return await pventaConnection.getRepository(InventarioFisico).find();
  }

  @Mutation(() => PhysicalInventoryResponse)
  @UseMiddleware(isAuth)
  @UseMiddleware(hasCompany)
  @UseMiddleware(isUser)
  async storePhysicalInventory(
    @Arg("input") { inventoryId, amount }: CodeAmountInput,
    @Ctx() { req }: MyContext
  ): Promise<PhysicalInventoryResponse> {
    let physicalInventory: InventarioFisico | undefined;
    let pventaConnection = getConnection(req.session.connectionName);

    const inventory = await pventaConnection
      .getRepository(Inventario)
      .findOne(inventoryId);

    if (!inventory)
      return {
        errors: [{ field: "inventoryId", message: "Inventario no encontrado" }],
      };

    let pUser: PUser | undefined;

    if (req.session?.user.role === 1) {
      pUser = await pventaConnection.getRepository(PUser).findOne({
        where: { USERID: "ADMIN" },
      });
    } else {
      pUser = await pventaConnection.getRepository(PUser).findOne({
        where: {
          CEDULA: req.session.user.cedula,
        },
      });
      if (!pUser) return {};

      physicalInventory = await pventaConnection
        .getRepository(InventarioFisico)
        .create({
          Codigo: inventoryId,
          Existencia: amount,
          FechaConteo: Date.now(),
          Usuario: pUser.NAMES,
        });
    }

    const distribution = await pventaConnection
      .getRepository(InventarioFisicoLote)
      .find({ where: { CodTransac: physicalInventory?.CodTransac } });

    return { physicalInventory, inventory, distribution };
  }
  // /**
  //      * Display the specified resource.
  //      *
  //      * @param  \App\PhysicalInventory  $physicalInventory
  //      * @return \Illuminate\Http\Response
  //      */
  //  public function show(PhysicalInventory $physicalInventory)
  //  {
  //      if (
  //          Auth::user()->role <= 1 ||
  //          $physicalInventory->User == session()->get('user')->Codigo
  //      ) {
  //          $physicalInventory->inventory;
  //          $physicalInventory->distribution;
  //          return response()->json($physicalInventory);
  //      }
  //      return response()->json('No autorizado', 403);
  //  }

  //  /**
  //   * Show the form for editing the specified resource.
  //   *
  //   * @param  \App\PhysicalInventory  $physicalInventory
  //   * @return \Illuminate\Http\Response
  //   */
  //  public function edit(PhysicalInventory $physicalInventory)
  //  {
  //      //
  //  }

  @Mutation(() => PhysicalInventoryResponse)
  @UseMiddleware(isAuth)
  @UseMiddleware(hasCompany)
  @UseMiddleware(isUser)
  async updatePhysicalInventory(
    @Arg("input") { id, inventoryId, lots, amount }: IdCodeAmountLotsInput,
    @Ctx() { req }: MyContext
  ): Promise<PhysicalInventoryResponse> {
    let pventaConnection = getConnection(req.session.connectionName);
    let physicalInventory = await pventaConnection
      .getRepository(InventarioFisico)
      .findOne(id);

    if (!physicalInventory)
      return {
        errors: [{ field: "id", message: "Inventario Fisico no encontrado" }],
      };
    let inventory: Inventario | undefined;

    if (inventoryId && physicalInventory.Codigo != inventoryId) {
      inventory = await pventaConnection
        .getRepository(Inventario)
        .findOne(inventoryId);

      if (!inventory)
        return {
          errors: [
            { field: "inventoryId", message: "Inventario no encontrado" },
          ],
        };

      await Promise.all(
        (
          await pventaConnection.getRepository(InventarioFisicoLote).find({
            where: {
              CodTransac: physicalInventory.CodTransac,
              Codigo: physicalInventory.Codigo,
            },
          })
        ).map((physicalInventoryLot) => physicalInventoryLot.remove())
      );

      physicalInventory.Codigo = inventoryId;
    }

    if (amount) {
      physicalInventory.Existencia = amount;
    }

    const distribution =
      lots &&
      (await Promise.all(
        lots
          .filter(
            (lot) =>
              lot.CodTransac === physicalInventory?.CodTransac &&
              lot.Codigo === physicalInventory.Codigo
          )
          .map(
            async (lot) =>
              await pventaConnection
                .createQueryBuilder()
                .update(InventarioFisicoLote)
                .set({ ...lot })
                .where('"CodTransac" = :id and "Codigo" = :codigo', {
                  id: physicalInventory?.CodTransac,
                  codigo: inventory?.Codigo,
                })
                .returning("*")
                .execute()
                .then((response) => {
                  return response.raw[0];
                })
          )
      ));

    return { physicalInventory, inventory, distribution };
  }

  //  public function iterateByCodigo(IterateRequest $request, $inventory)
  //  {
  //      $codigo = $inventory;
  //      $inventory = Inventory::findOrFail($inventory);
  //      $validated = $request->validated();
  //      if ($request->has('action')) {
  //          $action = $validated['action'];

  //          if ($action === 'next') {
  //              if ($request->has('current')) {
  //                  return $this->showNext($validated['current'], $inventory);
  //              } else {
  //                  $physicalInventory = PhysicalInventory::where(
  //                      'Codigo',
  //                      '>=',
  //                      $codigo
  //                  )->first();
  //                  if ($physicalInventory) {
  //                      return $this->show($physicalInventory);
  //                  }
  //              }
  //          } elseif ($action === 'prior') {
  //              if ($request->has('current')) {
  //                  return $this->showPrior($validated['current'], $inventory);
  //              } else {
  //                  $physicalInventory = PhysicalInventory::where(
  //                      'Codigo',
  //                      '<=',
  //                      $codigo
  //                  )
  //                      ->orderBy('Codigo', 'desc')
  //                      ->first();
  //                  if ($physicalInventory) {
  //                      return $this->show($physicalInventory);
  //                  }
  //              }
  //          }
  //      }

  //      return $this->index();
  //  }

  //  public function showPrior($current, Inventory $inventory)
  //  {
  //      if (Auth::user()->role == 0) {
  //          $prior = $inventory
  //              ->physical()
  //              ->where('CodTransac', '<', $current)
  //              ->orderBy('CodTransac', 'desc')
  //              ->first();

  //          if (!$prior) {
  //              $prior = PhysicalInventory::where(
  //                  'Codigo',
  //                  '<',
  //                  $inventory->Codigo
  //              )
  //                  ->orderBy('Codigo', 'desc')
  //                  ->firstOrFail();
  //          }
  //      } else {
  //          $prior = $inventory
  //              ->physical()
  //              ->where([
  //                  ['CodTransac', '<', $current],
  //                  ['Usuario', '=', session('usuario')->NAMES],
  //              ])
  //              ->orderBy('CodTransac', 'desc')
  //              ->first();

  //          if (!$prior) {
  //              $prior = PhysicalInventory::where([
  //                  ['Codigo', '<', $inventory->Codigo],
  //                  ['Usuario', '=', session('usuario')->NAMES],
  //              ])
  //                  ->orderBy('Codigo', 'desc')
  //                  ->firstOrFail();
  //          }
  //      }

  //      $prior->inventory;
  //      $prior->distribution;
  //      return $this->show($prior);
  //  }

  //  public function showNext($current, Inventory $inventory)
  //  {
  //      if (Auth::user()->role == 0) {
  //          $next = $inventory
  //              ->physical()
  //              ->where('CodTransac', '>', $current)
  //              ->first();

  //          if (!$next) {
  //              $next = PhysicalInventory::where(
  //                  'Codigo',
  //                  '>',
  //                  $inventory->Codigo
  //              )->firstOrFail();
  //          }
  //      } else {
  //          $next = $inventory
  //              ->physical()
  //              ->where([
  //                  ['CodTransac', '>', $current],
  //                  ['Usuario', '=', session('usuario')->NAMES],
  //              ])
  //              ->first();

  //          if (!$next) {
  //              $next = PhysicalInventory::where([
  //                  ['Codigo', '>', $inventory->Codigo],
  //                  ['Usuario', '=', session('usuario')->NAMES],
  //              ])->firstOrFail();
  //          }
  //      }

  //      $next->inventory;
  //      $next->distribution;

  //      return $this->show($next);
  //  }
}
