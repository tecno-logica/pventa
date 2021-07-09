import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

@ObjectType()
// CREATE TABLE `config` (
@Entity("config")
export class Config extends BaseEntity {
  @Field()
  //go     PRIMARY KEY (`NomEmpresa`)
  //     `NomEmpresa` varchar(50) NOT NULL,
  @PrimaryColumn({ type: "varchar", length: 50 })
  NomEmpresa!: string;

  //     `SerieNumero` int(11) DEFAULT '0',
  @Column({ type: "int", width: 11, default: 0 })
  SerieNumero: number;

  @Field(() => String, { nullable: true })
  //     `Direccion` blob,
  @Column({ type: "blob" })
  Direccion: Buffer;

  //     `Tasa` double DEFAULT NULL,
  @Column({ type: "double", default: null })
  Tasa?: number;

  @Field()
  //     `Itbis` double DEFAULT '0',
  @Column({ type: "double", default: 0 })
  Itbis: number;

  @Field()
  //     `Itbis1` double DEFAULT '0',
  @Column({ type: "double", default: 0 })
  Itbis1: number;

  @Field()
  //     `RNC` varchar(15) DEFAULT NULL,
  @Column({ type: "varchar", length: 15, default: null })
  RNC?: string;

  @Field({ nullable: true })
  //     `Correo_Electronico` varchar(50) DEFAULT NULL,
  @Column({ type: "varchar", length: 50, default: null })
  Correo_Electronico?: string;

  //     `UltimaFactura` int(11) DEFAULT NULL,
  @Column({ type: "int", width: 11, default: null })
  UltimaFactura?: number;

  //     `UltimoConduce` int(11) DEFAULT NULL,
  @Column({ type: "int", width: 11, default: null })
  UltimoConduce?: number;

  //     `UltimoRecibo` int(11) DEFAULT NULL,
  @Column({ type: "int", width: 11, default: null })
  UltimoRecibo?: number;

  //     `UltimaCotizacion` int(11) DEFAULT NULL,
  @Column({ type: "int", width: 11, default: null })
  UltimaCotizacion?: number;

  //     `UltimaNotaCredito` int(11) DEFAULT NULL,
  @Column({ type: "int", width: 11, default: null })
  UltimaNotaCredito?: number;

  //     `UltimaNotaDebito` int(11) DEFAULT NULL,
  @Column({ type: "int", width: 11, default: null })
  UltimaNotaDebito?: number;

  //     `UltimaOrden` int(11) DEFAULT NULL,
  @Column({ type: "int", width: 11, default: null })
  UltimaOrden?: number;

  //     `UltimoRepRecibo` int(11) DEFAULT NULL,
  @Column({ type: "int", width: 11, default: null })
  UltimoRepRecibo?: number;

  //     `UltimoCodigo` int(11) DEFAULT '0',
  @Column({ type: "int", width: 11, default: 0 })
  UltimoCodigo: number;

  //     `UltimoCliente` int(11) DEFAULT '0',
  @Column({ type: "int", width: 11, default: 0 })
  UltimoCliente: number;

  //     `UltimoTipoCliente` int(11) DEFAULT '0',
  @Column({ type: "int", width: 11, default: 0 })
  UltimoTipoCliente: number;

  //     `UltimoVendedor` int(11) DEFAULT '0',
  @Column({ type: "int", width: 11, default: 0 })
  UltimoVendedor: number;

  //     `UltimoGrupo` int(11) DEFAULT '0',
  @Column({ type: "int", width: 11, default: 0 })
  UltimoGrupo: number;

  //     `UltimoSuplidor` int(11) DEFAULT '0',
  @Column({ type: "int", width: 11, default: 0 })
  UltimoSuplidor: number;

  //     `UltimaZona` int(11) DEFAULT '0',
  @Column({ type: "int", width: 11, default: 0 })
  UltimaZona: number;

  //     `UltimaCaja` int(11) DEFAULT '0',
  @Column({ type: "int", width: 11, default: 0 })
  UltimaCaja: number;

  //     `UltimaSolicitudCheque` int(11) DEFAULT '0',
  @Column({ type: "int", width: 11, default: 0 })
  UltimaSolicitudCheque: number;

