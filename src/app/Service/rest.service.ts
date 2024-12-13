import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPersonajes } from '../model/IPersonajes.model';
import { IDetail } from '../model/IDetail.model';
import { ILocation } from '../model/ILocation.model';
import { IDetailLocation } from '../model/IDetailLocation.model';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  private urlCharacter :string = 'https://rickandmortyapi.com/api/character';
  private urlLocation:string = 'https://rickandmortyapi.com/api/location';

  constructor(private httpClient: HttpClient) { }

  /////////// peticiones personajes /////////// 
  // public getAll() :Observable <IPersonajes>{
  //   return this.httpClient.get<IPersonajes>(this.urlCharacter);
  // }

  /////////// peticiones personajes y también con paginación pasando la url de prev y next///////////
  public getAll(url :string) :Observable <IPersonajes>{
    return this.httpClient.get<IPersonajes>(url);
  }

  public getDetail(url :string):Observable <IDetail>{
    return this.httpClient.get<IDetail>(url);
  }

  /////////// peticiones location /////////// 
  public getAllLocation(): Observable <ILocation>{
    return this.httpClient.get<ILocation>(this.urlLocation);
  }

  public getDetailLocation(url:string): Observable <IDetailLocation>{
    return this.httpClient.get<IDetailLocation>(url);
  }


}
