import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";

@ObjectType()
@Entity("companies")
@Unique(["dbHost", "dbName", "dbUser"])
export class Company extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  @Index()
  rnc: string;

  @Column()
  dbHost: string;

  @Column()
  dbName: string;

  @Column()
  dbUser: string;

  @Column()
  dbPassword: string;

  @Field()
  @Column()
  name: string;
}
