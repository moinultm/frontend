import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSort, MatPaginator} from "@angular/material";
import { FormGroup, FormBuilder } from '@angular/forms';



@Component({
  selector: 'app-product',
  templateUrl: './product.component.html'
})
export class ProductComponent implements OnInit {

  form: FormGroup;
  description:string;

  page = 1;
  size = 10;
  //dataSource: TablesDataSource;

  displayedColumns: string[] = ['fullName', 'email', 'mobile', 'city', 'departmentName', 'actions'];
  @ViewChild(MatSort,{static: false}) sort: MatSort;
  @ViewChild(MatPaginator,{static: false}) paginator: MatPaginator;

  constructor(    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ProductComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
      this.description = data.description;
    }

  ngOnInit() {
    this.form = this.fb.group({ description: [this.description, []],});

    //this.dataSource = new TablesDataSource(this.sellsService);

    //this.dataSource.loadTables( '', 'asc', 1, 3);



  }


save() {
    this.dialogRef.close(this.form.value);
}

close() {
    this.dialogRef.close();
}

}
