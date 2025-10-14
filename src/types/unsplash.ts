export interface UnsplashPhoto {
    id: string;
    alt_description: string | null;
    description?: string | null;
    created_at?: string;
    urls: {
        small: string;
        regular: string;
        full: string;
    };
    user: {
        name: string;
        username: string;
        links: {
            html: string;
        };
    };
    links: {
        html: string;
    };
}
