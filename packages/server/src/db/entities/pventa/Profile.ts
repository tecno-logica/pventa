import { Column, Entity, PrimaryColumn } from "typeorm";

// CREATE TABLE `profiles` (
@Entity("profiles")
export class Profile {
  @PrimaryColumn({ type: "varchar", length: 10 })
  //     `PROFILEID` varchar(10) DEFAULT NULL,
  PROFILEID!: string;
  //     KEY `PROFILEID` (`PROFILEID`)

  //     `DESCRIP` varchar(50) DEFAULT NULL,
  @Column({ type: "varchar", length: 50, default: null })
  DESCRIP?: string;

  //     `MENU` varchar(30) DEFAULT NULL,
  @Column({ type: "varchar", length: 30, default: null })
  MENU?: string;

  //     `RESERVED` varchar(10) DEFAULT NULL,
  @Column({ type: "varchar", length: 10, default: null })
  RESERVED?: string;

  //     `OBJECTS` blob,
  @Column({ type: "blob", nullable: true })
  OBJECTS?: string;

  //   ) ENGINE=InnoDB DEFAULT CHARSET=latin1;
}
