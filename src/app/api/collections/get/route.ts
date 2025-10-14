import { NextResponse } from "next/server";
import { fetchPhotos } from "@/app/api/services/unsplashService";

export async function GET(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const query: string = searchParams.get("query") || "nature";
  const page: number = Number(searchParams.get("page")) || 1;

  try {
    const photos = await fetchPhotos(query, page);
    return NextResponse.json(photos);
  } catch (error: unknown) {
    console.error("Erreur API Unsplash:", error);

    const message =
      error instanceof Error ? error.message : "Erreur inconnue";

    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}