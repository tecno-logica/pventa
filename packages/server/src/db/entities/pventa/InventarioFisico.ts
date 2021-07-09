import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Inventario } from "./Inventario";

@ObjectType()
//   ) ENGINE=InnoDB DEFAULT CHARSET=latin1;
@Entity("inventariofisico")
export class InventarioFisico extends BaseEntity {
  @Field()
  @Column({ type: "int", width: 11, nullable: false })
  @PrimaryGeneratedColumn()
  // CodTransac` int(11) NOT NULL AUTO_INCREMENT,
  CodTransac: number;
  // PRIMARY KEY (`CodTransac`),

  @Field()
  @ManyToOne(() => Inventario, (inventory) => inventory.Codigo)
  @JoinColumn({ name: "Codigo" })
  // `Codigo` int(11) NOT NULL DEFAULT '0',
  Codigo!: number;

  // KEY `Codigo` (`Codigo`),

  @Field()
  @Column({ type: "double", default: 0 })
  // `Existencia` double DEFAULT '0',
  Existencia: number;

  @Field()
  @Column({ type: "double", default: 0 })
  // `ExistenciaSistema` double DEFAULT '0',
  ExistenciaSistema: number;

  @Field()
  @Column({ type: "double", default: 0 })
  // `CostoPromedio` double DEFAULT '0',
  CostoPromedio: number;

  @Field({ nullable: true })
  @Column({ type: "datetime", default: null })
  // `FechaConteo` datetime DEFAULT NULL,
  FechaConteo?: Date;
  // KEY `FechaConteo` (`FechaConteo`),

  @Field()
  @Column({ type: "varchar", length: 50, default: "" })
  // `Usuario` varchar(30) DEFAULT '',
  Usuario: string;
  // KEY `Usuario` (`Usuario`),

  @Field({ nullable: true })
  @Column({ type: "datetime", default: null })
  // `FechaProceso` datetime DEFAULT NULL,
  FechaProceso?: Date;
  // KEY `FechaProceso` (`FechaProceso`)
}
