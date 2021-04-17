import { Component, OnInit } from '@angular/core';
import * as albumData from '../json.data/SearchResultsAlbums.json';
import * as artistData from '../json.data/SearchResultsArtist.json';
import { Album } from '../../album';
import { SingleArtist } from '../../singleArtist';
import { ActivatedRoute, Params } from '@angular/router';
import { MusicDataService } from '../music-data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-artist-discography',
  templateUrl: './artist-discography.component.html',
  styleUrls: ['./artist-discography.component.css'],
})
export class ArtistDiscographyComponent implements OnInit {
  constructor(private route: ActivatedRoute, private ms: MusicDataService) {}
  public albums;
  public artist;
  public id;
  public sub;
  public albumSub;
  public artistSub;
  ngOnInit() {
    // this.albumSub = this.route.params.subscribe((params: Params) =>
    //   this.ms.getArtistById(params.id).subscribe((data) => (this.artist = data))
    // );
    //this.sub = this.route.params.subscribe((params) => {
    //  this.id = +params['id'];
    //});

    this.id = this.route.snapshot.paramMap.get('id');

    //this.releasesSub = this.ms.getNewReleases().subscribe((obj) => {
    // this.releases = obj.albums.items;
    //});

    this.artistSub = this.ms.getArtistById(this.id).subscribe((obj) => {
      this.artist = obj;
    });

    this.albumSub = this.ms.getAlbumsByArtistId(this.id).subscribe((obj) => {
      console.log(obj.items);
      this.albums = obj.items.filter((dat, pos, arr) => {
        return arr.map((x) => x.name).indexOf(dat.name) === pos;
      });
    });
  }

  ngOnDestroy() {
    this.albumSub.unsubscribe();
    this.artistSub.unsubscribe();
  }
}
