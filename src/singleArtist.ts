import { ExternalUrlObject } from './ExternalUrlObject';
import { FollowersObject } from './followers';
import { ImageObject } from './image';

export interface SingleArtist {
  external_urls: ExternalUrlObject;
  followers: FollowersObject;
  genres: Array<String>;
  href: String;
  id: String;
  images: Array<ImageObject>;
  name: String;
  popularity: Number;
  type: String;
  uri: String;
}
