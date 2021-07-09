import { Field, InputType, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@InputType("LotsInput")
// CREATE TABLE `inventariofisicolote` (
@Entity("inventariofisicolote")
export class InventarioFisicoLote extends BaseEntity {
  @Field()
  @Column({ type: "int", width: 11 })
  @PrimaryGeneratedColumn()
  //     `Id` int(11) NOT NULL AUTO_INCREMENT,
  Id: number;
  //     PRIMARY KEY (`Id`),

  @Field()
  @Column({ type: "int", width: 11, default: 0 })
  //     `CodTransac` int(11) DEFAULT '0',
  CodTransac: number;
  //     KEY `CodTransac` (`CodTransac`),

  @Field()
  @Column({ type: "int", width: 11, nullable: false, default: 0 })
  //     `Codigo` int(11) NOT NULL DEFAULT '0',
  Codigo: number;
  //     KEY `Codigo` (`Codigo`)

  @Field({ nullable: true })
  @Column({ type: "varchar", length: 15, default: null })
  //     `Ubicacion` varchar(15) DEFAULT NULL,
  Ubicacion?: string;

  @Field()
  @Column({ type: "double", default: 0 })
  //     `Cantidad` double DEFAULT '0',
  Cantidad: number;

  @Field()
  @Column({ type: "varchar", length: 10, nullable: false, default: "" })
  //     `Lote` varchar(10) DEFAULT NULL,
  Lote: string;

  @Field({ nullable: true })
  @Column({ type: "datetime", default: null })
  // `FechaFabricacion` datetime DEFAULT NULL,
  FechaFabricacion?: Date;

  @Field()
  @Column({ type: "datetime", nullable: false })
  //     `FechaVence` datetime NOT NULL,
  FechaVence: Date;

  @Field({ nullable: true })
  @Column({ type: "varchar", length: 10, default: null })
  //     `RegistroSanitario` varchar(10) DEFAULT NULL,
  RegistroSanitario?: string;

  //   ) ENGINE=InnoDB DEFAULT CHARSET=latin1;
  //   /*!40101 SET character_set_client = @saved_cs_client */;
}
