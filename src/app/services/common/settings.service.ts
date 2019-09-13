import { Injectable } from '@angular/core';
import { CrudService } from '@services/common/crud.service';
import { Settings } from '@models/common/settings.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SettingsService extends CrudService <Settings> {

  constructor( _http: HttpClient ) { 
    super(_http);
    this.setUrl('settings');
  }
}
