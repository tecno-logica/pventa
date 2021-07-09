import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

// CREATE TABLE `users` (
@Entity("users")
export class PUser extends BaseEntity {
  @PrimaryColumn({ type: "varchar", length: 10, nullable: false })
  //   PRIMARY KEY (`USERID`),
  USERID!: string;
  //   `USERID` varchar(10) NOT NULL,
  //   KEY `USERID` (`USERID`)

  @Column({ type: "varchar", length: 30, default: null })
  NAMES?: string;
  //   `NAMES` varchar(30) DEFAULT NULL,

  @Column({ type: "varchar", length: 10, default: null })
  PASSWORD?: string;
  //   `PASSWORD` varchar(10) DEFAULT NULL,

  @Column({ type: "varchar", length: 1, default: null })
  LOGGED?: string;
  //   `LOGGED` varchar(1) DEFAULT NULL,

  @Column({ type: "varchar", length: 10, default: null })
  PROFILEID?: string;
  //   `PROFILEID` varchar(10) DEFAULT NULL,
  //   KEY `PROFILEID` (`PROFILEID`),

  @Column({ type: "varchar", length: 10, default: null })
  RESERVED?: string;
  //   `RESERVED` varchar(10) DEFAULT NULL,

  @Column({ type: "varchar", length: 16, nullable: true })
  CEDULA: string;
}
// ) ENGINE=InnoDB DEFAULT CHARSET=latin1;
