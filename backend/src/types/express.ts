import { SafeUser } from "./user";

declare module "express" {
  export interface Request {
    user: SafeUser;
  }
}

declare module "express-serve-static-core" {
  export interface Request {
    user: SafeUser;
  }
}
