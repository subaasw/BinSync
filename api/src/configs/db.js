import { MongoClient, ServerApiVersion } from "mongodb";
import { MANGODB_URI, MANGODB_DBNAME } from "./index.js";

const uri = MANGODB_URI;

class Database {
  constructor(dbName) {
    this.client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
    this.db = null;
    this.dbName = dbName;
  }

  async connect() {
    try {
      await this.client.connect();
      this.db = this.client.db(this.dbName);
      console.log("Connected to MongoDB");

      this.client.on("connectionReady", () => {
        console.log("MongoDB connection ready");
      });

      this.client.on("error", (error) => {
        console.error("MongoDB connection error:", error);
      });

      this.client.on("close", () => {
        console.log("MongoDB connection closed");
      });

      process.on("SIGINT", async () => {
        await this.close();
        process.exit(0);
      });

      return this.db;
    } catch (error) {
      console.error("MongoDB connection error:", error);
      process.exit(1);
    }
  }

  async close() {
    try {
      await this.client.close();
      console.log("Database connection closed");
    } catch (error) {
      console.error("Error closing database:", error);
      process.exit(1);
    }
  }

  getDb() {
    if (!this.db) {
      throw new Error("Database not initialized. Call connect() first.");
    }
    return this.db;
  }

  getCollection(name) {
    return this.getDb().collection(name);
  }
}

const database = new Database(MANGODB_DBNAME);
await database.connect();

export default database;
