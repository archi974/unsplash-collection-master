import { NextResponse } from "next/server";
import { connectMongo } from "@/data/db/connectMongo";
import Collection from "@/data/models/Collection";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectMongo();

  try {
    const { unsplashId } = await req.json();
    const { id } = await params;

    if (!unsplashId) {
      return NextResponse.json({ error: "Missing unsplashId" }, { status: 400 });
    }

    const updatedCollection = await Collection.findByIdAndUpdate(
      id,
      { $pull: { photos: { unsplashId } } },
      { new: true }
    );

    return NextResponse.json(updatedCollection, { status: 200 });
  } catch (error) {
    console.error("Erreur POST /api/collection/[id]/remove:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}