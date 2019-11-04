import { Injectable } from '@angular/core';
import { Role } from '@app/shared/models/security/role.model';

import { CrudService } from '../common/crud.service';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class RoleService extends CrudService <Role>  {
  constructor( _http: HttpClient ) {
  super(_http);
  this.setUrl('roles');
  }
}
