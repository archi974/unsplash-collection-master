import { NextResponse } from "next/server";
import { connectMongo } from "@/data/db/connectMongo";
import Album from "@/data/models/Album";

export async function GET() {
    await connectMongo();

    let albums = await Album.find();
    if (albums.length === 0) {
        const newAlbum = await Album.create({
            title: "Premier test d’album",
            photos: [],
        });
        albums = [newAlbum];
    }

    return NextResponse.json(albums);
}