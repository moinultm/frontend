import { Component, OnInit } from '@angular/core';
import { Warehouse } from '@app/shared/models/stock/warehouse.model';
import { PartialList } from '@app/shared/models/common/patial-list.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {WarehouseService } from '@app/core/services/stock/warehouse.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { success, warning, error } from '@app/core/utils/toastr';

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.scss']
})
export class WarehouseComponent implements OnInit {
  modalOption: NgbModalOptions = {};
  data: PartialList<Warehouse>;
  loading: boolean;
  savingItem: boolean;
  deletingItem: boolean;
  page = 1;
  size = 10;
  form: FormGroup;
  selectedWarehouse: Warehouse;

  constructor( private warehouseService: WarehouseService,  private router:Router,

    private _toastr: ToastrService,
    private modalService: NgbModal,
    titleService: Title,

    private _formBuilder: FormBuilder,) {

      titleService.setTitle('Stock - Warehouse management');



    }

  ngOnInit() {
    this.loadData()
  }

  loadData(page?: number): void {
    this.page = page ? page : 1;
    this.loading = true;
    this.warehouseService.find({
      page: this.page,
      size: this.size
    }).subscribe((res: PartialList<Warehouse>) => {
      this.data = res;
      this.loading = false;
    });
  }
//refereal


  //Save Data
  initSave(modal: any, warehouse?: Warehouse): void {
    event.preventDefault();
    this.modalOption.backdrop = 'static';
    this.modalOption.keyboard = false;
    this.initSaveForm(warehouse);
    this.modalService
      .open(modal,this.modalOption)
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

  initSaveForm(warehouse?: Warehouse): void {
    if (warehouse) {
      this.selectedWarehouse =  warehouse ;
    } else {
      this.selectedWarehouse = new Warehouse();
    }
    this.form = this._formBuilder.group({
      name: [
        warehouse ? warehouse.name : '',
        [Validators.required, Validators.maxLength(255)]
      ],
      address: [
        warehouse ? warehouse.address : '',
        [Validators.required, Validators.maxLength(255)]
      ]
      ,
      phone: [
        warehouse ? warehouse.phone : '',
        [Validators.required, Validators.maxLength(15),Validators.pattern(/^[.\d]+$/) ]
      ]
      ,
      email: [
        warehouse ? warehouse.email : '',
        [Validators.required, Validators.maxLength(255)]
      ]
      ,
      incharge_name: [
        warehouse ? warehouse.in_charge_name : '',
        [Validators.required, Validators.maxLength(255)]
      ]

    });
  }

//main Save function
  save(modal: any): void {
    if (this.form.valid) {
      this.savingItem = true;
      this.warehouseService.save({
        id: this.selectedWarehouse.id,
        name: this.form.get('name').value,
        address: this.form.get('address').value,
        email: this.form.get('email').value,
        phone: this.form.get('phone').value,
        in_charge_name: this.form.get('incharge_name').value

      }, this.selectedWarehouse.id ? true : false).subscribe((res: Warehouse) => {
        success('Success!', 'The warehouse is successfully saved.', this._toastr);
        this.savingItem = false;
        this.close(modal, true);
      }, (err: any) => {
        if (err.status === 403) {
          err.error.forEach((e: string) => {
            warning('Warning!', e, this._toastr);
          });
        } else {
          error('Error!', 'An error has occured when saving the warehouse, please contact system administrator.', this._toastr);
        }
        this.savingItem = false;
      });
    }
  }

 //Delete
 delete(modal: any): void {
  this.deletingItem = true;
  this.warehouseService.delete({
    id: this.selectedWarehouse.id
  }).subscribe(() => {
    this.close(modal, true);
    this.deletingItem = false;
  });
}

initDelete(modal: any, role: Warehouse): void {
  this.selectedWarehouse = role;
  // Open the delete confirmation modal
  this.modalService
    .open(modal)
    .result
    .then((result) => {
      if (result) {
        this.loadData();
      }
      this.selectedWarehouse = new Warehouse();
    }, () => {
      // If the modal is dismissed
      this.selectedWarehouse = new Warehouse();
    });
}

//Close Module
close(modal: any, flag?: boolean): void {
  modal.close(flag ? true : false);
}
}
