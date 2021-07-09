import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";

@ObjectType()
@Entity("inventariolote")
// CREATE TABLE `inventariolote` (
export class InventarioLote extends BaseEntity {
  @Field() //     PRIMARY KEY (`CodTransac`,`Codigo`,`Ubicacion`,`Lote`),
  @Column({ type: "int", width: 11 })
  @PrimaryGeneratedColumn()
  //     `CodTransac` int(11) NOT NULL AUTO_INCREMENT,
  CodTransac!: number;
  //     KEY `CodTransac` (`CodTransac`),

  @Field()
  @PrimaryColumn()
  @Column({ type: "int", width: 11, default: 0 })
  //     `Codigo` int(11) NOT NULL DEFAULT '0',
  Codigo!: number;
  //     KEY `Codigo` (`Codigo`)

  @Field({ nullable: true })
  @PrimaryColumn()
  @Column({ type: "varchar", length: 15, default: null })
  //     `Ubicacion` varchar(10) NOT NULL DEFAULT '',
  Ubicacion?: string;
  //     KEY `Ubicacion` (`Ubicacion`)

  @Field()
  @PrimaryColumn()
  @Column({ type: "varchar", length: 10, default: "" })
  //     `Lote` varchar(10) NOT NULL DEFAULT '',
  Lote: string;
  //     KEY `Lote` (`Lote`),

  @Field({ nullable: true })
  @Column({ type: "datetime", default: null })
  //     `FechaFabricacion` datetime DEFAULT NULL,
  FechaFabricacion?: Date;

  @Field()
  @Column({ type: "datetime", nullable: false })
  //     `FechaVence` datetime NOT NULL,
  FechaVence: Date;
  //     KEY `FechaVence` (`FechaVence`),

  @Field({ nullable: true })
  @Column({ type: "varchar", length: 10, default: null })
  //     `RegistroSanitario` varchar(10) DEFAULT NULL,
  RegistroSanitario?: string;

  //   ) ENGINE=InnoDB AUTO_INCREMENT=508 DEFAULT CHARSET=latin1;
}
