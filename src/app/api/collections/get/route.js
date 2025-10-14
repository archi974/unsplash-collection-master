import { NextResponse } from "next/server";
// import { fetchPhotos } from "@/services/unsplashService";
import { fetchPhotos } from "../../services/unsplashService";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query") || "nature";
  const page = searchParams.get("page") || 1;

  console.log("TEST");
  console.log(query);
  console.log("TEST");
  
  

  try {
    const photos = await fetchPhotos(query, page);
    return NextResponse.json(photos);
  } catch (error) {
    console.error("Erreur API Unsplash:", error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}