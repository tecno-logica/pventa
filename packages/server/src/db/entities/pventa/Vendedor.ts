import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

// CREATE TABLE `vendedores` (
@Entity("vendedores")
export class Vendedor extends BaseEntity {
  //     PRIMARY KEY (`Vendedor`),
  @PrimaryColumn({ width: 11, default: 0 })
  //     `Vendedor` int(11) NOT NULL DEFAULT '0',
  Vendedor!: number;

  //     `Nombre` varchar(20) DEFAULT NULL,
  @Column({ type: "varchar", length: 20, default: null })
  Nombre?: string;
  //     KEY `Nombre` (`Nombre`)

  //     `Direccion` varchar(50) DEFAULT NULL,
  @Column({ type: "varchar", length: 50, default: null })
  Direccion?: string;

  //     `TelRes` varchar(10) DEFAULT NULL,
  @Column({ type: "varchar", length: 10, default: null })
  TelRes?: string;

  //     `Celular` varchar(10) DEFAULT NULL,
  @Column({ type: "varchar", length: 10, default: null })
  Celular?: string;

  //     `ComisionVenta` double DEFAULT NULL,
  @Column({ type: "double", default: null })
  ComisionVenta?: string;

  //     `ComisionCobro` double DEFAULT NULL,
  @Column({ type: "double", default: null })
  ComisionCobro?: string;

  //     `ComisionPushmoney` double DEFAULT NULL,
  @Column({ type: "double", default: null })
  ComisionPushmoney?: string;

  //     `DiasToleranciaComisionCobro` int(11) DEFAULT '0',
  @Column({ type: "int", width: 11, default: 0 })
  DiasToleranciaComisionCobro: number;

  //     `MetaVenta` double DEFAULT NULL,
  @Column({ type: "double", default: null })
  MetaVenta?: string;

  //     `MetaCobro` double DEFAULT NULL,
  @Column({ type: "double", default: null })
  MetaCobro?: string;

  //     `Activo` tinyint(1) DEFAULT '0',
  @Column({ type: "tinyint", width: 1, default: 0 })
  Activo: 0 | 1;

  //     `ProtejerData` tinyint(1) DEFAULT '0',
  @Column({ type: "tinyint", width: 1, default: 0 })
  ProtegerData: 0 | 1;

  @Column({ type: "varchar", length: 16, nullable: true })
  Cedula: string;
  //   ) ENGINE=InnoDB DEFAULT CHARSET=latin1;
}
