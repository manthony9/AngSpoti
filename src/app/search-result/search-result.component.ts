import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { MusicDataService } from '../music-data.service';
import { filter, map } from 'rxjs/operators';
@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css'],
})
export class SearchResultComponent implements OnInit {
  results: any;
  searchQuery: any;

  public searchSub;
  constructor(private route: ActivatedRoute, private ms: MusicDataService) {}

  ngOnInit() {
    this.searchQuery = this.route.snapshot.queryParams['q'];
    console.log(this.searchQuery);
    this.searchSub = this.ms
      .searchArtists(this.searchQuery)
      .subscribe((obj) => {
        this.results = obj.artists.items.filter((data) => {
          if (data.images.length > 0) {
            return data;
          }
        });
      });
  }
}
