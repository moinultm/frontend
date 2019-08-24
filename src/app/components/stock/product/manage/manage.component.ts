import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Product } from '@models/stock/product.model';
import { PartialList } from '@models/common/patial-list.model';
import { Title } from '@angular/platform-browser';
import { ProductService } from '@services/stock/product.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  data: PartialList<Product>;
  loading: boolean;
  savingProduct: boolean;
  deletingProduct: boolean;
  page = 1;
  size = 10;
  form: FormGroup;
  selectedProduct: Product;


  constructor(private productService: ProductService,
    private _toastr: ToastrService,
    private modalService: NgbModal,
    titleService: Title,
    private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.loadData();
  }

     //Loading Data
     loadData(page?: number): void {
      this.page = page ? page : 1;
      this.loading = true;
      this.productService.find({
        page: this.page,
        size: this.size
      }).subscribe((res: PartialList<Product>) => {
        this.data = res;
        this.loading = false;
      });
    }

//Detail View+++++++++++++++++++++++

initDetailView(modal){
  event.preventDefault();
 
  this.modalService
  .open(modal)
  .result
  .then((result) => {
    if (result) {
      this.loadData();
    } else {
     // this.initSaveForm();
    }
  }, () => {
    //this.initSaveForm();
  });

}

 //Close Module
 close(modal: any, flag?: boolean): void {
  modal.close(flag ? true : false);
}

}
