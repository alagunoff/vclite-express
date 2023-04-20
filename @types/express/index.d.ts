import { type User } from "@prisma/client";

declare module "express-serve-static-core" {
  interface Request {
    authenticatedUser?: User;
  }
}
