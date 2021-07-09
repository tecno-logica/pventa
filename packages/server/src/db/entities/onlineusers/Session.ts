import { ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { SessionEntity } from "typeorm-store";

@ObjectType()
@Entity("sessions")
export class Session extends BaseEntity implements SessionEntity {
  @PrimaryColumn()
  id!: string;

  @Column()
  expiresAt: number;

  @Column({ type: "varchar", length: 1024 })
  data: string;

  // @Column({ nullable: true })
  // companyId?: number;

  // @Column({ nullable: true })
  // userId?: number;

  // @Column({ nullable: false })
  // deviceId!: number;

  @CreateDateColumn()
  createdAt = new Date();

  @UpdateDateColumn()
  updatedAt = new Date();
}
