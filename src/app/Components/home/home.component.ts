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

  public next:string  | null = null;
  public prev:string | null = null;

  public pagesArray: number[] = []; // Array que contiene los números de página
  public pages: number = 0;
  public currentPage: number = 1;
  

  constructor(private restService: RestService, private router: Router) {}

  ngOnInit(): void {
      this.cargando = true;
      this.getAll('https://rickandmortyapi.com/api/character'); 
  }

  public getAll(url: any) {
    this.restService.getAll(url).subscribe((respuesta: IPersonajes) => { //respuesta tiene info (con next y previous) y results
      this.personajes = respuesta.results;

      this.next = respuesta.info.next;
      this.prev = respuesta.info.prev;

      this.pages = respuesta.info.pages;
        this.pagesArray = Array.from(
          { length: this.pages },
          (_, index) => index + 1
        );
    });
  }

  public getDetalle(url: string) {
    this.router.navigate(['detail'], { queryParams: { url } }); //{ queryParams: { url: "https://rickandmortyapi.com/api/character/1" } } - que es personaje.url
  } //queryParams permite enviar datos adicionales junto con la navegación. En este caso, estás enviando el valor de url como un parámetro de consulta.


//para ir a la pagina cambiando el numero en el select
  public cargarPagina(event: any): void { 
    const selectedPage = event.target.value; // Obtén el número de página seleccionado
    const url = `https://rickandmortyapi.com/api/character?page=${selectedPage}`;
    this.currentPage = selectedPage; // Actualizamos la página actual
    this.getAll(url); // Carga los datos de la página seleccionada
  }
 
  //Para cambiar de pagina con los botones:
  public cambiarPagina(direction: string): void {
    let url = '';
 
    if (direction === 'prev' && this.prev) { //que el texto sea prev y que exista una url previa
      url = this.prev;
      this.currentPage--; // Decrementa la página actual
    } else if (direction === 'next' && this.next) {
      url = this.next;
      this.currentPage++; // Incrementa la página actual
    }
 
    if (url) {
      this.getAll(url); // Carga los datos de la nueva página
    }
  }
}
