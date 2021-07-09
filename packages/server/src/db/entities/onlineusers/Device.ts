import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@ObjectType()
@Entity("devices")
export class Device extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true })
  ip: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  firstUserId?: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  lastUserId?: number;

  @Field()
  @Column()
  userAgent: string;

  @Field(() => String)
  @CreateDateColumn()
  createdAt = new Date();

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
