import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewReleasesComponent } from './new-releases/new-releases.component';
import { AlbumComponent } from './album/album.component';
import { ArtistDiscographyComponent } from './artist-discography/artist-discography.component';
import { AboutComponent } from './about/about.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { FavouritesComponent } from './favourites/favourites.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: 'favourites', component: FavouritesComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'search', component: SearchResultComponent },
  { path: 'newReleases', component: NewReleasesComponent },
  { path: 'album/:id', component: AlbumComponent },
  { path: 'artist/:id', component: ArtistDiscographyComponent },
  { path: 'about', component: AboutComponent },
  { path: '', component: NewReleasesComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
