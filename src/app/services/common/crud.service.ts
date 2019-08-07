import { Injectable } from '@angular/core';
import { TokenService } from '../security/token.service';
import { HttpClient,HttpParams, HttpHeaders} from '@angular/common/http';
import { PartialList } from '@models/common/patial-list.model';

import { environment } from '@env/environment';


@Injectable({
  providedIn: 'root'
})
export class CrudService<T> {

  protected options: any;
  protected headers: any;
  list : PartialList<T>;

  protected url ='http://localhost:8000/api/roles';

  constructor(private _http:  HttpClient ) {
  this.headers = new HttpHeaders({ 'Content-Type': 'application/json'  });
  this.options = {headers: this.headers }
   }

   //general search
   public find(query?: {}): any {
    if (query) {
      this.options.params = query;
    } else {
      this.options.params = undefined;
    }
    return this._http.get <PartialList<T>>('http://localhost:8000/api/roles',this.options);
  }

  //specific search
  public findById(id: number): any {
    this.options.params = undefined;
    return this._http.get<T>(this.url + '/' + id, this.options);
  }

  //Save function
  public save(model: any, update?: boolean): any {
    this.options.params = undefined;
    if (update) {
      return this._http.put<T>(this.url + '/' + model.id, model, this.options);
    } else {
      return this._http.post<T>(this.url, model, this.options);
    }
  }

//Delete Function
public delete(model: any): any {
  this.options.params = undefined;
  return this._http.delete<T>(this.url + '/' + model.id, this.options);
}

setUrl(url: String): void {
  this.url = environment.rest_url + '' + url;
}

}
