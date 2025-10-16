import { NextResponse } from "next/server";
import { connectMongo } from "@/data/db/connectMongo";
import Collection, { ICollection } from "@/data/models/Collection";

export async function GET(): Promise<NextResponse<ICollection[]>> {
    await connectMongo();

    const collections = await Collection.find().sort({ createdAt: -1 });
    return NextResponse.json(collections);
}

export async function POST(req: NextResponse): Promise<NextResponse<ICollection | { error: string} >> {
    await connectMongo();

    try {
        const body = await req.json();
        const { title } = body;

        if(!title || typeof title !== "string") {
            return NextResponse.json({ error: "Le titre est requis" }, { status: 400 });
        }

        const newCollection = await Collection.create({
            title,
            photos: [],
        });

        return NextResponse.json(newCollection, { status: 201 });
    } catch(error) {
        console.error("Erreur POST /api/collection:", error);
        return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
    }
}