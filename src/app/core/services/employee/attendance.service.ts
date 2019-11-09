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




  public save(model: any, update?: boolean): any {
    this.options.params = undefined;
    if (update) {
      return this.__http.post<Attandance>(this.url + '/' + model.get('id'), model, this.options);
    } else {
      console.log(model)
      return this.__http.post<Attandance>(this.url, model, this.options);
    }
  }



  public checkAttandance(query?: {}): any {
    if (query) {
      this.options.params = query;
    } else {
      this.options.params = undefined;
    }
    return this.__http.get (this.url + '/' +'get' , this.options);
  }
  public outAttandance(query?: {}): any {
    if (query) {
      this.options.params = query;
    } else {
      this.options.params = undefined;
    }
    return this.__http.get (this.url + '/'+'out' , this.options);
  }

  public inAttandance(query?: {}): any {
    if (query) {
      this.options.params = query;
    } else {
      this.options.params = undefined;
    }
    return this.__http.get (this.url + '/' +'in' , this.options);
  }

}
