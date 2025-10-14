import { fetchPhotos } from "../services/unsplashService.js";

async function main() {
  try {
    const photos = await fetchPhotos("forest");
    console.log("🌲 Résultats Unsplash :", photos.slice(0, 2));
  } catch (err) {
    console.error("❌ Erreur :", err);
  }
}

main();