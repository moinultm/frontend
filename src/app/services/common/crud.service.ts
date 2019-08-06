import { Injectable } from '@angular/core';
import { TokenService } from '../security/token.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PartialList } from 'src/app/models/common/patial-list.model';


@Injectable({
  providedIn: 'root'
})
export class CrudService  <T> {
  protected url: string;

  protected options: any;

  constructor(private _http:  HttpClient  ) {

   }

   public find(query?: {}): any {
    return this._http.get<PartialList<T>>('http://localhost:8000/api/roles?page=1');
  }


}
