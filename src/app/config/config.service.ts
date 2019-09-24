import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Fondo } from '../model/fondo.model';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable()
export class ConfigService {
  constructor(private http: HttpClient) { }


getFondi(url) : Observable<Fondo[]> {
    console.log("Entra");
    // now returns an Observable of Config
    return this.http.get<Fondo[]>(url);
  }


}