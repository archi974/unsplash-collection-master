import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    throw new Error("❌ MONGO_URI non définie dans .env.local");
}

export async function connectMongo() {
    if (mongoose.connection.readyState >= 1) {
        return mongoose.connection.asPromise();
    }

    try {
        await mongoose.connect(MONGO_URI, {
            dbName: "Unsplash_Collection", // 👈 ta base
        });
        console.log("✅ MongoDB connecté");
    } catch (error) {
        console.error("❌ Erreur connexion MongoDB:", error);
        throw error;
    }
}