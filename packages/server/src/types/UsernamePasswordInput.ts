import { InputType, Field, Int, ObjectType } from "type-graphql";
@InputType()
export class UsernamePasswordInput {
  /*   @Field()
  email: string; */

  /* @Field()
  username: string; */

  @Field()
  cedula: string;

  @Field()
  password?: string;
}

@InputType()
export class UsernamePasswordRoleInput extends UsernamePasswordInput {
  @Field(() => Int)
  role?: 1 | 2 | 3;
}
