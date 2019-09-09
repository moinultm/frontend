import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSort, MatPaginator} from "@angular/material";
import { FormGroup, FormBuilder, Validators, FormControl, ValidatorFn } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sell-return',
  templateUrl: './sell-return.component.html',
  styleUrls: ['./sell-return.component.scss']
})


export class SellReturnComponent implements OnInit {
  constructor(private _formBuilder: FormBuilder,

    private _toastr: ToastrService,
    private dialogRef: MatDialogRef<SellReturnComponent>,
      @Inject(MAT_DIALOG_DATA) public data  ){


  }

  ngOnInit() {
  }


}




