import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ILocation, Result } from 'src/app/model/ILocation.model';
import { RestService } from 'src/app/Service/rest.service';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css'],
})
export class LocationsComponent implements OnInit {
  public locations: Result[] = [];

  constructor(private restService: RestService, private router: Router) {}

  ngOnInit(): void {
    this.getAllLocation();
  }

  public getAllLocation() {
    this.restService.getAllLocation().subscribe((respuesta: ILocation) => {
      this.locations = respuesta.results;
      console.log(location);
    });
  }

  getDetailLocation(url: string) {
    this.router.navigate(['detail-location'], { queryParams: { url } });
  }
}
