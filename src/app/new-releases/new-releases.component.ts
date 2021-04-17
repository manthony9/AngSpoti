import { Component, OnInit } from '@angular/core';
import * as data from '../json.data/NewReleasesAlbums.json';
import { Album } from '../../album';

import { Observable } from 'rxjs';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-new-releases',
  templateUrl: './new-releases.component.html',
  styleUrls: ['./new-releases.component.css'],
})
export class NewReleasesComponent implements OnInit {
  public staticRelease;
  public releases;
  private releasesSub;
  constructor(private ms: MusicDataService) {}

  ngOnInit() {
    this.staticRelease = this.ms.getNewReleases();
    this.releasesSub = this.ms.getNewReleases().subscribe((obj) => {
      this.releases = obj.albums.items;
    });
  }

  ngOnDestroy() {
    this.releasesSub.unsubscribe();
  }
}
