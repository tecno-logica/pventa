import { MiddlewareFn } from "type-graphql";
import { MyContext } from "../types";

export const isAuth: MiddlewareFn<MyContext> = ({ context }, next) => {
  if (!context.req.session?.user?.id) {
    throw new Error("not authenticated");
  }

  return next();
};
