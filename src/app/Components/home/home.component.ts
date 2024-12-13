import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  public paginaActual: number = 1; //pagina actual

  public filtroNombre: string | null = null; // Indica si hay un filtro activo en la busqueda por nombre
  

  constructor(private restService: RestService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
      this.cargando = true;
      
      this.route.queryParams.subscribe((params)=>{ // recoge la busqueda por nombre del header en buscarPersonaje()
        const url = params['myUrl']
        
        if(url){
          this.filtroNombre = this.getFilterFromUrl(url); // Extrae el filtro de la URL
          this.getAll(url);
        }else{
          this.filtroNombre = null; // Reinicia el filtro si no hay búsqueda
          this.getAll('https://rickandmortyapi.com/api/character'); 
        }
      })
  }

  public getAll(url: any) {
    this.restService.getAll(url).subscribe((respuesta: IPersonajes) => { //respuesta tiene info (con next y previous) y results
      this.personajes = respuesta.results;

      this.next = respuesta.info.next;
      this.prev = respuesta.info.prev;

      this.pages = respuesta.info.pages;
      this.pagesArray = Array.from({ length: this.pages },(_, index) => index + 1 );
    });
  }


  public getDetalle(url: string) {
    this.router.navigate(['detail'], { queryParams: { url } }); //{ queryParams: { url: "https://rickandmortyapi.com/api/character/1" } } - que es personaje.url
  } //queryParams permite enviar datos adicionales junto con la navegación. En este caso, estás enviando el valor de url como un parámetro de consulta.


 
//Para cambiar de pagina con los botones:
  public cambiarPagina(direction: string): void {
    let url = '';
 
    if (direction === 'prev' && this.prev) { //que el texto sea prev y que exista una url previa (que prev no sea null)
      url = this.prev;
      this.paginaActual--; // Decrementa la página actual
    } else if (direction === 'next' && this.next) {
      url = this.next;
      this.paginaActual++; // Incrementa la página actual
    }
 
    if (url) {
      this.getAll(url); // Carga los datos de la nueva página
    }
  }

  //para ir a la pagina cambiando el numero en el select
  public cargarPagina(event: any): void { 
    // const selectedPage = event.target.value; // Obtén el número de página seleccionado
    // const url = `https://rickandmortyapi.com/api/character?page=${selectedPage}`;
    // this.paginaActual = selectedPage; // Actualizamos la página actual
    // this.getAll(url); // Carga los datos de la página seleccionada
  
    const selectedPage = event.target.value; // Obtén la página seleccionada

    let url = '';
    if (this.filtroNombre) {
      // Si hay filtro de búsqueda, incluye el filtro en la URL
      url = `https://rickandmortyapi.com/api/character?name=${this.filtroNombre}&page=${selectedPage}`;
    } else {
      // Si no hay filtro, usa la URL general
      url = `https://rickandmortyapi.com/api/character?page=${selectedPage}`;
    }

    this.paginaActual = selectedPage; // Actualiza el número de página actual
    this.getAll(url); // Llama al método para cargar los datos
  }

  // Método auxiliar para extraer el nombre del filtro desde la URL
  private getFilterFromUrl(url: string): string | null {
    const params = new URLSearchParams(url.split('?')[1]); // Obtén los parámetros
    return params.get('name'); // Devuelve el filtro si existe
  }
  /*
  url.split('?'): Divide la URL en dos partes usando el carácter ? como separador.

  Primera parte: "https://rickandmortyapi.com/api/character"
  Segunda parte: "name=Rick&page=2"
  url.split('?')[1]: Toma la segunda parte, que contiene los parámetros de consulta (name=Rick&page=2).


  params contendrá un objeto que representa los parámetros:

  Por ejemplo de https://rickandmortyapi.com/api/character?name=Rick&page=2 con el split saca automaticamente
      {
        "name": "Rick",
        "page": "2"
      }

  */

}








