import { Injectable } from '@angular/core';

import { CrudService } from '@services/common/crud.service';
import { User } from '@models/security/user.model';
import { HttpClient } from '@angular/common/http';
import { PartialList } from '@models/common/patial-list.model';


@Injectable({
  providedIn: 'root'
})
export class UserService extends CrudService<User> {

  constructor(
    private  __http: HttpClient
  ) {
    super(__http);
    this.setUrl('users');
  }


  public save(model: any, update?: boolean): any {
    this.options.params = undefined;
    if (update) {
      return this.__http.post<User>(this.url + '/' + model.get('id'), model, this.options);
    } else {
      return this.__http.post<User>(this.url, model, this.options);
    }
  }

  public findRepresentative(): any {
    this.options.params = undefined;

    return this.__http.get <PartialList<User>>(this.url + '/'+'get' +'/'+'representative', this.options);
  }


}
