import { InputType, Field } from "type-graphql";

@InputType()
export default class CompanyLoginInput {
  /*   @Field()
    email: string; */

  /* @Field()
    username: string; */

  @Field(() => String)
  name: string;
}
