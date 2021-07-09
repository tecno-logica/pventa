import dotenv from "dotenv";

dotenv.config();
export const SESSION_COOKIE_NAME = "qid";
export const PROD = process.env.NODE_ENV === "production";
export const { DB_HOST, DB_NAME, DB_USER, DB_PASS } = process.env;

export const ONLINE_USERS = "ONLINE_USERS";

export const EBADDB = 1049;
export const ENOTSUPPORTEDAUTHMETHOD = 1251;
export const EAI_AGAIN = "EAI_AGAIN";
export const ER_BAD_DB_ERROR = "ER_BAD_DB_ERROR ";
export const ACCESSDENIEDERROR = 1045;
export const ENOTFOUND = "ENOTFOUND";
export const ER_DBACCESS_DENIED_ERROR = "ER_DBACCESS_DENIED_ERROR";
export const DBACCESS_DENIED_ERRNO = 1044;
