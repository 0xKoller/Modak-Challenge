export type Artwork = {
    id?: string;
    title?: string;
    artist_display?: string;
    image_id?: string;
    api_link?: string;
};
export type Exhibitions = {
    id?: string;
    title?: string;
    image_id?: string;
    api_link?: string;
    short_description?: string;
    gallery_title?: string;
    status?: string;
    aic_start_at?: string;
    aic_end_at?: string;
    artwork_ids?: string[];
};