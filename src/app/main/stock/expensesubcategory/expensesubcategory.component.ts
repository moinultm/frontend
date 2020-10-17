import { Component, OnInit } from '@angular/core';
import { ExpenseSubcategory } from '@app/shared/models/stock/expensesubcategory.model';
import { PartialList } from '@app/shared/models/common/patial-list.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { error, warning, success } from '@app/core/utils/toastr';

import { ExpenseCategory } from '@app/shared/models/stock/expensecategory.model';
import { ExpenseCategoryService } from '@app/core/services/stock/expensecategory.service';
import { ExpenseSubcategoryService } from '@app/core/services/stock/expensesubcategory.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Title } from '@angular/platform-browser';
import { constants } from '@env/constants';

import {MatDialog, MatDialogConfig} from "@angular/material";



@Component({
  selector: 'app-expensesubcategory',
  templateUrl: './expensesubcategory.component.html',
  styleUrls: ['./expensesubcategory.component.scss']
})
export class ExpensesubcategoryComponent implements OnInit {
  data: PartialList<ExpenseSubcategory>;
  loading: boolean;
  savingSubcategory: boolean;
  deletingSubcategory: boolean;

  loadingCategory: boolean;
  page = 1;
  size = 10;

  form: FormGroup;
  categories: Array<ExpenseCategory>;
  selectedSub: ExpenseSubcategory;

  constructor(
    private dialog: MatDialog,
    private subcategoryService: ExpenseSubcategoryService,
    private categoryService: ExpenseCategoryService,
    private modalService: NgbModal,
    private _fb: FormBuilder,
    private _toastr: ToastrService,
    titleService: Title) {
      titleService.setTitle(constants.app_name + ' - Stock - Expense Subcategory management');
    }

  ngOnInit() {

  this.loadData()
  }
  //Loading Data
  loadData(page?: number): void {
    this.page = page ? page : 1;
    this.loading = true;
    this.subcategoryService.find({
      page: this.page,
      size: this.size
    }).subscribe((res: PartialList<ExpenseSubcategory>) => {
      this.data = res;
      console.log(res);
      this.loading = false;
    });
  }

  //Save Data
  initSave(modal: any, subcategory?: ExpenseSubcategory): void {
    this.initSaveForm(subcategory);

    this.loadingCategory=true;
    this.categoryService.find()
    .subscribe((res: PartialList<ExpenseCategory>) => {
      this.categories = res.data;
      this.loadingCategory = false;
    });


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


  initSaveForm(subcategory?: ExpenseSubcategory): void {
     if (subcategory) {
      this.selectedSub =  Object.assign(ExpenseSubcategory, subcategory);
    } else {
      this.selectedSub = new ExpenseSubcategory();
    }
    this.form = this._fb.group({
      subcategory_name: [
        subcategory ? subcategory.subcategory_name : '',
        [Validators.required, Validators.maxLength(255)]
      ],
       category_id: [
        subcategory ? subcategory.category_id : '',
        [Validators.required]
      ]
    });
  }

  selectedSubHasCategory(cat: ExpenseCategory): boolean {
    if( this.selectedSub.category_id==cat.id)
    {
      return true;
    }else
    {
      return false;
    }

 }


  selectedSubCats(cat:ExpenseCategory): void {
    if (this.selectedSubHasCategory(cat)) {
      this.selectedSub.category_id == cat.id;
    } else {
      this.selectedSub.category_id==cat.id;
    }
  }

  save(modal: any): void {

    if (this.form.valid) {
      this.savingSubcategory= true;

      this.subcategoryService.save({
        id: this.selectedSub.id,
        subcategory_name: this.form.get('subcategory_name').value,
        category_id: this.form.get('category_id').value,
      }, this.selectedSub.id ? true : false).subscribe((res: ExpenseSubcategory) => {

        success('Success!', 'The profile is successfully saved.', this._toastr);
        this.savingSubcategory = false;

        this.close(modal, true);
      }, (err: any) => {
        // Check if the error status is 403 (Form errors)
        if (err.status === 403) {
          // Show an error for each form validations errors list
          err.error.forEach((e: string) => {
            warning('Warning!', e, this._toastr);
          });
        } else {
          // Else, show an internal server error alert
          error('Error!', 'An error has occured when saving the Item, please contact system administrator.', this._toastr);
        }
        this.savingSubcategory = false;
      });
    }
  }


  initProducts(modal: any, subcategory: ExpenseSubcategory){
    this.selectedSub = subcategory;

    this.modalService
      .open(modal)
      .result
      .then((result) => {
        if (result) {
          this.loadData();
        }
        this.selectedSub = new ExpenseSubcategory();
      }, () => {

        this.selectedSub = new ExpenseSubcategory();
      });
  }

  //DeleteFunction
  initDelete(modal: any, subcategory: ExpenseSubcategory): void {
    this.selectedSub = subcategory;
    // Open the delete confirmation modal
    this.modalService
      .open(modal)
      .result
      .then((result) => {
        if (result) {
          this.loadData();
        }
        this.selectedSub = new ExpenseSubcategory();
      }, () => {
        // If the modal is dismissed
        this.selectedSub = new ExpenseSubcategory();
      });
  }

   //Delete
   delete(modal: any): void {
    event.preventDefault();
    this.deletingSubcategory = true;
    this.subcategoryService.delete({
      id: this.selectedSub.id
    }).subscribe(() => {
       success('Success!', 'The Expense  Subcategory is successfully saved.', this._toastr);
      this.close(modal, true);
      this.deletingSubcategory = false;
    },
    (err: any) => {
      if (err.status === 403) {
        warning('Warning!', err.error.error, this._toastr);
        this.close(modal, true);
      } else {
        error('Error!', 'An error has occured when saving the role, please contact system administrator.', this._toastr);
        this.close(modal, true);
      }
      this.savingSubcategory = false;
    });
  }
    //Close Module
    close(modal: any, flag?: boolean): void {
      modal.close(flag ? true : false);
    }


//mat Dialog
/*
openDialog(number:number) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;

      dialogConfig.data = {
        id: number,
        title: 'Angular For Beginners title',
        description: 'Angular For Beginners desc'
    };

      this.dialog.open(ProductListComponent, dialogConfig,);
  }*/



}
