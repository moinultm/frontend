import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PartialList } from '@app/shared/models/common/patial-list.model';
import { Client } from '@app/shared/models/stock/client.model';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Title } from '@angular/platform-browser';
import { SupplierService } from '@app/core/services/stock/supplier.service';
import { success, warning, error } from '@app/core/utils/toastr';
import { CommonService } from '@app/core/services/common/common.services';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { SupplierDetailsComponent } from './supplier-details/supplier-details.component';
@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.scss']
})
export class SupplierComponent implements OnInit {
  data: PartialList<Client>;
  loading: boolean;
  savingSupplier: boolean;
  deletingSupplier: boolean;
  page = 1;
  size = 10;
  form: FormGroup;
  selectedSupplier: Client;

  modalOption: NgbModalOptions = {};

  constructor(private dialog: MatDialog,
    private supplierService: SupplierService,
    private _cs :CommonService,
    private _toastr: ToastrService,
    private modalService: NgbModal,
    titleService: Title,
    private _formBuilder: FormBuilder) {
      titleService.setTitle('Stock - Supplier');
     }

  ngOnInit() {
    this.loadData();
  }

  loadData(page?: number): void {
    this.page = page ? page : 1;
    this.loading = true;
    this.supplierService.find({
      page: this.page,
      size: this.size
    }).subscribe((res: PartialList<Client>) => {
      this.data = res;
      this.loading = false;
    });
  }


      //Save Data
      initSave(modal: any, client?: Client): void {

      this.modalOption.backdrop = 'static';
      this.modalOption.keyboard = false;

        this.initSaveForm(client);

        this.modalService
          .open(modal, this.modalOption )
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
          this.selectedSupplier = Object.assign(Client, client);
        } else {
          this.selectedSupplier = new Client();
        }
        this.form = this._formBuilder.group({
          full_name: [
            client ? client.full_name : '',
            [Validators.required, Validators.maxLength(255)]
          ] ,
          email: [ client ? client.email : '',  [Validators.nullValidator]] ,
          contact: [ client ? client.contact : '',  [Validators.required]],
          company_name: [ client ? client.company_name : '',  [Validators.nullValidator]],
          address: [ client ? client.address : '',  [Validators.nullValidator]],
          account_no: [ client ? client.account_no : '',  [Validators.nullValidator]],
          previous_due: [ client ? client.previous_due : '',  [Validators.nullValidator]],


        });
      }

      //main Save function
      save(modal: any): void {
       // console.log(this.selectedSupplier.id);
        if (this.form.valid) {
          this.savingSupplier = true;
          this.supplierService.save({
            id: this.selectedSupplier.id,
            full_name: this.form.get('full_name').value,
            contact: this.form.get('contact').value,
            company_name:this.form.get('company_name').value,
            address:this.form.get('address').value,
            account_no:this.form.get('account_no').value,
            previous_due:this.form.get('previous_due').value,
            email:this.form.get('email').value
          }, this.selectedSupplier.id ? true : false).subscribe((res: Client) => {
            success('Success!', 'The Element is successfully saved.', this._toastr);
            this.savingSupplier = false;
            this.close(modal, true);
          }, (err: any) => {
            if (err.status === 403) {
              err.error.forEach((e: string) => {
                warning('Warning!', e, this._toastr);
              });
            } else {
              error('Error!', 'An error has occured when saving the Supplier, please contact system administrator.', this._toastr);
            }
            this.savingSupplier = false;
          });
        }
      }


      initDelete(modal: any, client: Client): void {
        this.selectedSupplier = client;
        // Open the delete confirmation modal
        this.modalService
          .open(modal)
          .result
          .then((result) => {
            if (result) {
              this.loadData();
            }
            this.selectedSupplier = new Client();
          }, () => {
            // If the modal is dismissed
            this.selectedSupplier = new Client();
          });
      }

       //Delete
       delete(modal: any): void {
        this.deletingSupplier = true;
        this.supplierService.delete({
          id: this.selectedSupplier.id
        }).subscribe(() => {
          warning('Deleted!', 'The Element is successfully Deleted.', this._toastr);
          this.close(modal, true);
          this.deletingSupplier = false;
        }, (err: any) => {
          if (err.status === 403) {
            err.error.forEach((e: string) => {
              warning('Warning!', e, this._toastr);
            });
          } else {
            error('Error!', 'An error has occured when saving the Supplier, please contact system administrator.', this._toastr);
          }
          this.savingSupplier = false;
        });
      }



        //Close Module
        close(modal: any, flag?: boolean): void {
          modal.close(flag ? true : false);
        }


        //Material


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

          const dialogRef=   this.dialog.open(SupplierDetailsComponent, dialogConfig,);

        }




}
