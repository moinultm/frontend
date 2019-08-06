import { Injectable } from '@angular/core';
import { Role } from '../models/role.model';


import { TokenService } from './security/token.service';
import { Observable } from 'rxjs';

import { CrudService } from './common/crud.service';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class RoleService extends CrudService<Role> {
  //list : Role[];
  constructor( _http: HttpClient ) {
    super(_http);

  }



 // public find(query?: {}): any {    return  this._http.get('http://localhost:8000/api/roles?page=1');  }



}
