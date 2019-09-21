import { Component, OnInit } from '@angular/core';
import { SellsOrderService } from '@services/stock/sells-order.service';
import { Client } from '@models/stock/client.model';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { SellsOrder } from '@models/stock/sells-order.model';
import { PartialList } from '@models/common/patial-list.model';
import { CustomerService } from '@services/stock/customer.service';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from '@services/stock/product.service';
import { Product } from '@models/stock/product.model';
import { OrderItems } from '@models/stock/orderitems.model ';
import { ToastrService } from 'ngx-toastr';
import { success, error, warning } from '@app/services/core/utils/toastr';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  modalOption: NgbModalOptions = {};

  customerList: Array<Client>;

  orderItemList: Array<OrderItems>=[];

  loadingOrder: boolean;
  loadingCustomer:boolean;

  _saving:boolean;
  mainForm: FormGroup;
  formProducts:FormGroup;

  selectedOrder: SellsOrder;
selectedOrderItem: OrderItems;

  _productList: Array<Product>;
  loadingProductList:boolean;


  constructor(private sellsOrdererSvice: SellsOrderService,
    private customeService:CustomerService,
    private productService:ProductService,
    private modalService: NgbModal,
    private _fb: FormBuilder,
    private _toastr: ToastrService,

    ) { }

  ngOnInit() {
    this.initForm();


  }




  initForm(order?: SellsOrder): void {

    if (order){

    }
    else{
      this.selectedOrder =new SellsOrder();
      this.orderItemList =[];
    }




    this.FillCustomer();

    this.mainForm = this._fb.group({
    sellDate:[new Date(),[Validators.nullValidator]],
    customerName:['',[Validators.required]  ],
    paymentMethod:['cash',[Validators.required]  ],
    totalAmount:['0',[Validators.required]  ],
    paidAmount:['0',[Validators.required]  ],
    dueAmount:['0', [Validators.required]  ],
    discountAmount:['0', [Validators.required]  ],
    shippingCost:['0', [Validators.required]  ],
    grandTotal:['0',[Validators.required]  ],
  });
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
  this.modalOption.backdrop = 'static';
  this.modalOption.keyboard = false;

    this.initItemsForm();

    this.loadingProductList=true;
    this.productService.find()
    .subscribe((res: PartialList<Product>) => {
      this._productList = res.data;
      this.loadingProductList = false;
    });

    this.modalService
    .open(modal,this.modalOption)
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
  initItemsForm(orderitem?: OrderItems): void{

    if (orderitem) {
      this.selectedOrderItem=  Object.assign(OrderItems, orderitem);
    } else {
      this.selectedOrderItem = new OrderItems();
    }

    this.formProducts = this._fb.group({
      name: [
        orderitem ? orderitem.product_name : '',
        [Validators.required, Validators.maxLength(255)]
      ],
       quantity: [
        orderitem ? orderitem.quantity : '',
        [Validators.required]
      ] ,
      productMRP: [
        orderitem ? orderitem.mrp : '',
        [Validators.required]
      ] ,

      discountOnMRP: [
        orderitem ? orderitem.product_discount_percentage : '',
        [Validators.required]
      ] ,

      itemDiscountAmt:[ orderitem ? orderitem.product_discount_amount : '', [Validators.required]],

      subtotal: [
        orderitem ? orderitem.subtotal : '',
        [Validators.required]],

        itemTotal:[ orderitem ? orderitem.item_total : '', [Validators.required]],

    });
  }


  //=================update price   selected item===================================
  updatePrice(ctrl) {
    if (ctrl.selectedIndex == 0) {
      this.formProducts.patchValue({
        name: '',
        productMRP:0
     });
    }
    else {
      this.formProducts.patchValue({
        //name:this._productList[ctrl.selectedIndex - 1].name ,
        productMRP:this._productList[ctrl.selectedIndex - 1].mrp,
           });

    }
    this.updateSubTotal();
  }

  updateSubTotal() {
    const itemTotal= parseFloat((this.formProducts.value.quantity * this.formProducts.value.productMRP).toFixed(2)) ;

   const discount = Math.round((this.formProducts.value.discountOnMRP / 100) * this.formProducts.value.productMRP);
   const newMRP= (this.formProducts.value.productMRP-discount);
   const newVal= parseFloat((this.formProducts.value.quantity * newMRP).toFixed(2)) ;

   const discountPrice=parseFloat((this.formProducts.value.quantity * discount).toFixed(2)) ;

    this.formProducts.patchValue({
      itemTotal:itemTotal,
      subtotal: newVal,
      itemDiscountAmt:discountPrice
   });

  }

  updateGrandTotal(){
    let grand :number;
    grand= this.orderItemList.reduce((prev, curr) => {
      return prev + curr.subtotal;
    }, 0);
    this.mainForm.patchValue({
      grandTotal:    parseFloat(grand.toFixed(2)),
    });

    let discount :number;
    discount= this.orderItemList.reduce((prev, curr) => {
      return prev + curr.product_discount_amount;
    }, 0);
    this.mainForm.patchValue({
      discountAmount:    parseFloat(discount.toFixed(2)),
    });


    let item_total :number;
    item_total= this.orderItemList.reduce((prev, curr) => {
      return prev + curr.item_total;
    }, 0);
    this.mainForm.patchValue({
      totalAmount:   parseFloat(item_total.toFixed(2)),
    });



  }

  updateDueAmount(){
    let due :number;

    due= (this.mainForm.value.grandTotal-this.mainForm.value.paidAmount);
    this.mainForm.patchValue({dueAmount:    parseFloat(due.toFixed(2)),});
  }
  //=================update price   selected item===================================


  addItemToInvoice(formProducts:any,modal ?:any) : void{

   let formItem = new OrderItems();
   formItem.product_id=formProducts.value.name.id;
   formItem.product_name= formProducts.value.name.name ;

   formItem.quantity=formProducts.value.quantity;
   formItem.mrp=formProducts.value.productMRP;
   formItem.item_total=formProducts.value.itemTotal;

   formItem.product_discount_percentage=formProducts.value.discountOnMRP;
   formItem.product_discount_amount=formProducts.value.itemDiscountAmt;

   formItem.subtotal=formProducts.value.subtotal;

   formItem.cost_price=formProducts.value.name.cost_price;

    if (this.formProducts.valid) {
      this.orderItemList.push(formItem);
      this.updateGrandTotal();
      this.updateDueAmount();
      //this.close(modal, true);
      this.initItemsForm();
    }


  }


//Main Save Function
save(form: any){

  console.log(JSON.stringify(this.orderItemList));

  
  this._saving=true;
  if(parseFloat(this.mainForm.get('paidAmount').value) > this.mainForm.get('grandTotal').value ){
    error('Error!', "Paid amount (" + this.mainForm.get('paidAmount').value + ") cant\'be greater than total amount (" + this.mainForm.get('grandTotal').value  + ")", this._toastr);
   this._saving = false
   return false;
 }

 console.log(JSON.stringify(this.orderItemList));

  const formData = new FormData();
  formData.append('customer', this.mainForm.get('customerName').value);
  formData.append('paid', this.mainForm.get('customerName').value);
  formData.append('method', this.mainForm.get('paymentMethod').value);
  formData.append('total', this.mainForm.get('grandTotal').value);
  formData.append('paid', this.mainForm.get('paidAmount').value);
  formData.append('discount', this.mainForm.get('discountAmount').value);
  formData.append('shipping_cost', this.mainForm.get('shippingCost').value);
  formData.append('sells', JSON.stringify(this.orderItemList));

  this.sellsOrdererSvice.save(formData, false).subscribe((res: SellsOrder) => {
    success('Success!', 'The Order is successfully saved.', this._toastr);
    this.initForm();
    this._saving = false;
  }, (err: any) => {

    if (err.status === 403) {

      err.error.forEach((e: string) => {
        warning('Warning!', e, this._toastr);
      });
    } else {

      error('Error!', 'An error has occured when saving the user, please contact system administrator.', this._toastr);
    }
    this._saving = false;
  });

}

   //Close Module
   close(modal: any, flag?: boolean): void {
    modal.close(flag ? true : false);
  }

}
