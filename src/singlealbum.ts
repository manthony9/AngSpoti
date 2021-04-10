import { ArtistObject } from './artist';
import { ExternalUrlObject } from './ExternalUrlObject';
import { ImageObject } from './image';
import { CopyrightObject } from './CopyrightObject';
import { ExternalIdObject } from './ExternalIdObject';
import { tracks } from './tracks';
import { SimplifiedTrackObject } from './SimpliefiedTrackObject';

export interface SingleAlbum {
  album_type: String;
  artists: Array<ArtistObject>;
  available_markets: Array<String>;
  copyrights: Array<CopyrightObject>;
  external_ids: ExternalIdObject;
  external_urls: ExternalUrlObject;
  genres: Array<String>;
  href: String;
  id: String;
  images: Array<ImageObject>;
  label: String;
  name: String;
  popularity: number;
  release_date: String;
  release_date_precision: String;
  total_tracks: number;
  tracks: SimplifiedTrackObject;
  type: String;
  uri: String;
}
