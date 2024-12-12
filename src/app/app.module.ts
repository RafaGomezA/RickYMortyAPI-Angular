import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './Components/header/header.component';
import { DetailComponent } from './Components/detail/detail.component';
import { HomeComponent } from './Components/home/home.component';
import { LocationsComponent } from './Components/locations/locations.component';
import { EpisodesComponent } from './Components/episodes/episodes.component';
import { InicioComponent } from './Components/inicio/inicio.component';
import { DetailLocationComponent } from './Components/detail-location/detail-location.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DetailComponent,
    HomeComponent,
    LocationsComponent,
    EpisodesComponent,
    InicioComponent,
    DetailLocationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
