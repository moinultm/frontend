import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PartialList } from '@models/common/patial-list.model';
import { Client } from '@models/stock/client.model';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Title } from '@angular/platform-browser';
import { SupplierService } from '@services/stock/supplier.service';
import { success, warning, error } from '@services/core/utils/toastr';
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

  
  constructor(private supplierService: SupplierService,
    private _toastr: ToastrService,
    private modalService: NgbModal,
    titleService: Title,
    private _formBuilder: FormBuilder) {
      titleService.setTitle('Stock - Supplier');
     }


  ngOnInit() {
    this.loadData()

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
          this.selectedSupplier = Object.assign(Client, client);
        } else {
          this.selectedSupplier = new Client();
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
          this.savingSupplier = true;
          this.supplierService.save({
            id: this.selectedSupplier.id,
            full_name: this.form.get('full_name').value,
            
          }, this.selectedSupplier.id ? true : false).subscribe((res: Client) => {
            success('Success!', 'The role is successfully saved.', this._toastr);
            this.savingSupplier = false;
            this.close(modal, true);
          }, (err: any) => {
            if (err.status === 403) {
              err.error.forEach((e: string) => {
                warning('Warning!', e, this._toastr);
              });
            } else {
              error('Error!', 'An error has occured when saving the role, please contact system administrator.', this._toastr);
            }
            this.savingSupplier = false;
          });
        }
      }
  
       //Delete
       delete(modal: any): void {
        this.deletingSupplier = true;
        this.supplierService.delete({
          id: this.selectedSupplier.id
        }).subscribe(() => {
          this.close(modal, true);
          this.deletingSupplier = false;
        });
      }
  
  
        //Close Module
        close(modal: any, flag?: boolean): void {
          modal.close(flag ? true : false);
        }

}
