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

  public pagesArray: number[] = []; // Array que contiene los números de página, la lista de 42 paginas o las que sean en el caso de la busqueda por nombre, se asigna su valor en el getAll a traves de this.pages = respuesta.info.pages;
  public pages: number = 0;
  public paginaActual: number = 1; //pagina actual, se usa en el [(ngModel)]="paginaActual" es el numero de la pagina en la que estoy para que se pinte

  public filtroNombre: string | null = null; // Indica si hay un filtro activo en la busqueda por nombre
  

  constructor(private restService: RestService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
      this.cargando = true;
      
      this.route.queryParams.subscribe((params)=>{ // recoge la busqueda por nombre del header en buscarPersonaje()
        const url = params['myUrl']
        
        if(url){ // esta url viene con el nombre de busqueda
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

      this.next = respuesta.info.next;  // asigno a rext y prev la info del json de la api, que contiene las rutas. (luego las usare en cambiarPagina())
      this.prev = respuesta.info.prev;

      this.pages = respuesta.info.pages;
      this.pagesArray = Array.from({ length: this.pages },(value , index) => index + 1 );  //Array.from(obj, mapFunction)
    });
  }


  public getDetalle(url: string) {
    this.router.navigate(['detail'], { queryParams: { url } }); //{ queryParams: { url: "https://rickandmortyapi.com/api/character/1" } } - que es personaje.url
  } //queryParams permite enviar datos adicionales junto con la navegación. En este caso, estás enviando el valor de url como un parámetro de consulta.


 
//Para cambiar de pagina con los botones:
  public cambiarPagina(direction: string): void {
    let url:string = '';

    if (direction === 'prev' && this.prev) { //que el texto sea prev y que exista una url previa (que prev no sea null en el json de la API)
      url = this.prev; //prev y next ya tienen valor asignado en el método getAll de cuando se recarga la pagina
      this.paginaActual--; // Decrementa la página actual
    } else if (direction === 'next' && this.next) {
      url = this.next;
      this.paginaActual++; // Incrementa la página actual
    }
 
    if (url) {
      this.getAll(url); // Carga los datos de la nueva página
    }
  }

  //para ir a la pagina cambiando el numero en el select desplegable. (Al elegir un numero del option, cojo el valor del nombre de la url y con const selectedPage = event.target.value; obtengo la página seleccionada (1,2,3,4...) y con eso formo la url que le paso al getAll)
  public cargarPagina(event: any): void {   
    const selectedPage = event.target.value; // Obtén la página seleccionada (1,2,3,4...)

    let url = '';
    if (this.filtroNombre) { //(se le ha asignado  valor en getFilterFromUrl())
      // Si hay filtro de búsqueda, incluye el filtro en la URL
      url = `https://rickandmortyapi.com/api/character?name=${this.filtroNombre}&page=${selectedPage}`;
    } else {
      // Si no hay filtro, usa la URL general porque no he buscado nada y estoy en la pagina principal y quiero seleccionar pagina desde el option
      url = `https://rickandmortyapi.com/api/character?page=${selectedPage}`;
    }

    this.paginaActual = selectedPage; // Actualiza el número de página actual
    this.getAll(url); // Llama al método para cargar los datos
  }

  // Método auxiliar para extraer el nombre del filtro desde la URL para en el OnInit asiganrselo al filtroNombre
  private getFilterFromUrl(url: string): string | null {
    const params = new URLSearchParams(url.split('?')[1]); // Obtén los parámetros
    return params.get('name'); // Devuelve el valor de name (?name=...)
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








