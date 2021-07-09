import { MiddlewareFn } from "type-graphql";
import { MyContext } from "../types";

export const isUser: MiddlewareFn<MyContext> = ({ context }, next) => {
  if (!(context.req.session?.role <= 2)) {
    throw new Error("usuario no autorizado");
  }

  return next();
};
