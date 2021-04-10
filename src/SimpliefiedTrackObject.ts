import { ArtistObject } from './artist';
import { ExternalUrlObject } from './ExternalUrlObject';

export interface SimplifiedTrackObject {
  artists: Array<ArtistObject>;
  available_markets: Array<String>;
  disc_number: Number;
  duration_ms: Number;
  explicit: Boolean;
  external_urls: ExternalUrlObject;
  href: String;
  id: String;
  is_local: Boolean;
  name: String;
  preview_url: String;
  track_number: Number;
  type: String;
  uri: String;
}
