import mongoose, { Mongoose } from "mongoose";

const MONGODB_URL = process.env.MONGODG_URL;

interface MongooseConnection {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}


let cached: MongooseConnection = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export const connectToDatabase = async () => {
  if (cached.conn) return cached.conn; //1- check if already have a cached connection

  if (!MONGODB_URL) throw new Error("MONGODB_URL is not defined");

  // 2- if not connection we make a new connection to mongodb
  cached.promise =
    cached.promise ||
    mongoose.connect(MONGODB_URL, {
      dbName: "imaginify",
      bufferCommands: false,
    });
     cached.conn = await cached.promise;
     return cached.conn;
};
