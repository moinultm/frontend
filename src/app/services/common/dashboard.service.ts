import { Injectable } from '@angular/core';
import { CrudService } from '@services/common/crud.service';
import { Settings } from '@models/common/settings.model';
import { HttpClient } from '@angular/common/http';
import { PartialList } from '@models/common/patial-list.model';
import { Dashboard } from '@models/common/dashboard.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService extends CrudService <Dashboard> {
  constructor(private __http: HttpClient ) {
    super(__http);
    this.setUrl('dashboard');
  }


  public getDashboardSummary(): any {
    this.options.params = undefined;
    return this.__http.get <PartialList<Dashboard>>(this.url , this.options);
  }



}
