import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IDetail } from 'src/app/model/IDetail.model';
import { IDetailLocation } from 'src/app/model/IDetailLocation.model';
import { RestService } from 'src/app/Service/rest.service';

@Component({
  selector: 'app-detail-location',
  templateUrl: './detail-location.component.html',
  styleUrls: ['./detail-location.component.css'],
})
export class DetailLocationComponent implements OnInit {
  public location?: IDetailLocation;

  public personaje?: IDetail;

  constructor(
    private activatedRoute: ActivatedRoute,
    private restService: RestService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((respuesta) => {
      const url = respuesta['url'];

      if (url) {
        this.getDetailLocation(url);
      }
    });
  }

  getDetailLocation(url: string) {
    this.restService.getDetailLocation(url).subscribe((resp) => {
      this.location = resp;
    });
  }

  // boton detalle
  getDetallePersonaje(url: string) {
    this.router.navigate(['/detail'], { queryParams: { url } });
  }
}
