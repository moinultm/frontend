import { Injectable } from '@angular/core';
 import { HttpClient,HttpParams, HttpHeaders} from '@angular/common/http';
import { PartialList } from '@app/shared/models/common/patial-list.model';

import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CrudService<T> {

  protected options: any;
  protected headers: any;
  list : PartialList<T>;

  protected url :string;

  constructor(private _http:  HttpClient ) {
//https://github.com/angular/angular/issues/13241

  this.headers = new HttpHeaders({
    'Accept': 'application/json'
    });
  this.options = {headers: this.headers }
   }

   //general search
   public find(query?: {}): any {
    if (query) {
      this.options.params = query;
    } else {
      this.options.params = undefined;
    }
    return this._http.get <PartialList<T>>(this.url,this.options);
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



findTable(
  filter :string,
  sortOrder :string,
  pageNumber:number,
  pageSize :number,
  id?:number):  Observable<any[]> {

  return this._http.get(this.url, {
      params: new HttpParams()
          .set('filter', filter)
          .set('sortOrder', sortOrder)
          .set('page', pageNumber.toString())
          .set('size', pageSize.toString())
          .set('id', id.toString()|| null)
  }).pipe(map(res =>  res["data"]) );

}

//https://www.techiediaries.com/angular-rxjs-tutorial/

}
