import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IDetail } from 'src/app/model/IDetail.model';
import { RestService } from 'src/app/Service/rest.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private restService: RestService
  ) {}

  public personaje?: IDetail;

  ngOnInit(): void {
    //recupera el parámetro url que envias desde HomeComponent:
    this.activatedRoute.queryParams.subscribe((respuesta) => {
      // en el json url es : url=https:%2F%2Frickandmortyapi.com%2Fapi%2Fcharacter%2F1
      const url = respuesta['url'];

      if (url) {
        this.restService.getDetail(url).subscribe((respuesta) => {
          this.personaje = respuesta;
        });
      }
    });
  }
}

/*
Cuando haces clic en el botón Detalle en el HomeComponent, se genera una URL como esta:
http://localhost:4200/detail?url=https://rickandmortyapi.com/api/character/1

Aquí, el queryParams tiene la clave url y su valor es "https://rickandmortyapi.com/api/character/1".
Cuando escribes respuesta["url"], estás obteniendo el valor del parámetro url desde la URL del navegador.
*/
