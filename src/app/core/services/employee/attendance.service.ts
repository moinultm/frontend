import { Injectable } from '@angular/core';
import { CrudService } from '@app/core/services/common/crud.service';
import { Category } from '@app/shared/models/stock/category.model';
import { HttpClient } from '@angular/common/http';
import { Attandance } from '@app/shared/models/employee/attendance.model';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService extends CrudService <Attandance> {

  constructor( private __http: HttpClient ) {
    super(__http);
    this.setUrl('attendance');
  }

  public checkAttandance(id: number): any {
    this.options.params = undefined;
    return this.__http.get (this.url + '/' + id +'/'+'get', this.options);
  }
  public outAttandance(id: number): any {
    this.options.params = undefined;
    return this.__http.get (this.url + '/' + id +'/'+'out', this.options);
  }
  public inAttandance(id: number): any {
    this.options.params = undefined;
    return this.__http.get (this.url + '/' + id +'/'+'in', this.options);
  }

}
