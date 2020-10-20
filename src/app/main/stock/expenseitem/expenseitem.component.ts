import { Component, OnInit } from '@angular/core';

import { PartialList } from '@app/shared/models/common/patial-list.model';
import { ExpenseCategory } from '@app/shared/models/stock/expensecategory.model';
import { ExpenseSubcategory } from '@app/shared/models/stock/expensesubcategory.model';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ExpenseCategoryService } from '@app/core/services/stock/expensecategory.service';

import { ParentExpensecategoryService } from '@app/core/services/stock/parentexpensecategory.service';
import { ExpenseItemService } from '@app/core/services/stock/expenseitem.service';
import { success, warning } from '@app/core/utils/toastr';
import { error } from 'util';

import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Title } from '@angular/platform-browser';
import { ExpenseItem } from '@app/shared/models/stock/expenseitem.model';
@Component({
  selector: 'app-expenseitem',
  templateUrl: './expenseitem.component.html',
  styleUrls: ['./expenseitem.component.scss']
})
export class ExpenseitemComponent implements OnInit {
  modalOption: NgbModalOptions = {};

  data: PartialList<ExpenseItem>;
  categories: Array<ExpenseCategory>;
  loading: boolean;
  savingCategory: boolean;
  deletingCategory: boolean;
  page = 1;
  size = 10;
  form: FormGroup;

  _subcategories :Array <ExpenseSubcategory>;

  loadingCategory: boolean;
  loadingSubcategory: boolean;

  selectedCategory: ExpenseItem;

  constructor( private categoryService: ExpenseCategoryService,
    private _toastr: ToastrService,
    private modalService: NgbModal,
    titleService: Title,
    private _formBuilder: FormBuilder,
    private parentService:ParentExpensecategoryService,
    private itemService: ExpenseItemService
    ) {

     }

  ngOnInit() {
    this.loadData()
  }

//Loading Data
loadData(page?: number): void {
  this.page = page ? page : 1;
  this.loading = true;
  this.itemService.find({
    page: this.page,
    size: this.size
  }).subscribe((res: PartialList<ExpenseItem>) => {
    this.data = res;
    this.loading = false;
  });
}

FillSubcategory(catid:number)
{
  this.loadingSubcategory=true;
  this.parentService.findParent(catid)
  .subscribe((res: PartialList<ExpenseSubcategory>) => {
    this._subcategories = res.data;
    this.loadingSubcategory = false;
  });
}


FillCategory()
{
  this.loadingSubcategory=true;
  this.categoryService.find()
  .subscribe((res: PartialList<ExpenseCategory>) => {
    this.categories = res.data;
    console.log(res.data);
     this.loadingSubcategory = false;
  });
}

    //Save Data
    initSave(modal: any, category?: ExpenseItem): void {
      event.preventDefault();
      this.modalOption.backdrop = 'static';
      this.modalOption.keyboard = false;

      this.initSaveForm(category);

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

    initSaveForm(category?: ExpenseItem): void {

      if (category) {
        this.selectedCategory =  category ;
        this.FillSubcategory(category.expense_subcategory_id);
      } else {
        this.selectedCategory = new ExpenseItem();
      }

      this.FillCategory();

      this.form = this._formBuilder.group({
        ledger_name: [
          category ? category.ledger_name : '',
          [Validators.required, Validators.maxLength(255)]
        ],

        ledger_category: [
          category ? category.expense_category_id :0,
          [Validators.required, Validators.maxLength(255)]
        ],

        ledger_subcategory: [
          category ? category.expense_subcategory_id : 0,
          [Validators.required, Validators.maxLength(255)]
        ],


      });
    }


    //main Save function
    save(modal: any): void {

        const formData = new FormData();



      if (this.form.valid) {
        this.savingCategory = true;

     /*   formData.append('id', this.selectedCategory.id + '');
        formData.append('ledger_name', this.form.get('ledger_name').value);
        formData.append('expense_category_id', this.form.get('ledger_category').value);
        formData.append('ledger_subcategory', this.form.get('ledger_subcategory').value);*/

        this.itemService.save({
          id: this.selectedCategory.id,
          ledger_name: this.form.get('ledger_name').value,
          expense_category_id: this.form.get('ledger_category').value,
          expense_subcategory_id: this.form.get('ledger_subcategory').value,
        }, this.selectedCategory.id ? true : false).subscribe((res: ExpenseItemService) => {
          success('Success!', 'The data is successfully saved.', this._toastr);
          this.savingCategory = false;
          this.close(modal, true);
        }, (err: any) => {
          if (err.status === 403) {
            err.error.forEach((e: string) => {
              warning('Warning!', e, this._toastr);
            });
          } else {
            error('Error!', 'An error has occured when saving the item, please contact system administrator.', this._toastr);
          }
          this.savingCategory = false;
        });
      }
    }


    initDelete(modal: any, category: ExpenseItem): void {
      this.selectedCategory = category;
      // Open the delete confirmation modal
      this.modalService
        .open(modal)
        .result
        .then((result) => {
          if (result) {
            this.loadData();
          }
          this.selectedCategory = new ExpenseItem();
        }, () => {
          // If the modal is dismissed
          this.selectedCategory = new ExpenseItem();
        });
    }

     //Delete
     delete(modal: any): void {
      event.preventDefault();
      this.deletingCategory = true;
      this.itemService.delete({
        id: this.selectedCategory.id
      }).subscribe(() => {
         success('Success!', 'The item is successfully saved.', this._toastr);
        this.close(modal, true);
        this.deletingCategory = false;
      },
      (err: any) => {
        if (err.status === 403) {
          warning('Warning!', err.error.error, this._toastr);
          this.close(modal, true);
        } else {
          error('Error!', 'An error has occured when saving the role, please contact system administrator.', this._toastr);
          this.close(modal, true);
        }
        this.savingCategory = false;
      });
    }

      //Close Module
      close(modal: any, flag?: boolean): void {
        modal.close(flag ? true : false);
      }


}
