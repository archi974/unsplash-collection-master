import mongoose, { Connection } from "mongoose";

if (!process.env.MONGO_URI) throw new Error("❌ MONGO_URI non définie dans .env.local");
const MONGO_URI: string = process.env.MONGO_URI;

// Cache global (évite les connexions multiples en dev)
let cachedConnection: Connection | null = null;

export async function connectMongo(): Promise<Connection> {
    if (cachedConnection) return cachedConnection;
    if (mongoose.connection.readyState >= 1) return mongoose.connection;

    try {
        const connection = await mongoose.connect(MONGO_URI, {
            dbName: "Unsplash_Collection",
        });
        console.log("✅ MongoDB connecté");

        cachedConnection = connection.connection;
        return cachedConnection;
    } catch (error) {
        console.error("❌ Erreur connexion MongoDB:", error);
        throw error;
    }
}