import { Injectable } from '@angular/core';
import { CrudService } from '@app/core/services/common/crud.service';
import { Settings } from '@app/shared/models/common/settings.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SettingsService extends CrudService <Settings> {

  data: any = {};

  constructor(private __http: HttpClient ) {
    super(__http);
    this.setUrl('settings');
  }


  public save(model: any, update?: boolean): any {
    this.options.params = undefined;
    if (update) {
      return this.__http.post<Settings>(this.url + '/' + model.get('id'), model, this.options);
    } else {
      return this.__http.post<Settings>(this.url, model, this.options);
    }
  }

  public getPosition(): Promise<any>
  {
    return new Promise((resolve, reject) => {

      navigator.geolocation.getCurrentPosition(resp => {
          resolve({lng: resp.coords.longitude, lat: resp.coords.latitude});
        },
        err => {
          reject(err);
        });
    });
  }


}
