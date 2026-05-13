import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

export const connectDB = async() => {
    let dbUrl = process.env.MONGO_URI;

    if (process.env.NODE_ENV === 'test' || !dbUrl) {
        //use in-memory server
        const mongoServer = await MongoMemoryServer.create();
        dbUrl = mongoServer.getUri();
        console.log("Using In-Memory MongoDB.");
    }

    if (!dbUrl)
        throw new Error("Database URL not found.");

    await mongoose.connect(dbUrl);
    console.log("MongoDB connected.");
}