import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { DetailComponent } from './Components/detail/detail.component';
import { LocationsComponent } from './Components/locations/locations.component';
import { EpisodesComponent } from './Components/episodes/episodes.component';
import { InicioComponent } from './Components/inicio/inicio.component';
import { DetailLocationComponent } from './Components/detail-location/detail-location.component';

const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'home', component: HomeComponent },
  { path: 'detail', component: DetailComponent },
  { path: 'location', component: LocationsComponent },
  { path: 'episode', component: EpisodesComponent },
  { path: 'detail-location', component: DetailLocationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
