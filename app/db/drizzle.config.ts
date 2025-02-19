import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./db/schema.ts",
  out: "./migrations",
  dialect: "mysql",
  strict: false,
  dbCredentials: {
    url: process.env.DATABASE_URL || "",
    ssl: {
      ca: "./certs/singlestore_bundle.pem",
    },
  },
});
