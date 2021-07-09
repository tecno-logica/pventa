import "reflect-metadata";
// import argon2 from "argon2";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";

import { Company } from "./db/entities/onlineusers/Company";
import { CompanyUserPivot } from "./db/entities/onlineusers/CompanyUserPivot";
import { Device } from "./db/entities/onlineusers/Device";
import { Session } from "./db/entities/onlineusers/Session";
import { User } from "./db/entities/onlineusers/User";
import { UserResolver } from "./resolvers/user";
import session from "express-session";
import { TypeormStore } from "typeorm-store";
import { PROD, SESSION_COOKIE_NAME } from "./constants";
import pventaEntities from "./db/entities/pventa";
import { CompanyResolver } from "./resolvers/company";
import isError from "./utils/isError";
import { Role } from "./db/entities/onlineusers/Role";
import { PhysicalInventoryLotResolver } from "./resolvers/physicalInventoryLot";
import { physicalInventoryResolver } from "./resolvers/physicalInventory";

const main = async () => {
  const onlineUsers = await createConnection({
    type: "mysql",
    host: "localhost",
    database: "online_users",
    username: "root",
    password: "Autosetting123@",
    logging: false,
    synchronize: false,
    entities: [Company, CompanyUserPivot, Device, Role, Session, User],
  });
  // Company.clear();
  // Session.clear();

  // await createConnection({
  //   name: "pventa",
  //   type: "mysql",
  //   host: "localhost",
  //   database: "pventa_test_pv",
  //   username: "root",
  //   password: "Autosetting123@",
  //   logging: true,
  //   synchronize: true,
  //   entities: pventaEntities,
  //   charset: "utf8",
  // });
  const app = express();
  app.disable("X-Powered-by");
  app.use(express.json());

  const sessionRepository = onlineUsers.getRepository(Session);
  app.use(
    session({
      name: SESSION_COOKIE_NAME,
      secret:
        "87b9769b3492f75582ddb8831aa46940eaa954fd4efcd909e599cd736b74f860ab02af6ca02ca37d33c1da515b8254b6e22a5fdfe18f0668548168f6302254af",
      store: new TypeormStore({
        repository: sessionRepository,
      }),

      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365, // 5 mins
        httpOnly: true,
        secure: PROD,
        sameSite: "lax",
      },
      saveUninitialized: false,
      resave: false,
    })
  );

  app.use("*", async (req, res, next) => {
    if (req.session!.deviceId) return next();

    let currentDevice =
      (await Device.findOne({
        where: { ip: req.ip },
      })) ||
      (await Device.create({
        ip: req.ip,
        userAgent: req.headers["user-agent"],
      }).save());

    if (!currentDevice) {
      res.status(500).json({ error: "Unable to create the device" });
      return;
    }

    req.session!.deviceId = currentDevice.id;
    next();
  });

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [
        CompanyResolver,
        physicalInventoryResolver,
        PhysicalInventoryLotResolver,
        UserResolver,
      ],
      validate: false,
    }),
    context: ({ req, res }) => ({
      req,
      res,
    }),
  });

  apolloServer.applyMiddleware({ app });

  // app.use("/sync", sync);

  app.listen("4000", () => {
    console.log("Server started on localhost:4000");
  });
};

main().catch((error) => {
  if (isError(error)) {
    switch (error.code) {
      case "EAI_AGAIN":
        console.log("I caught it");
        break;
      default:
        console.log(error);
    }
  } else {
    console.error(error);
  }
});
