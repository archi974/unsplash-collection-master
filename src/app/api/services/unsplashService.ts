import fetch from 'node-fetch';
import { UnsplashPhoto } from '@/types/unsplash';

const BASE_URL = 'https://api.unsplash.com';

/**
 * Récupère des photos depuis l'API Unsplash selon un mot-clé et une page donnée.
 * @param query Mot-clé de recherche (par défaut : "nature")
 * @param page Numéro de page (par défaut : 1)
 * @returns Tableau de photos Unsplash
 */

export async function fetchPhotos(
    query: string = "nature",
    page: number = 1
): Promise<UnsplashPhoto[]> {
    const accessKey = process.env.UNSPLASH_ACCESS_KEY;

    if (!accessKey) {
        throw new Error("❌ UNSPLASH_ACCESS_KEY non définie dans .env.local");
    }

    const res = await fetch(
        `${BASE_URL}/search/photos?query=${encodeURIComponent(query)}&page=${page}&per_page=12&client_id=${accessKey}`
    );

    if (!res.ok) {
        throw new Error(`❌ Erreur lors de la récupération des photos depuis Unsplash (${res.status})`);
    }

    const data = await res.json();
    return (data as { results: UnsplashPhoto[] }).results;
}

/**
 * Récupère les informations détaillées d'une photo à partir de son ID via l'API Unsplash.
 * @param id - Identifiant unique de la photo sur Unsplash.
 * @returns Une promesse résolue avec les métadonnées complètes de la photo (`UnsplashPhoto`).
 *
 * @throws {Error} Si la clé d'accès (`UNSPLASH_ACCESS_KEY`) est manquante
 * ou si la requête à l'API Unsplash échoue.
 */

export async function fetchPhotoById(id: string): Promise<UnsplashPhoto> {
    const accessKey = process.env.UNSPLASH_ACCESS_KEY;
    if (!accessKey) throw new Error("❌ UNSPLASH_ACCESS_KEY non définie");

    const res = await fetch(`https://api.unsplash.com/photos/${id}?client_id=${accessKey}`);

    if (!res.ok) throw new Error(`Erreur Unsplash (${res.status})`);

    const data = await res.json();
    return data as UnsplashPhoto;
}