import { Injectable } from '@angular/core';
import { Role } from '../models/role.model';


import { TokenService } from './security/token.service';
import { Observable } from 'rxjs';

import { CrudService } from './common/crud.service';
import { HttpClient } from '@angular/common/http';
import { PartialList } from '../models/common/patial-list.model';


@Injectable({
  providedIn: 'root'
})
export class RoleService extends CrudService <Role>  {
//list : PartialList<Role>;
  constructor( _http: HttpClient ) {
  super(_http);

  }

    //refreshList(){    this._http.get('http://localhost:8000/api/roles')    .toPromise()    .then(res => this.list = res as PartialList<Role>    );
 

 



}
