import { Component, OnInit } from '@angular/core';
import { SellsOrderService } from '@services/stock/sellsorder.service';
import { Client } from '@models/stock/client.model';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { SellsOrder } from '@models/stock/sellsorder.model';
import { PartialList } from '@models/common/patial-list.model';
import { CustomerService } from '@services/stock/customer.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from '@services/stock/product.service';
import { Product } from '@models/stock/product.model';

@Component({
  selector: 'app-newsales',
  templateUrl: './newsales.component.html',
  styleUrls: ['./newsales.component.scss']
})
export class NewsalesComponent implements OnInit {

  customerList: Array<Client>;
  sellsList: Array<SellsOrder>=[];

  loadingOrder: boolean;
  loadingCustomer:boolean;
  form: FormGroup;

  selectedOrder: SellsOrder;

  _productList: Array<Product>;
  loadingProductList:boolean;
 

  constructor(private sellsOrdererSvice: SellsOrderService,
    private customeService:CustomerService,
    private productService:ProductService,
    private modalService: NgbModal,
    private _fb: FormBuilder,

    ) { }

  ngOnInit() {
    this.initForm();
  }


 addOrderItem(){

    let customObj = new SellsOrder();
    customObj.id = 1;
    customObj.client_id = 12;

    this.sellsList.push(customObj);

    console.log(this.sellsList);
  }


  initForm(order?: SellsOrder): void {
    this.FillCustomer();

  }


  FillCustomer()
  {
    this.loadingCustomer=true;
    this.customeService.findCustomer()
    .subscribe((res: PartialList<Client>) => {
      this.customerList = res.data;
       this.loadingCustomer = false;
    });
  }

  initItemModal(modal: any, product?: Product){

    this.initItemsForm();

    this.loadingProductList=true;
    this.productService.find()
    .subscribe((res: PartialList<Product>) => {
      this._productList = res.data;
      this.loadingProductList = false;
    });
    
    this.modalService
    .open(modal)
    .result
    .then((result) => {
      if (result) {
        //this.loadData();
      } else {
        // this.initItemsForm();
      }
    }, () => {
     // this.initSaveForm();
    });

  }
  initItemsForm(orderitem?: SellsOrder): void{

    if (orderitem) {
      this.selectedOrder=  Object.assign(SellsOrder, orderitem);
    } else {
      this.selectedOrder = new SellsOrder();
    }
    
    this.form = this._fb.group({
      name: [
        orderitem ? orderitem.product_id : '',
        [Validators.required, Validators.maxLength(255)]
      ], 
       quantity: [
        orderitem ? orderitem.quantity : '',
        [Validators.required]
      ] ,
      productMRP: [
        orderitem ? orderitem.product_id : '',
        [Validators.required]
      ] ,
      
      discountOnMRP: [
        orderitem ? orderitem.product_discount_percentage : '',
        [Validators.required]
      ] ,
      subTotal: [
        orderitem ? orderitem.sub_total : '',
        [Validators.required]
      ] 
      
    });
  }
  

}
