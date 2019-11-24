import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Client } from '@app/shared/models/stock/client.model';
import { PartialList } from '@app/shared/models/common/patial-list.model';
import { CustomerService } from '@app/core/services/stock/customer.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Title } from '@angular/platform-browser';
import { success, warning,error } from '@app/core/utils/toastr';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { fromEvent } from 'rxjs';
import { map, filter, debounceTime, distinctUntilChanged } from 'rxjs/operators';


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
  @ViewChild('input', { static: false }) input: ElementRef;

  apiResponse:any;
  isSearching:boolean;

  data: any;
  loading: boolean;
  savingCustomer: boolean;
  deletingCustomer: boolean;
  page = 1;
  size = 10;
  form: FormGroup;
  selectedCustomer: Client;

  constructor(   private dialog: MatDialog,
    private customerService: CustomerService,
    private _toastr: ToastrService,
    private modalService: NgbModal,
    titleService: Title,
    private _formBuilder: FormBuilder) {
      titleService.setTitle('Stock-Customer');
     }

  ngOnInit() {
    this.loadData();
   // console.log(  this.loadData());
  }

  //Loading Data
      loadData(page?: number): void {
        this.page = page ? page : 1;
        this.loading = true;
        this.customerService.find({
          page: this.page,
          size: this.size
        }).subscribe((res: PartialList<Client>) => {
          this.data = res;
           this.loading = false;
        });
      }

      //Save Data
    initSave(modal: any, client?: Client): void {
      this.initSaveForm(client);
      this.modalService
        .open(modal)
        .result
        .then((result) => {
          if (result) {
            this.loadData();
          } else {
            this.initSaveForm();
          }
        }, () => {
          this.initSaveForm();
        });
    }

    initSaveForm(client?: Client): void {
      if (client) {
        this.selectedCustomer = Object.assign(Client, client);
      } else {
        this.selectedCustomer = new Client();
      }
      this.form = this._formBuilder.group({
        full_name: [
          client ? client.full_name : '',
          [Validators.required, Validators.maxLength(255)]
        ]
      });
    }

    //main Save function
    save(modal: any): void {
      if (this.form.valid) {
        this.savingCustomer = true;
        this.customerService.save({
          id: this.selectedCustomer.id,
          full_name: this.form.get('full_name').value,

        }, this.selectedCustomer.id ? true : false).subscribe((res: Client) => {
          success('Success!', 'The role is successfully saved.', this._toastr);
          this.savingCustomer = false;
          this.close(modal, true);
        }, (err: any) => {
          if (err.status === 403) {
            err.error.forEach((e: string) => {
              warning('Warning!', e, this._toastr);
            });
          } else {
            error('Error!', 'An error has occured when saving the role, please contact system administrator.', this._toastr);
          }
          this.savingCustomer = false;
        });
      }
    }

     //Delete
     delete(modal: any): void {
      this.deletingCustomer = true;
      this.customerService.delete({
        id: this.selectedCustomer.id
      }).subscribe(() => {
        this.close(modal, true);
        this.deletingCustomer = false;
      });
    }


      //Close Module
      close(modal: any, flag?: boolean): void {
        modal.close(flag ? true : false);
      }



    //matERIAL Dialog
    openDialog(client?:Client): void {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;

     dialogConfig.width= '350px';

    if (client)
    {
      dialogConfig.data = client
    }
    else
    {
      dialogConfig.data ="customer"
    }

   const dialogRef=   this.dialog.open(AddCustomerComponent, dialogConfig,);

      dialogRef.afterClosed().subscribe(result => {
        console.log(result)
        if (result.data==200) {
          success('success!', 'The data is successfully saved.'  , this._toastr);
          this.loadData();
           }

         else  if(result.data==500) {
            error('Error!', "Server Error"  , this._toastr);
           }
          else{
            warning('warning!', result.data  , this._toastr);
          }


      });
    }



    openDialogDetails(id:number){

      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;


      //dialogConfig.width= '50%';


      if (id)
      {
        dialogConfig.data = id
      }
      else
      {
        dialogConfig.data ={}
      }

      const dialogRef=   this.dialog.open(CustomerDetailsComponent, dialogConfig,);

    }


   ngAfterViewInit(){
  fromEvent(this.input.nativeElement, 'keyup').pipe(
    map((event: any) => {
      return event.target.value;
    })
    ,filter(res => res.length > 3)
    ,debounceTime(1000)
    ,distinctUntilChanged()
    ).subscribe((text: Text) => {
      this.isSearching = true;
       this.customerService.findByPhoneNo(text).subscribe((res)=>{
        this.loading = false;
        this.data = res;
      },(err)=>{
        this.loading = false;
      });
    });
}

}
