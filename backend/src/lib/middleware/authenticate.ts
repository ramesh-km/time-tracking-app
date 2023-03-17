import { expressjwt } from "express-jwt";
import config from "../config";
import publicRoutes from "../constants/public-routes";

export function authenticate() {
  return expressjwt({
    secret: config.JWT_SECRET,
    algorithms: ["HS256"],
  }).unless({
    path: publicRoutes,
  });
}
