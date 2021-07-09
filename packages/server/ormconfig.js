"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Company_1 = require("./db/entities/onlineusers/Company");
const CompanyUserPivot_1 = require("./db/entities/onlineusers/CompanyUserPivot");
const Device_1 = require("./db/entities/onlineusers/Device");
const Session_1 = require("./db/entities/onlineusers/Session");
const User_1 = require("./db/entities/onlineusers/User");
exports.default = {
    type: "mysql",
    database: "online_users",
    username: "root",
    password: "Autosetting123@",
    logging: false,
    synchronize: false,
    entities: [Company_1.Company, CompanyUserPivot_1.CompanyUserPivot, Device_1.Device, User_1.User, Session_1.Session],
};
//# sourceMappingURL=ormconfig.js.map