import "reflect-metadata";
import { DataSource } from "typeorm";
import { Portfolio } from "@/entities/Portfolio";
import { ContactMessage } from "@/entities/ContactMessage";

const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  synchronize: process.env.NODE_ENV !== "production", // Auto-creates tables in dev
  logging: process.env.NODE_ENV !== "production",
  entities: [Portfolio, ContactMessage],
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
});

/**
 * Next.js hot-reloading safe wrapper for TypeORM Connection.
 * Prevents multiple identical active connection pools in dev mode.
 */
declare global {
  var _databaseSource: DataSource | undefined;
}

export const getDbConnection = async (): Promise<DataSource> => {
  if (global._databaseSource && global._databaseSource.isInitialized) {
    // console.log("Using existing DB connection");
    return global._databaseSource;
  }

  if (!global._databaseSource) {
    global._databaseSource = AppDataSource;
  }

  if (!global._databaseSource.isInitialized) {
    await global._databaseSource.initialize();
    console.log("DB connection initialized. Entities:", 
      global._databaseSource.entityMetadatas.map(m => m.name)
    );
  }

  return global._databaseSource;
};
