import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Product } from '@models/stock/product.model';
import { PartialList } from '@models/common/patial-list.model';
import { Title } from '@angular/platform-browser';
import { ProductService } from '@services/stock/product.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  data: PartialList<Product>;
  details:PartialList<Product>;
  loadingDetails:boolean;
  loading: boolean;
  savingProduct: boolean;
  deletingProduct: boolean;
  page = 1;
  size = 10;
  form: FormGroup;
  selectedProduct: Product;


  //https://stackoverflow.com/questions/45467550/angular-2-how-to-sum-column-ngfor

  constructor(private productService: ProductService,
    private _toastr: ToastrService,
    private modalService: NgbModal,
    titleService: Title,
    private _formBuilder: FormBuilder,
    private router:Router,) { }

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
        console.log( this.data )
        this.loading = false;
      });
    }

//Detail View+++++++++++++++++++++++

initDetailView(modal:any,id:number){
  event.preventDefault();

this.loadDetails(id);
  this.modalService
  .open(modal)
  .result
  .then((result) => {
    if (result) {
     // this.loadDetails(id);
    } else {
      //this.loadDetails(id);
    }
  }, () => {
  //  this.loadDetails(id);
  });
}

loadDetails(id:number): void {
  //this.page = page ? page : 1;
  this.loadingDetails = true;
  this.productService.findDetailsById(id).subscribe((res: PartialList<Product>) => {
    this.details = res;
    console.log(this.details);
    this.loadingDetails = false;
  });
}

toBarcode(id:number){
  event.preventDefault();
  this.router.navigate([`product/barcode/${id}`]);
}

 //Close Module
 close(modal: any, flag?: boolean): void {
  modal.close(flag ? true : false);
}

}
