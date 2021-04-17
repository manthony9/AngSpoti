import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { SpotifyTokenService } from './spotify-token.service';
import { environment } from './../environments/environment';
import { mergeMap } from 'rxjs/operators';
import { discardPeriodicTasks } from '@angular/core/testing';

@Injectable({
  providedIn: 'root',
})
export class MusicDataService {
  constructor(
    private spotifyToken: SpotifyTokenService,
    private http: HttpClient
  ) {}

  getNewReleases(): Observable<SpotifyApi.ListOfNewReleasesResponse> {
    return this.spotifyToken.getBearerToken().pipe(
      mergeMap((token) => {
        return this.http.get<any>(
          'https://api.spotify.com/v1/browse/new-releases',
          { headers: { Authorization: `Bearer ${token}` } }
        );
      })
    );
  }

  getArtistById(id): Observable<SpotifyApi.ArtistSearchResponse> {
    return this.spotifyToken.getBearerToken().pipe(
      mergeMap((token) => {
        return this.http.get<any>(`https://api.spotify.com/v1/artists/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      })
    );
  }

  getAlbumsByArtistId(id): Observable<SpotifyApi.ArtistsAlbumsResponse> {
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

  getAlbumById(id): Observable<SpotifyApi.SingleAlbumResponse> {
    return this.spotifyToken.getBearerToken().pipe(
      mergeMap((token) => {
        return this.http.get<any>(`https://api.spotify.com/v1/albums/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      })
    );
  }

  searchArtists(searchString): Observable<SpotifyApi.ArtistSearchResponse> {
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

  addToFavourites(id): Observable<[String]> {
    // TODO: make a PUT request to environment.userAPIBase/favourites/:id to add id to favourites

    return this.http.put<[String]>(
      `${environment.userAPIBase}/favourites/${id}`,
      {
        params: id,
      }
    );
  }

  // removeFromFavourites(id): Observable<any> {
  //   var del = this.favouritesList.indexOf(id);
  //   if (del !== -1) {
  //     this.favouritesList.splice(del, 1);
  //   }

  //   return this.getFavourites();
  // }

  removeFromFavourites(id): Observable<any> {
    return this.http
      .delete<[String]>(`${environment.userAPIBase}/favourites/${id}`)
      .pipe(
        mergeMap((favouritesArray) => {
          // TODO: Perform the same tasks as the original getFavourites() method, only using "favouritesArray" from above, instead of this.favouritesList

          if (favouritesArray.indexOf(id) !== -1) {
            favouritesArray.splice(favouritesArray.indexOf(id), 1);
          }
          return this.getFavourites();
          // NOTE: for the empty array, you will need to use o=>o.next({tracks: []}) instead of o=>{o.next([])}
        })
      );
  }

  // getFavourites(): Observable<any> {
  //   let params = new HttpParams().set('ids', this.favouritesList.join());

  //   if (this.favouritesList.length > 0) {
  //     return this.spotifyToken.getBearerToken().pipe(
  //       mergeMap((token) => {
  //         return this.http.get<any>(
  //           `https://api.spotify.com/v1/tracks`,

  //           {
  //             headers: { Authorization: `Bearer ${token}` },
  //             params,
  //           }
  //         );
  //         console.log(this.favouritesList);
  //       })
  //     );
  //   } else {
  //     return new Observable((o) => {
  //       o.next([]);
  //     });
  //   }
  // }

  getFavourites(): Observable<any> {
    return this.http
      .get<[String]>(`${environment.userAPIBase}/favourites/`)
      .pipe(
        mergeMap((favouritesArray) => {
          // TODO: Perform the same tasks as the original getFavourites() method, only using "favouritesArray" from above, instead of this.favouritesList
          // NOTE: for the empty array, you will need to use o=>o.next({tracks: []}) instead of o=>{o.next([])}
          console.log(favouritesArray.join());
          if (favouritesArray) {
            let params = new HttpParams().set('ids', favouritesArray.join());
            return this.spotifyToken.getBearerToken().pipe(
              mergeMap((token) => {
                return this.http.get<any>(
                  `https://api.spotify.com/v1/tracks/`,

                  {
                    headers: { Authorization: `Bearer ${token}` },
                    params,
                  }
                );
              })
            );
          } else {
            return new Observable((o) => {
              o.next({ tracks: [] });
            });
          }
        })
      );
  }
}
