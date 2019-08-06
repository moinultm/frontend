import { Injectable } from '@angular/core';
import { TokenService } from '../security/token.service';
import { HttpClient,HttpParams, HttpHeaders} from '@angular/common/http';
import { PartialList } from 'src/app/models/common/patial-list.model';
import { Role } from 'src/app/models/role.model';


@Injectable({
  providedIn: 'root'
})
export class CrudService<T> {

  protected options: any;
  protected headers: any;
  list : PartialList<T>;
  protected url ='';
  constructor(private _http:  HttpClient ) {
  this.headers = new HttpHeaders({     
       'Accept': 'application/json',
        'Content-Type': 'application/json'
      });   
      this.options = {headers: this.headers }
   }

   public find(query?: {}): any {    
    if (query) {
      this.options.params = query;
    } else {
      this.options.params = undefined;
    }     
    return this._http.get <PartialList<T>>('http://localhost:8000/api/roles',this.options);
  }
 
  public findById(id: number): any {
    this.options.params = undefined;
    return this._http.get<T>(this.url + '/' + id, this.options);
  }


}
