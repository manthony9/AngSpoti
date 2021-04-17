import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css'],
})
export class FavouritesComponent implements OnInit {
  favourites: Array<any>;
  favSub;
  constructor(private route: ActivatedRoute, private ms: MusicDataService) {}

  convertTime(dur) {
    let tm = dur as number;
    return (tm / 60000).toFixed(2);
  }

  removeFromFavourites(id) {
    this.favSub = this.ms.removeFromFavourites(id).subscribe((obj) => {
      this.favourites = obj.tracks;
    });
  }

  ngOnInit() {
    this.favSub = this.ms.getFavourites().subscribe((obj) => {
      console.log(obj.tracks);
      this.favourites = obj.tracks;
    });
  }

  ngOnDestroy() {
    this.favSub.unsubscribe();
  }
}
