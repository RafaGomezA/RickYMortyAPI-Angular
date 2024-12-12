import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IPersonajes, Result } from 'src/app/model/IPersonajes.model';
import { RestService } from 'src/app/Service/rest.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public personajes: Result[] = []; // en el json de rickymorty tengo tipo info y tipo result que es donde estan los personajes
  public cargando: boolean = false;

  constructor(private restService: RestService, private router: Router) {}

  ngOnInit(): void {
      this.cargando = true;
      this.getAll(); 
  }

  public getAll() {
    this.restService.getAll().subscribe((respuesta: IPersonajes) => {
      this.personajes = respuesta.results;
    });
  }

  public getDetalle(url: string) {
    this.router.navigate(['detail'], { queryParams: { url } }); //{ queryParams: { url: "https://rickandmortyapi.com/api/character/1" } } - que es personaje.url
  } //queryParams permite enviar datos adicionales junto con la navegación. En este caso, estás enviando el valor de url como un parámetro de consulta.
}
