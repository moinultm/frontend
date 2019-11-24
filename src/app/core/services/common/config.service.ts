import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CrudService } from './crud.service';
import { Settings } from '@app/shared/models/common/settings.model';


@Injectable({
  providedIn: 'root'
})
export class ConfigureService extends CrudService <Settings> {
  data: any = {};

  constructor(private __http: HttpClient ) {
    super(__http);
    this.setUrl('settings');
  }

  use(lang: string): Promise<{}> {
    return new Promise<{}>((resolve, reject) => {
      const confPath = this.url;
      this.__http.get<{}>(confPath).subscribe(
       settings => {
          this.data = Object.assign({},settings || {});
          resolve(this.data);
        },
        error => {
          this.data = {};
          resolve(this.data);
        }
      );
    });
  }


}
