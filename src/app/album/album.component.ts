import * as data from '../json.data/SearchResultsAlbum.json';
import { SingleAlbum } from '../../singlealbum';
import { Album } from '../../album';
import { Component, OnInit } from '@angular/core';

import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute, Params } from '@angular/router';
import { MusicDataService } from '../music-data.service';
import { subscribeOn } from 'rxjs/operators';
import { ThrowStmt } from '@angular/compiler';
import { SimplifiedTrackObject } from 'src/SimpliefiedTrackObject';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css'],
})
export class AlbumComponent implements OnInit {
  //album: SingleAlbum = (data as any).default;
  //tracks: Array<SimplifiedTrackObject> = data.tracks.items;

  constructor(
    private MatSnackBar: MatSnackBar,
    private route: ActivatedRoute,
    private ms: MusicDataService
  ) {}
  public AlbumSub;
  public favSub;
  public tracks: Array<SimplifiedTrackObject>;
  public album: SingleAlbum;
  public id;

  addToFavourites(id) {
    if (this.ms.addToFavourites(id)) {
      this.MatSnackBar.open('Adding to Favourites', 'Done', {
        duration: 1500,
      });
    }
  }

  convertTime(dur) {
    let tm = dur as number;
    return (tm / 60000).toFixed(2);
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');

    this.AlbumSub = this.ms.getAlbumById(this.id).subscribe((obj) => {
      this.album = obj;
      this.tracks = obj.tracks.items;
    });
  }

  ngOnDestroy() {
    this.AlbumSub.unsubscribe();
  }
}
