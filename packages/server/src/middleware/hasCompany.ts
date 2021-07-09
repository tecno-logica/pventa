import { MiddlewareFn } from "type-graphql";
import { MyContext } from "../types";

export const hasCompany: MiddlewareFn<MyContext> = ({ context }, next) => {
  if (!context.req.session?.connectionName) {
    throw new Error("no ha elegido una empresa");
  }

  return next();
};
