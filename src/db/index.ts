import mongoose, { ConnectOptions, Mongoose } from "mongoose";

declare global {
  var __db: Promise<Mongoose>;
}

if (!process.env.DATABASE_URL) {
  throw new Error(
    "Please define the DATABASE_URL environment variable inside .env.local"
  );
}

let dbConnection: Promise<Mongoose>;
const options: ConnectOptions = {
  dbName: "hippo",
};

if (process.env.NODE_ENV === "development") {
  if (!global.__db) {
    global.__db = mongoose.connect(process.env.DATABASE_URL, options);
  }
  dbConnection = global.__db;
} else {
  dbConnection = mongoose.connect(process.env.DATABASE_URL, options);
}

export default dbConnection;
