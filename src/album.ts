import { ArtistObject } from './artist';
import { ExternalUrlObject } from './ExternalUrlObject';
import { ImageObject } from './image';

export interface Album {
  album_type: String;
  artists: Array<ArtistObject>;
  available_markets: Array<String>;
  external_urls: ExternalUrlObject;
  href: String;
  id: String;
  images: Array<ImageObject>;
  name: String;
  release_date: String;
  release_date_precision: String;
  total_tracks: number;
  type: String;
  uri: String;
}
