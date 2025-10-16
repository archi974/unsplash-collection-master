export interface UnsplashPhoto {
    id: string;
    alt_description: string;
    description: string;
    created_at: string;
    width: number;
    height: number;
    urls: {
        small: string;
        regular: string;
        full: string;
    };
    user: {
        name: string;
        username: string;
        profile_image: {
            small: string;
            medium: string;
            large: string;
        }
        links: {
            html: string;
        };
    };
    links: {
        html: string;
    };
}
