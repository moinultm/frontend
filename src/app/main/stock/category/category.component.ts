import { Component, OnInit } from '@angular/core';
import { CategoryService } from '@app/core/services/stock/category.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PartialList } from '@app/shared/models/common/patial-list.model';
import { Category } from '@app/shared/models/stock/category.model';
import { success, warning, error } from '@app/core/utils/toastr';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  modalOption: NgbModalOptions = {};

  data: PartialList<Category>;
  loading: boolean;
  savingCategory: boolean;
  deletingCategory: boolean;
  page = 1;
  size = 10;
  form: FormGroup;
  selectedCategory: Category;

  constructor(  private categoryService: CategoryService,
    private _toastr: ToastrService,
    private modalService: NgbModal,
    titleService: Title,
    private _formBuilder: FormBuilder,
    ) {
      titleService.setTitle('Stock - Category');
    }

  ngOnInit() {
    this.loadData()
  }

      //Loading Data
      loadData(page?: number): void {
        this.page = page ? page : 1;
        this.loading = true;
        this.categoryService.find({
          page: this.page,
          size: this.size
        }).subscribe((res: PartialList<Category>) => {
          this.data = res;
          this.loading = false;
        });
      }

       //Save Data
    initSave(modal: any, category?: Category): void {
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
    initSaveForm(category?: Category): void {
      if (category) {
        this.selectedCategory = Object.assign(Category, category);
      } else {
        this.selectedCategory = new Category();
      }
      this.form = this._formBuilder.group({
        category_name: [
          category ? category.category_name : '',
          [Validators.required, Validators.maxLength(255)]
        ]
      });
    }

    //main Save function
    save(modal: any): void {
      if (this.form.valid) {
        this.savingCategory = true;
        this.categoryService.save({
          id: this.selectedCategory.id,
          category_name: this.form.get('category_name').value,

        }, this.selectedCategory.id ? true : false).subscribe((res: Category) => {
          success('Success!', 'The role is successfully saved.', this._toastr);
          this.savingCategory = false;
          this.close(modal, true);
        }, (err: any) => {
          if (err.status === 403) {
            err.error.forEach((e: string) => {
              warning('Warning!', e, this._toastr);
            });
          } else {
            error('Error!', 'An error has occured when saving the role, please contact system administrator.', this._toastr);
          }
          this.savingCategory = false;
        });
      }
    }


    initDelete(modal: any, category: Category): void {
      this.selectedCategory = category;
      // Open the delete confirmation modal
      this.modalService
        .open(modal)
        .result
        .then((result) => {
          if (result) {
            this.loadData();
          }
          this.selectedCategory = new Category();
        }, () => {
          // If the modal is dismissed
          this.selectedCategory = new Category();
        });
    }

     //Delete
     delete(modal: any): void {
      event.preventDefault();
      this.deletingCategory = true;
      this.categoryService.delete({
        id: this.selectedCategory.id
      }).subscribe(() => {
         success('Success!', 'The role is successfully saved.', this._toastr);
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
