import fetch from 'node-fetch';

const BASE_URL = 'https://api.unsplash.com';

export async function fetchPhotos (query = "nature", page = 1) {
    const accessKey = process.env.UNSPLASH_ACCESS_KEY;
    
    if (!accessKey) {
        throw new Error("❌ UNSPLASH_ACCESS_KEY non définie dans .env.local");
    }

    const res = await fetch(
        `${BASE_URL}/search/photos?query=${query}&page=${page}&per_page=12&client_id=${accessKey}`
    );

    if(!res.ok) {
        throw new Error("❌ Erreur lors de la récupération des photos depuis Unsplash");
    }

    const data = await res.json();
    return data.results;
}