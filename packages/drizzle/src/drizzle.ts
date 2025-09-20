import { drizzle } from "drizzle-orm/node-postgres";
import { DATABASE_URL } from "./env";
import * as schema from "./schema";

const db = drizzle(DATABASE_URL, { schema });

export default db;
