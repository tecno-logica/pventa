import { MysqlError } from "mysql";

export default function isMysqlError(error: any): error is MysqlError {
  return error instanceof Error;
}
