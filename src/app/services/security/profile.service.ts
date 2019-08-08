import { Injectable } from '@angular/core';
import { CrudService } from '@services/common/crud.service';
import { Profile } from '@models/security/profile.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfileService extends CrudService<Profile> {
  constructor(_http: HttpClient) {
    super(_http);
    this.setUrl('profiles');
   }
}
