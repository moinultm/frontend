
import { Component, OnInit } from '@angular/core';
import { Vat } from '@app/shared/models/common/Vat.model';
import { PartialList } from '@app/shared/models/common/patial-list.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {VatService } from '@app/core/services/common/vat.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { success, warning, error } from '@app/core/utils/toastr';

@Component({
  selector: 'app-vat-settings',
  templateUrl: './vat-settings.component.html',
  styleUrls: ['./vat-settings.component.scss']
})
export class VatSettingsComponent implements OnInit {
  modalOption: NgbModalOptions = {};
  data: PartialList<Vat>;
  loading: boolean;
  savingExpense: boolean;
  deletingItem: boolean;
  page = 1;
  size = 10;
  form: FormGroup;
  selectedVat: Vat;


  vatType:Array<Object>= [
    {id:1,name:'Percentage'}
  ];

  constructor( private vatService: VatService,  private router:Router,

    private _toastr: ToastrService,
    private modalService: NgbModal,
    titleService: Title,

    private _formBuilder: FormBuilder) {

      titleService.setTitle('General - Vat management');



    }

  ngOnInit() {
    this.loadData()
  }

  loadData(page?: number): void {
    this.page = page ? page : 1;
    this.loading = true;
    this.vatService.find({
      page: this.page,
      size: this.size
    }).subscribe((res: PartialList<Vat>) => {
      this.data = res;
      this.loading = false;
    });
  }
//refereal


  //Save Data
  initSave(modal: any, Vat?: Vat): void {
    event.preventDefault();
    this.modalOption.backdrop = 'static';
    this.modalOption.keyboard = false;
    this.initSaveForm(Vat);
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

  initSaveForm(vat?: Vat): void {
    if (vat) {
      this.selectedVat =  vat ;
    } else {
      this.selectedVat = new Vat();
    }
    this.form = this._formBuilder.group({
      name: [
        vat ? vat.name : '',
        [Validators.required, Validators.maxLength(255)]
      ],
      rate: [
        vat ? vat.rate : '',
        [Validators.required ]
      ],
      type: [
        vat ? vat.type : '',
        [Validators.required]
      ]

    });
  }

//main Save function
  save(modal: any): void {
    if (this.form.valid) {
      this.savingExpense = true;
      this.vatService.save({
        id: this.selectedVat.id,
        name: this.form.get('name').value,
        type: this.form.get('type').value,
        rate: this.form.get('rate').value,

      }, this.selectedVat.id ? true : false).subscribe((res: Vat) => {
        success('Success!', 'The Vat is successfully saved.', this._toastr);
        this.savingExpense = false;
        this.close(modal, true);
      }, (err: any) => {
        if (err.status === 403) {
          err.error.forEach((e: string) => {
            warning('Warning!', e, this._toastr);
          });
        } else {
          error('Error!', 'An error has occured when saving the Vat, please contact system administrator.', this._toastr);
        }
        this.savingExpense = false;
      });
    }
  }



initDelete(modal: any, vat: Vat): void {
  this.selectedVat = vat;
  // Open the delete confirmation modal
  this.modalService
    .open(modal)
    .result
    .then((result) => {
      if (result) {
        this.loadData();

      }
      this.selectedVat = new Vat();
    }, () => {
      // If the modal is dismissed
      this.selectedVat = new Vat();
    });
}
 //Delete
 delete(modal: any): void {
  this.deletingItem = true;
  this.vatService.delete({
    id: this.selectedVat.id
  }).subscribe(() => {

    this.deletingItem = false;
    this.close(modal, true);
  });
}

//Close Module
close(modal: any, flag?: boolean): void {
  modal.close(flag ? true : false);
}
}
