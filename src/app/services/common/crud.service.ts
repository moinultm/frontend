import { Injectable } from '@angular/core';
import { TokenService } from '../security/token.service';
import { HttpClient,HttpParams} from '@angular/common/http';
import { PartialList } from 'src/app/models/common/patial-list.model';
import { Role } from 'src/app/models/role.model';


@Injectable({
  providedIn: 'root'
})
export class CrudService<T> {

  protected options: any;
  protected headers: any;
  list : PartialList<T>;

  constructor(private _http:  HttpClient  ) {
    this.headers = new Headers({ 
      'Accept': 'application/json', 
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache, no-store, must-revalidate, post-check=0, pre-check=0',
      'Pragma': 'no-cache',
      'Expires': '0'
    });
    
   }

   public find(query?: {}): any {
    const  params = new  HttpParams().set('page', "1").set('size', "1");
   
    return this._http.get <PartialList<T>>('http://localhost:8000/api/roles',{params});
  }
 

}
