import { Component, OnInit } from '@angular/core';
import { Expense } from '@app/shared/models/stock/expense.model';
import { PartialList } from '@app/shared/models/common/patial-list.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {ExpenseService } from '@app/core/services/stock/expense.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { success, warning, error } from '@app/core/utils/toastr';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html'

})
export class ExpenseComponent implements OnInit {
  modalOption: NgbModalOptions = {};
  data: PartialList<Expense>;
  loading: boolean;
  savingExpense: boolean;
  deletingItem: boolean;
  page = 1;
  size = 10;
  form: FormGroup;
  selectedExpense: Expense;

  users:any;

  constructor( private expenseService: ExpenseService,  private router:Router,

    private _toastr: ToastrService,
    private modalService: NgbModal,
    titleService: Title,
    private actRoute: ActivatedRoute,
    private _formBuilder: FormBuilder,) {

      titleService.setTitle('General - Expense management');



    }

  ngOnInit() {
    this.fillUser();
    this.loadData();
  }


  fillUser(){
    this.actRoute.data.subscribe(data => {
      this.users=data.UserResolver.data;
      this.loading = false;
     // console.log(data.UserResolver.data)
    });
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
      this.selectedExpense =  expense ;
    } else {
      this.selectedExpense = new Expense();
    }
    this.form = this._formBuilder.group({
      purpose: [
        expense ? expense.purpose : '',
        [Validators.required, Validators.maxLength(255)]
      ],
      amount: [
        expense ? expense.amount : '',
        [Validators.required, Validators.maxLength(255)]
      ],
      user_id:[null, [Validators.required]],
      date:[new Date(), [Validators.required]],


    });
  }

//main Save function
  save(modal: any): void {
    if (this.form.valid) {
      this.savingExpense = true;
      this.expenseService.save({
        id: this.selectedExpense.id,
        purpose: this.form.get('purpose').value,
        amount: this.form.get('amount').value,
        user_id: this.form.get('user_id').value,

      }, this.selectedExpense.id ? true : false).subscribe((res: Expense) => {
        success('Success!', 'The expense is successfully saved.', this._toastr);
        this.savingExpense = false;
        this.close(modal, true);
      }, (err: any) => {
        if (err.status === 403) {
          err.error.forEach((e: string) => {
            warning('Warning!', e, this._toastr);
          });
        } else {
          error('Error!', 'An error has occured when saving the expense, please contact system administrator.', this._toastr);
        }
        this.savingExpense = false;
      });
    }
  }

 //Delete
 delete(modal: any): void {
  this.deletingItem = true;
  this.expenseService.delete({
    id: this.selectedExpense.id
  }).subscribe(() => {
    this.close(modal, true);
    this.deletingItem = false;
  });
}

initDelete(modal: any, role: Expense): void {
  this.selectedExpense = role;
  // Open the delete confirmation modal
  this.modalService
    .open(modal)
    .result
    .then((result) => {
      if (result) {
        this.loadData();
      }
      this.selectedExpense = new Expense();
    }, () => {
      // If the modal is dismissed
      this.selectedExpense = new Expense();
    });
}

//Close Module
close(modal: any, flag?: boolean): void {
  modal.close(flag ? true : false);
}
}
