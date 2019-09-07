import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSort, MatPaginator} from "@angular/material";

@Component({
    selector: 'add-payment',
    templateUrl: './add-payment.component.html'
  })
  export class AddPaymentComponent implements OnInit {

    constructor( private dialogRef: MatDialogRef<AddPaymentComponent>,
        @Inject(MAT_DIALOG_DATA) public data){}

    ngOnInit() {}


    close() {
        this.dialogRef.close({ data: 'close'});
    }
    

  }  