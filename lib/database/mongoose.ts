import mongoose, { Mongoose } from 'mongoose';

const MONGODB_URL = process.env.MONGODB_URL;

interface MongooseConnection {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

// Use the globally-typed `mongoose` from your `global.d.ts`
const cached: MongooseConnection = global.mongoose ?? {
  conn: null,
  promise: null,
};

// Always assign back to global to persist cache across hot reloads
global.mongoose = cached;

export const connectToDatabase = async () => {
  if (cached.conn) return cached.conn;

  if (!MONGODB_URL) throw new Error('Missing MONGODB_URL');

  cached.promise =
    cached.promise ||
    mongoose.connect(MONGODB_URL, {
      dbName: 'pixa',
      bufferCommands: false,
    });

  cached.conn = await cached.promise;

  return cached.conn;
};
