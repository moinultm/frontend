import { Component, OnInit } from '@angular/core';
import { Expense } from '@models/stock/expense.model';
import { PartialList } from '@models/common/patial-list.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {ExpenseService } from '@services/stock/expense.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { success, warning, error } from '@services/core/utils/toastr';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html'

})
export class ExpenseComponent implements OnInit {
  modalOption: NgbModalOptions = {};
  data: PartialList<Expense>;
  loading: boolean;
  savingItem: boolean;
  deletingItem: boolean;
  page = 1;
  size = 10;
  form: FormGroup;
  selectedWarehouse: Expense;

  constructor( private expenseService: ExpenseService,  private router:Router,

    private _toastr: ToastrService,
    private modalService: NgbModal,
    titleService: Title,

    private _formBuilder: FormBuilder,) {

      titleService.setTitle('Stock - Expense management');



    }

  ngOnInit() {
    this.loadData()
  }

  loadData(page?: number): void {
    this.page = page ? page : 1;
    this.loading = true;
    this.expenseService.find({
      page: this.page,
      size: this.size
    }).subscribe((res: PartialList<Expense>) => {
      this.data = res;
      this.loading = false;
    });
  }
//refereal


  //Save Data
  initSave(modal: any, expense?: Expense): void {
    event.preventDefault();
    this.modalOption.backdrop = 'static';
    this.modalOption.keyboard = false;
    this.initSaveForm(expense);
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

  initSaveForm(expense?: Expense): void {
    if (expense) {
      this.selectedWarehouse =  expense ;
    } else {
      this.selectedWarehouse = new Expense();
    }
    this.form = this._formBuilder.group({
      purpose: [
        expense ? expense.purpose : '',
        [Validators.required, Validators.maxLength(255)]
      ],
      amount: [
        expense ? expense.amount : '',
        [Validators.required, Validators.maxLength(255)]
      ]



    });
  }

//main Save function
  save(modal: any): void {
    if (this.form.valid) {
      this.savingItem = true;
      this.expenseService.save({
        id: this.selectedWarehouse.id,
        purpose: this.form.get('purpose').value,
        amount: this.form.get('amount').value,


      }, this.selectedWarehouse.id ? true : false).subscribe((res: Expense) => {
        success('Success!', 'The expense is successfully saved.', this._toastr);
        this.savingItem = false;
        this.close(modal, true);
      }, (err: any) => {
        if (err.status === 403) {
          err.error.forEach((e: string) => {
            warning('Warning!', e, this._toastr);
          });
        } else {
          error('Error!', 'An error has occured when saving the expense, please contact system administrator.', this._toastr);
        }
        this.savingItem = false;
      });
    }
  }

 //Delete
 delete(modal: any): void {
  this.deletingItem = true;
  this.expenseService.delete({
    id: this.selectedWarehouse.id
  }).subscribe(() => {
    this.close(modal, true);
    this.deletingItem = false;
  });
}

initDelete(modal: any, role: Expense): void {
  this.selectedWarehouse = role;
  // Open the delete confirmation modal
  this.modalService
    .open(modal)
    .result
    .then((result) => {
      if (result) {
        this.loadData();
      }
      this.selectedWarehouse = new Expense();
    }, () => {
      // If the modal is dismissed
      this.selectedWarehouse = new Expense();
    });
}

//Close Module
close(modal: any, flag?: boolean): void {
  modal.close(flag ? true : false);
}
}
