import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestService } from 'src/app/Service/rest.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public nombrePersonaje :string = "";

  constructor(private router: Router, private restService: RestService) { }

  ngOnInit(): void {
  }

  buscarPersonaje(){
    if (this.nombrePersonaje.trim().length > 0) {
      this.router.navigate(["home"], {
        queryParams: {
          myUrl: 'https://rickandmortyapi.com/api/character?name=' + this.nombrePersonaje},
          //queryParamsHandling: "merge"
          })
    } 
    this.nombrePersonaje = "";
  }

}
