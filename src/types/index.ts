export type Artwork = {
  id?: string;
  title?: string;
  artist_display?: string;
  image_id?: string;
  api_link?: string;
  date_display?: string;
  place_of_origin?: string;
  dimensions?: string;
  publication_history?: string;
  exhibition_history?: string;
  artwork_type_title?: string;
  artist_title?: string;
  department_title?: string;
  material_titles?: string;
};
export type Exhibitions = {
  id?: string;
  title?: string;
  image_url?: string;
  api_link?: string;
  short_description?: string;
  gallery_title?: string;
  status?: string;
  aic_start_at?: string;
  aic_end_at?: string;
  artwork_ids?: string[];
  artwork_titles?: string[];
};

export type RootStackParams = {
  HomeTabs: undefined;
  ArtworkDetail: Artwork;
  ExhibitionDetail: { id: string };
  Saved: undefined;
  Discover: undefined;
};
