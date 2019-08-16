import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CrudService } from '@services/common/crud.service';
import { Subcategory } from '@models/stock/subcategory.model';
import { PartialList } from '@models/common/patial-list.model';

@Injectable({
  providedIn: 'root'
})
export class ParentcategoryService extends CrudService<Subcategory> {

  constructor(private __http: HttpClient ) { 
    super(__http);
    this.setUrl('parent');
  }
 
  public findParent(id:number): any {
   
    return this.__http.get <PartialList <Subcategory>> (this.url + '?categoryId='+id , this.options);
  }


}
