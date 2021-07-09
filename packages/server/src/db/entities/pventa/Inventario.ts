import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryColumn,
} from "typeorm";
import { InventarioFisico } from "./InventarioFisico";

@ObjectType()
@Entity()
export class Inventario extends BaseEntity {
  @Field()
  @Column({ type: "int", width: 11, nullable: false })
  @PrimaryColumn()
  @OneToMany(
    () => InventarioFisico,
    (inventarioFisico) => inventarioFisico.Codigo
  )
  @JoinColumn({ name: "Codigo" })
  // `Codigo` int(11) NOT NULL,
  Codigo!: number;
  // PRIMARY KEY (`Codigo`),

  @Field({ nullable: true })
  @Column({ type: "varchar", length: 50, default: null })
  // // `Descripcion` varchar(50) DEFAULT NULL,
  Descripcion?: string;
  // KEY `Descripcion` (`Descripcion`),

  @Field({ nullable: true })
  @Column({ type: "varchar", length: 50, default: null })
  // `Referencia` varchar(50) DEFAULT NULL,
  Referencia?: string;

  @Field()
  @Column({ type: "blob" })
  // `Info` blob,
  Info: string;

  @Field({ nullable: true })
  @Column({ type: "varchar", length: 4, default: null })
  // `UndCompra` varchar(4) DEFAULT NULL,
  UndCompra?: number;

  @Field({ nullable: true })
  @Column({ type: "varchar", length: 4, default: null })
  // `UndVenta` varchar(4) DEFAULT NULL,
  UndVenta?: number;

  @Field()
  @Column({ type: "tinyint", width: 1, default: 0 })
  // `Itbis` tinyint(1) DEFAULT '0',
  Itbis: 0 | 1;

  @Field()
  @Column({ type: "double", default: 0 })
  // `CostoUS` double DEFAULT '0',
  CostoUS: number;

  @Field()
  @Column({ type: "double", default: 0 })
  // `CostoPromedio` double DEFAULT '0',
  CostoPromedio: number;

  @Field()
  @Column({ type: "double", default: 0 })
  // `Precio0` double DEFAULT '0',
  Precio0: number;

  @Field()
  @Column({ type: "double", default: 0 })
  // `Precio1` double DEFAULT '0',
  Precio1: number;

  @Field()
  @Column({ type: "double", default: 0 })
  // `Precio2` double DEFAULT '0',
  Precio2: number;

  @Field({ nullable: true })
  @Column({ type: "double", default: null })
  // `PrecioVenta` double DEFAULT NULL,
  PrecioVenta?: number;

  @Field()
  @Column({ type: "double", default: 0 })
  // `Existencia` double DEFAULT '0',
  Existencia: number;

  @Field({ nullable: true })
  @Column({ type: "int", width: 11, default: null })
  // `NivelMin` int(11) DEFAULT NULL,
  NivelMin?: number;

  @Field({ nullable: true })
  @Column({ type: "int", width: 11, default: null })
  // `NivelMin` int(11) DEFAULT NULL,
  NivelMax?: number;

  @Field({ nullable: true })
  @Column({ type: "varchar", length: 15, default: null, unique: true })
  // `CodigoBarra` varchar(15) DEFAULT NULL,
  CodigoBarra?: string;
  // UNIQUE KEY `CodigoBarra` (`CodigoBarra`),

  @Field()
  @Column({ type: "tinyint", width: 1, default: 0 })
  // `Deducible` tinyint(1) DEFAULT '0',
  Deducible: 0 | 1;

  @Field({ nullable: true })
  @Column({ type: "datetime", default: null })
  // `FechaVence` datetime DEFAULT NULL,
  FechaVence?: Date;

  @Field()
  @Column({ type: "int", width: 11, default: 0 })
  // `Grupo` int(11) DEFAULT '0',
  Grupo: number;
  // KEY `Grupo` (`Grupo`)

  @Field()
  @Column({ type: "int", width: 11, default: 0 })
  // `Cliente` int(11) DEFAULT '0',
  Cliente: number;
  // KEY `Cliente` (`Cliente`),

  @Field()
  @Column({ type: "double", default: 0 })
  // `Puntos` double DEFAULT '0',
  Puntos: number;

  @Field()
  @Column({ type: "double", default: 0 })
  // `Ordenado` double DEFAULT '0',
  Ordenado: number;

  @Field({ nullable: true })
  @Column({ type: "varchar", length: 16, default: null })
  // `CtaIngreso` varchar(16) DEFAULT NULL,
  CtaIngreso?: string;

  @Field({ nullable: true })
  @Column({ type: "varchar", length: 16, default: null })
  // `CtaDescuento` varchar(16) DEFAULT NULL,
  CtaDescuento?: string;

  @Field({ nullable: true })
  @Column({ type: "varchar", length: 16, default: null })
  // `CtaImpuesto` varchar(16) DEFAULT NULL,
  CtaImpuesto?: string;

  @Field({ nullable: true })
  @Column({ type: "varchar", length: 16, default: null })
  // `CtaDevolucion` varchar(16) DEFAULT NULL,
  CtaDevolucion?: string;

  @Field({ nullable: true })
  @Column({ type: "varchar", length: 16, default: null })
  // `CtaInventario` varchar(16) DEFAULT NULL,
  CtaInventario?: string;

  @Field({ nullable: true })
  @Column({ type: "varchar", length: 16, default: null })
  // `CtaInventario` varchar(16) DEFAULT NULL,
  CtaCosto?: string;

  @Field({ nullable: true })
  @Column({ type: "varchar", length: 16, default: null })
  // `CtaDescuentoCompra` varchar(16) DEFAULT NULL,
  CtaDescuentoCompra?: string;

  @Field({ nullable: true })
  @Column({ type: "varchar", length: 5, default: null })
  // `CentroCosto` varchar(5) DEFAULT NULL,
  CentroCosto?: string;
  // KEY `CentroCosto` (`CentroCosto`),
}
