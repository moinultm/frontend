import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSort, MatPaginator} from "@angular/material";
import { FormGroup, FormBuilder } from '@angular/forms';
import { TablesDataSource } from '@app/core/services/stock/lessons.datasource';
import { ProductService } from '@app/core/services/stock/product.service';
import { SubcategoryService } from '@app/core/services/stock/subcategory.service';



@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnInit {

  form: FormGroup;
  description:string;
 loading: boolean;
  page = 1;
  size = 10;
  dataSource: TablesDataSource;
  getId :number;
  data : [];


  displayedColumns: string[] = ['sl','name', 'stock'];
  @ViewChild(MatSort,{static: false}) sort: MatSort;
  @ViewChild(MatPaginator,{static: false}) paginator: MatPaginator;

  constructor(
    private subcategoryService:SubcategoryService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ProductListComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
      this.data = data;
    }
  ngOnInit() {

    this.getId=this.data['id'];

     this.dataSource = new TablesDataSource(this.subcategoryService);
     this.dataSource.loadTables( '', 'asc', 1, 3,  this.getId);
  }


save() {
    this.dialogRef.close(this.form.value);
}

close() {
    this.dialogRef.close();
}

}
