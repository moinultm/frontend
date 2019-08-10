import { Component, OnInit } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryService } from '@services/stock/category.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PartialList } from '@models/common/patial-list.model';
import { Category } from '@models/stock/category.model';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  data: PartialList<Category>;
  loading: boolean;
  savingRole: boolean;
  deletingRole: boolean;
  page = 1;
  size = 10;

  form: FormGroup;
  selectedCategory: Category;
  constructor(  private categoryService: CategoryService,
    private _toastr: ToastrService,
    private modalService: NgbModal,
    titleService: Title,
    private _formBuilder: FormBuilder,) { 
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
  
}
