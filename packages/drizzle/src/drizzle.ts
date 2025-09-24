import { env } from "@ecehive/env";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema";

const db = drizzle(env.DATABASE_URL, { schema });

export default db;
