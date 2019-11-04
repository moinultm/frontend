import { Component, OnInit, Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

import { NgbModal,NgbTimepicker, NgbTimepickerConfig, NgbTimeStruct, NgbTimeAdapter  } from '@ng-bootstrap/ng-bootstrap';
  import { ToastrService } from 'ngx-toastr';
 import { AttendanceService } from '@app/core/services/employee/attendance.service';



@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements OnInit {
  loading: boolean;
  saving: boolean;
  deletingSales: boolean;
  page = 1;
  size = 10;

  form: FormGroup;
  data: any;

  time: '13:30:00';
    outTime:'13:30:00';


  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());
  constructor(  private _fb: FormBuilder,
    private datePipe : DatePipe,
    private router:Router,
    private modalService: NgbModal,
    private _toastr: ToastrService,
    private attService: AttendanceService,
    config: NgbTimepickerConfig) { 

  
    }

  ngOnInit() {
    this.iniForm();
  }


  iniForm(){
    this.form = this._fb.group({
      fromDate: [  new Date(),  [Validators.required],],
      toDate: [   new Date(),  [Validators.required],]
    });
  }






  initSave(modal: any): void {
    event.preventDefault();

    // Open the delete confirmation modal
    this.modalService
      .open(modal)
      .result
      .then((result) => {
        if (result) {

        }
       }, () => {
        // If the modal is dismissed
       });
  }



  close(modal: any, flag?: boolean): void {
    modal.close(flag ? true : false);
  }

}

