import { InputType, Field } from "type-graphql";

@InputType()
export class CompanyRegistrationInput {
  /*   @Field()
  email: string; */

  /* @Field()
  username: string; */

  @Field()
  host!: string;

  @Field()
  database!: string;

  @Field()
  username!: string;

  @Field()
  password!: string;
}
