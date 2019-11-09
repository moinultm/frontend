import { Component, OnInit, Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

import { NgbModal,NgbTimepicker, NgbTimepickerConfig, NgbTimeStruct, NgbTimeAdapter, NgbDateStruct, NgbCalendar, NgbModalOptions  } from '@ng-bootstrap/ng-bootstrap';
  import { ToastrService } from 'ngx-toastr';
 import { AttendanceService } from '@app/core/services/employee/attendance.service';
import { success, warning, error } from '@app/core/utils/toastr';
import { Attandance } from '@app/shared/models/employee/attendance.model';
import { UserService } from '@app/core/services/security/user.service';
import { PartialList } from '@app/shared/models/common/patial-list.model';
import { User } from '@app/shared/models/security/user.model';



@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements OnInit {
  modalOption: NgbModalOptions = {};

  loading: boolean;
  saving: boolean;
  deletingRow: boolean;
  page = 1;
  size = 10;

  users:PartialList <User>;

  form: FormGroup;
  myForm: FormGroup;
  data: any;

  fromDate:any;
  toDate:any;

  time:'16:30:00';

  date = new FormControl(new Date());

  serializedDate = new FormControl((new Date()).toISOString());

  selectedRow:Attandance;


  constructor(  private _fb: FormBuilder,
    private datePipe : DatePipe,
    private router:Router,
    private modalService: NgbModal,
    private _toastr: ToastrService,
    private attService: AttendanceService,
    private userService:UserService,) {   }

  ngOnInit() {
    this.iniForm();
    this.loadData();
   }


  iniForm(){
    this.form = this._fb.group({
      fromDate: [  new Date(),  [Validators.required],],
      toDate: [   new Date(),  [Validators.required],]
    });
  }


    //Load Data
    loadUser(): void {
      this.loading = true;
      this.userService.findRepresentative().subscribe((res: PartialList<User>) => {
        this.users = res;
         //console.log( this.users);
        this.loading = false;
      });
    }


    AddForm( attendance?: Attandance):void{

      this.loadUser();

      if (attendance) {
        this.selectedRow =  Object.assign({}, attendance);
     } else {
      this.selectedRow = new Attandance();
    }


       this.myForm = this._fb.group({
        employee_id:[   attendance ? attendance.employee_id : null,  [Validators.required]],
        todaydate:[  attendance ? attendance.date :  new Date(),  [Validators.required]],
        clock_in:[attendance ? attendance.clock_in : '08:30:00',  [Validators.required]],
        clock_out:[attendance ? attendance.clock_out : '16:30:00',  [Validators.required]],
         location:[attendance ? attendance.location : 'Office',  [Validators.nullValidator]],
         notes:[ attendance ? attendance.notes : '',  [Validators.nullValidator]],
          status:[ attendance ? attendance.status : 'present',  [Validators.required]],
       });

     }

  initSave(modal: any,attendance?: Attandance): void {
    event.preventDefault();

    this.modalOption.backdrop = 'static';
    this.modalOption.keyboard = false;


    this.AddForm(attendance);

    // Open the delete confirmation modal
    this.modalService
      .open(modal,this.modalOption)
      .result
      .then((result) => {
        if (result) {
          this.AddForm();
          this.loadData();
        }
       }, () => {
        //If the modal is dismissed
       });
  }


  loadData(page?: number): void {
    this.page = page ? page : 1;
    this.loading = true;
    this.fromDate = this.datePipe.transform(this.form.get('fromDate').value, 'yyyy-MM-dd');
    this.toDate = this.datePipe.transform(this.form.get('toDate').value, 'yyyy-MM-dd');

    this.attService.find({
      page: this.page,
      size: this.size,
      from:   this.fromDate,
      to:   this.toDate
    }).subscribe((res: PartialList<Attandance>) => {
      this.data = res;
     // console.log(  this.data);
      this.loading = false;
    });
  }


  dateFilter(){
    let formDt = this.datePipe.transform(this.form.get('fromDate').value, 'yyyy-MM-dd');
    let toDt = this.datePipe.transform(this.form.get('toDate').value, 'yyyy-MM-dd');
    this.loading = true;
    this.attService.find({
      from:  formDt,
      to:   toDt
    }).subscribe((res: PartialList<Attandance>) => {
      this.data = res;
      this.loading = false;
    });

  }

  save(modal: any): void {

    if (this.myForm.valid) {
      this.saving = true;

      const formData = new FormData();

      formData.append('id', this.selectedRow.id + '');
      formData.append('employee_id', this.myForm.get('employee_id').value);
      formData.append('todaydate',  this.myForm.get('todaydate').value );
      formData.append('clock_in', this.myForm.get('clock_in').value);
      formData.append('clock_out',this.myForm.get('clock_out').value);
      formData.append('location','Office');
      formData.append('notes', this.myForm.get('notes').value);
      formData.append('status', this.myForm.get('status').value);

      this.attService.save(formData, this.selectedRow.id ? true : false).subscribe((res: Attandance) => {
        success('Success!', 'The Time is successfully saved.', this._toastr);
        this.saving = false;
        this.AddForm();
        this.close(modal, true);
        this.router.navigate(['/employee/attendance']);
      }, (err: any) => {
        if (err.status === 403) {
          warning('Warning!', err.error.error, this._toastr);
        } else {
          error('Error!', 'An error has occured when saving the Time, please contact system administrator.', this._toastr);
        }
        this.saving = false;
      });
    }
  }


  initDelete(modal: any, profile: Attandance): void {
    this.selectedRow = profile;
    // Open the delete confirmation modal
    this.modalService
      .open(modal)
      .result
      .then((result) => {
        if (result) {
          this.loadData();
        }
        this.selectedRow = new Attandance();
      }, () => {
        // If the modal is dismissed
        this.selectedRow = new Attandance();
      });
  }


  delete(modal: any): void {
    this.deletingRow = true;
    this.attService.delete({
      id: this.selectedRow.id
    }).subscribe(() => {
      this.close(modal, true);
      this.deletingRow = false;
    }, (err: any) => {
      if (err.status === 403) {
        err.error.forEach((e: string) => {
          warning('Warning!', e, this._toastr);
          this.close(modal, true);
        });
      } else {
        error('Error!', 'An error has occured Server side deleting , please contact system administrator.', this._toastr);
        this.close(modal, true);
      }
      this.saving = false;
    });
  }



  close(modal: any, flag?: boolean): void {
    modal.close(flag ? true : false);
  }

}

