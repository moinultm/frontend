import { Injectable } from '@angular/core';
import { Role } from '@models/role.model';

import { CrudService } from './common/crud.service';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class RoleService extends CrudService <Role>  {
  constructor( _http: HttpClient ) {
  super(_http);
  }
}
