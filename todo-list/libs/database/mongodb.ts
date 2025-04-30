import mongoose, { Mongoose } from "mongoose";
import { DB_URI, NODE_ENV } from "../config/env";

interface MongooseCache {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
}

let cached: MongooseCache = (global as any).mongoose;

if (!cached) {
    cached = (global as any).mongoose = { conn: null, promise: null};
}

const connectToDatabase = async (): Promise<Mongoose> => {
    if (cached.conn) {
        return cached.conn;
    }

    if (!DB_URI) {
        throw new Error(`Please define the MONGODB_URI environment variable inside .env.<dev/prod>.local`)
    };

    try {
        if (!cached.promise) {
            const opts: mongoose.ConnectOptions = {
                bufferCommands: false,
                serverSelectionTimeoutMS: 5000,
                socketTimeoutMS: 4500,
            };

            cached.promise = mongoose.connect(DB_URI, opts).then((mongoose) => {
                console.log(`Connected to database in ${NODE_ENV} mode`);
                return mongoose;
            });
        }

        cached.conn = await cached.promise;
        return cached.conn;
    } catch (error) {
        console.log(`Error connecting to MongoDB: `, error);

        cached.promise = null;

        if (NODE_ENV === "development") {
            process.exit(1);
        }

        throw new Error(`Error connecting to MongoDB: ${error}`);
    }
}

export default connectToDatabase;