  //     `UltimaFacturaCxP` int(11) DEFAULT '0',
  @Column({ type: "int", width: 11, default: 0 })
  UltimaFacturaCxP: number;

  //     `UltimaTransaccionCxP` int(11) DEFAULT '0',
  @Column({ type: "int", width: 11, default: 0 })
  UltimaTransaccionCxP: number;

  //     `UltimoPagoCxP` int(11) DEFAULT '0',
  @Column({ type: "int", width: 11, default: 0 })
  UltimoPagoCxP: number;

  //     `CodSuplidorFormal` int(11) DEFAULT '0',
  @Column({ type: "int", width: 11, default: 0 })
  CodSuplidorFormal: number;

  //     `UltFacturaSuplidorFormal` varchar(15) DEFAULT '0',
  @Column({ type: "varchar", length: 15, default: "0" })
  UltFacturaSuplidorFormal: string;

  //     `ControlCotizaciones` tinyint(1) DEFAULT '0',
  @Column({ type: "tinyint", width: 1, default: 0 })
  ControlCotizaciones: 0 | 1;

  //     `ReporteFacturaExtendida` tinyint(1) DEFAULT '0',
  @Column({ type: "tinyint", width: 1, default: 0 })
  ReporteFacturaExtendida: 0 | 1;

  //     `PapelTimbradoFactura` tinyint(1) DEFAULT '0',
  @Column({ type: "tinyint", width: 1, default: 0 })
  PapelTimbradoFactura: 0 | 1;

  //     `PapelTimbradoRecibo` tinyint(1) DEFAULT '0',
  @Column({ type: "tinyint", width: 1, default: 0 })
  PapelTimbradoRecibo: 0 | 1;

  //     `PapelTamanoNormal` tinyint(1) DEFAULT '0',
  @Column({ type: "tinyint", width: 1, default: 0 })
  PapelTamanoNormal: 0 | 1;

  //     `Aprobado` varchar(20) DEFAULT NULL,
  @Column({ type: "varchar", length: 20, default: null })
  Aprobado?: string;

  //     `FactorCosto` double DEFAULT '0',
  @Column({ type: "double", default: 0 })
  FactorCosto: number;

  @Field()
  //     `TipoEmpresa` int(11) DEFAULT '1',
  @Column({ type: "int", width: 11, default: 1 })
  TipoEmpresa: number;

  @Field(() => String, { nullable: true })
  //     `Logo` blob,
  @Column({ type: "blob", nullable: true })
  Logo?: Buffer;

  @Field(() => String)
  //     `FirmaDigital` blob,
  @Column({ type: "blob" })
  FirmaDigital: Buffer;

  //     `PosteoEnLinea` tinyint(1) DEFAULT '0',
  @Column({ type: "tinyint", width: 1, default: 0 })
  PosteoEnLinea: 0 | 1;

  //     `DesplegarUnidadMedida` tinyint(1) DEFAULT '0',
  @Column({ type: "tinyint", width: 1, default: 0 })
  DesplegarUnidadMedida: 0 | 1;

  //     `LogoCuadrado` tinyint(1) DEFAULT '1',
  @Column({ type: "tinyint", width: 1, default: 1 })
  LogoCuadrado: 0 | 1;

  //     `FirmaDigitalCuadrado` tinyint(1) DEFAULT '1',
  @Column({ type: "tinyint", width: 1, default: 1 })
  FirmaDigitalCuadrado: 0 | 1;

  //     `LoteProductos` tinyint(1) DEFAULT '0',
  @Column({ type: "tinyint", width: 1, default: 0 })
  LoteProductos: 0 | 1;

  //     `Idioma` tinyint(1) DEFAULT '1',
  @Column({ type: "tinyint", width: 1, default: 1 })
  Idioma: 0 | 1;

  //     `PrintItemAlfabetico` tinyint(1) DEFAULT '0',
  @Column({ type: "tinyint", width: 1, default: 0 })
  PrintItemAlfabetico: 0 | 1;

  //     `FormatoCotizacion` varchar(2) DEFAULT '00',
  @Column({ type: "varchar", length: 2, default: "00" })
  FormatoCotizacion: string;

