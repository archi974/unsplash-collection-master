import { NextResponse } from "next/server";
import { connectMongo } from "@/data/db/connectMongo";
import Collection from "@/data/models/Collection";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectMongo();

  try {
    const { src, alt } = await req.json();
    const { id } = params;

    if (!src || !alt) {
      return NextResponse.json({ error: "Missing photo data" }, { status: 400 });
    }

    const updatedCollection = await Collection.findByIdAndUpdate(
      id,
      { $push: { photos: { src, alt } } },
      { new: true }
    );

    return NextResponse.json(updatedCollection, { status: 200 });
  } catch (error) {
    console.error("Erreur POST /api/collection/[id]/add:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}