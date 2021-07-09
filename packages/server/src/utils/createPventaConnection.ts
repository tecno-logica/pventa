import { Connection, ConnectionOptions, createConnection } from "typeorm";
import entities from "../db/entities/pventa";

export const createPventaConnectionOptions = (
  name: string,
  host: string,
  username: string,
  password: string,
  database: string
): ConnectionOptions => ({
  name,
  type: "mysql",
  host,
  database,
  username,
  password,
  entities,
  port: 3306,
  logging: true,
});

export const createPventaConnection = (
  ...args: Parameters<typeof createPventaConnectionOptions>
): Promise<Connection> =>
  createConnection(createPventaConnectionOptions(...args));