  //     `FormatoFactura` varchar(2) DEFAULT '00',
  @Column({ type: "varchar", length: 2, default: "00" })
  FormatoFactura: string;

  //     `LimiteInfNcfFA` varchar(19) DEFAULT NULL,
  @Column({ type: "varchar", length: 19, default: null })
  LimiteInfNcfFA?: string;

  //     `LimiteSupNcfFA` varchar(19) DEFAULT NULL,
  @Column({ type: "varchar", length: 19, default: null })
  LimiteSupNcfFA?: string;

  //     `FechaVenceNCFFA` datetime DEFAULT NULL,
  @Column({ type: "datetime", default: null })
  FechaVenceNCFFA?: Date | null;

  //     `LimiteInfNcfCF` varchar(19) DEFAULT NULL,
  @Column({ type: "varchar", length: 19, default: null })
  LimiteInfNcfCF?: string;

  //     `LimiteSupNcfCF` varchar(19) DEFAULT NULL,
  @Column({ type: "varchar", length: 19, default: null })
  LimiteSupNcfCF?: string;

  //     `LimiteInfNcfNC` varchar(19) DEFAULT NULL,
  @Column({ type: "varchar", length: 19, default: null })
  LimiteInfNcfNC?: string;

  //     `LimiteSupNcfNC` varchar(19) DEFAULT NULL,
  @Column({ type: "varchar", length: 19, default: null })
  LimiteSupNcfNC?: string;

  //     `LimiteInfNcfND` varchar(19) DEFAULT NULL,
  @Column({ type: "varchar", length: 19, default: null })
  LimiteInfNcfND?: string;

  //     `LimiteSupNcfND` varchar(19) DEFAULT NULL,
  @Column({ type: "varchar", length: 19, default: null })
  LimiteSupNcfND?: string;

  //     `FechaVenceNcfND` datetime DEFAULT NULL,
  @Column({ type: "datetime", default: null })
  FechaVenceNcfND?: Date | null;

  //     `LimiteInfNcfGOB` varchar(19) DEFAULT NULL,
  @Column({ type: "varchar", length: 19, default: null })
  LimiteInfNcfGOB?: string;

  //     `LimiteSupNcfGOB` varchar(19) DEFAULT NULL,
  @Column({ type: "varchar", length: 19, default: null })
  LimiteSupNcfGOB?: string;

  //     `FechaVenceNcfGOB` datetime DEFAULT NULL,
  @Column({ type: "datetime", default: null })
  FechaVenceNcfGOB?: Date | null;

  //     `LimiteInfNcfRE` varchar(19) DEFAULT NULL,
  @Column({ type: "varchar", length: 19, default: null })
  LimiteInfNcfRE?: string;

  //     `LimiteSupNcfRE` varchar(19) DEFAULT NULL,
  @Column({ type: "varchar", length: 19, default: null })
  LimiteSupNcfRE?: string;

  //     `FechaVenceNcfRE` datetime DEFAULT NULL,
  @Column({ type: "datetime", default: null })
  FechaVenceNcfRE?: Date | null;

  //     `LimiteInfNcfSI` varchar(19) DEFAULT NULL,
  @Column({ type: "varchar", length: 19, default: null })
  LimiteInfNcfSI?: string;

  //     `LimiteSupNcfSI` varchar(19) DEFAULT NULL,
  @Column({ type: "varchar", length: 19, default: null })
  LimiteSupNcfSI?: string;

  //     `FechaVenceNcfSI` datetime DEFAULT NULL,
  @Column({ type: "datetime", default: null })
  FechaVenceNcfSI?: Date | null;

  //     `LimiteInfNcfGM` varchar(19) DEFAULT NULL,
  @Column({ type: "varchar", length: 19, default: null })
  LimiteInfNcfGM?: string;

  //     `LimiteSupNcfGM` varchar(19) DEFAULT NULL,
  @Column({ type: "varchar", length: 19, default: null })
  LimiteSupNcfGM?: string;

  //     `FechaVenceNcfGM` datetime DEFAULT NULL,
  @Column({ type: "datetime", default: null })
  FechaVenceNcfGM?: Date | null;

  //   ) ENGINE=InnoDB DEFAULT CHARSET=latin1;
}
