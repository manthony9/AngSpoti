import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { SpotifyTokenService } from './spotify-token.service';

import { mergeMap } from 'rxjs/operators';
import { discardPeriodicTasks } from '@angular/core/testing';

@Injectable({
  providedIn: 'root',
})
export class MusicDataService {
  favouritesList: Array<any> = [];
  constructor(
    private spotifyToken: SpotifyTokenService,
    private http: HttpClient
  ) {}

  getNewReleases(): Observable<any> {
    return this.spotifyToken.getBearerToken().pipe(
      mergeMap((token) => {
        return this.http.get<any>(
          'https://api.spotify.com/v1/browse/new-releases',
          { headers: { Authorization: `Bearer ${token}` } }
        );
      })
    );
  }

  getArtistById(id): Observable<any> {
    return this.spotifyToken.getBearerToken().pipe(
      mergeMap((token) => {
        return this.http.get<any>(`https://api.spotify.com/v1/artists/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      })
    );
  }

  getAlbumsByArtistId(id): Observable<any> {
    let params = new HttpParams()
      .set('include_groups', 'album')
      .set('include_groups', 'single')
      .set('limit', '50');
    return this.spotifyToken.getBearerToken().pipe(
      mergeMap((token) => {
        return this.http.get<any>(
          `https://api.spotify.com/v1/artists/${id}/albums`,

          {
            headers: { Authorization: `Bearer ${token}` },
            params,
          }
        );
      })
    );
  }

  getAlbumById(id): Observable<any> {
    return this.spotifyToken.getBearerToken().pipe(
      mergeMap((token) => {
        return this.http.get<any>(`https://api.spotify.com/v1/albums/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      })
    );
  }

  searchArtists(searchString): Observable<any> {
    const params = new HttpParams()
      .set('q', searchString)
      .set('type', 'artist')
      .set('limit', '50');
    return this.spotifyToken.getBearerToken().pipe(
      mergeMap((token) => {
        return this.http.get<any>(
          `https://api.spotify.com/v1/search`,

          {
            headers: { Authorization: `Bearer ${token}` },
            params,
          }
        );
      })
    );
  }

  addToFavourites(id) {
    if (id || id < 50) {
      this.favouritesList.push(id);
      return true;
    } else return false;
  }

  removeFromFavourites(id): Observable<any> {
    var del = this.favouritesList.indexOf(id);
    if (del !== -1) {
      this.favouritesList.splice(del, 1);
    }

    return this.getFavourites();
  }

  getFavourites(): Observable<any> {
    let params = new HttpParams().set('ids', this.favouritesList.join());

    if (this.favouritesList.length > 0) {
      return this.spotifyToken.getBearerToken().pipe(
        mergeMap((token) => {
          return this.http.get<any>(
            `https://api.spotify.com/v1/tracks`,

            {
              headers: { Authorization: `Bearer ${token}` },
              params,
            }
          );
          console.log(this.favouritesList);
        })
      );
    } else {
      return new Observable((o) => {
        o.next([]);
      });
    }
  }
}
