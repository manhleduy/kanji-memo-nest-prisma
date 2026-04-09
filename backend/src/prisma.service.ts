import { Injectable } from "@nestjs/common";
import { PrismaClient } from "./generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DATABASE_URL = `postgresql://${DB_USER}:${DB_PASSWORD}@database-postgres:5432/${DB_NAME}?schema=public`;
@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    

    const adapter = new PrismaPg({
      connectionString: DATABASE_URL,
    });
    super({ adapter });
  }
}