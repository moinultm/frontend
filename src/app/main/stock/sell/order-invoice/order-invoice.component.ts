
import { Component, OnInit } from '@angular/core';
import { SellsInvoiceService } from '@app/core/services/stock/sells-invoice.service';
import { Client } from '@app/shared/models/stock/client.model';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { SellsInvoice } from '@app/shared/models/stock/invoice.model';
import { PartialList } from '@app/shared/models/common/patial-list.model';
import { CustomerService } from '@app/core/services/stock/customer.service';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from '@app/core/services/stock/product.service';
import { Product } from '@app/shared/models/stock/product.model';
import { OrderItems } from '@app/shared/models/stock/order-items.model ';
import { ToastrService } from 'ngx-toastr';
import { success, error, warning } from '@app/core/utils/toastr';
import { UserService } from '@app/core/services/security/user.service';
import { User } from '@app/shared/models/security/user.model';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { Title } from '@angular/platform-browser';
import { AddCustomerComponent } from '../add-customer/add-customer.component';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-invoice',
  templateUrl: './order-invoice.component.html',
  styleUrls: ['./order-invoice.component.scss']
})



export class OrderInvoiceComponent implements OnInit {
  loading: boolean;
  loadingUser:boolean;
  loadingCustomer:boolean;

  modalOption: NgbModalOptions = {};
  customerList: Array<Client>;

  orderItemList: OrderItems [];


  _saving: boolean;
  mainForm: FormGroup;
  formProducts: FormGroup;
  selectedOrder: SellsInvoice;
  selectedOrderItem: OrderItems;

  _productList: Array<Product>;
  users: PartialList<User>;

  loadingDetails: boolean;

  constructor(private sellsOrdererSvice: SellsInvoiceService,
    private customeService: CustomerService,
    private productService: ProductService,
    private modalService: NgbModal,
    private _fb: FormBuilder,
    private _toastr: ToastrService,
    private userService: UserService,
    titleService: Title,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private ordersService: SellsInvoiceService,
  ) {
    titleService.setTitle('Order To Invoice');
  }

  ngOnInit() {
    if (this.route.snapshot.params.id) {
      let id = this.route.snapshot.params.id;
      this.getOrder(id);
    }
    else {
     this.initForm();
    }

  }

  getOrder(id: number): void {
    this.loading = true;
    this.ordersService.findOrderById(id).subscribe(res  => {
      this.initForm(res);
      this.orderItemList = res.order;
      this.loading = false;
    });
  }

  initForm(order?: SellsInvoice): void {

    this.loadUser();
    this.FillCustomer();

    if (order) {
      this.selectedOrder =order;

    }
    else {
      this.selectedOrder = new SellsInvoice();
      this.orderItemList = [];
    }


    this.mainForm = this._fb.group({
      sellDate: [new Date(), [Validators.nullValidator]],
      orderNumber: [order ? order.reference_no : null, [Validators.required]],
      customerName: [order ? order.client_id : null, [Validators.required]],
      paymentMethod: ['cash', [Validators.required]],
      totalAmount: [order ? order.net_total : 0, [Validators.required]],
      paidAmount: [ 0, [Validators.required]],
      dueAmount: [ 0, [Validators.required]],
      discountAmount: [order ? order.discount : 0, [Validators.required]],
      shippingCost: [0, [Validators.required]],
      discountOnTotal: [0, [Validators.required]],
      grandTotal: [order ? order.net_total : 0, [Validators.required]],
      user_id: [order ? order.user_id : null, [Validators.required]],
    });


  }


  loadUser(): void {
    this.loadingUser = true;
    this.userService.findRepresentative().subscribe((res: PartialList<User>) => {
      this.users = res;
     // console.log(res);
      this.loadingUser = false;
    });
  }

  FillCustomer() {
    this.loadingCustomer = true;
    this.customeService.findCustomer()
      .subscribe((res: PartialList<Client>) => {
        this.customerList = res.data;
        this.loadingCustomer = false;
      });
  }

  initItemModal(modal: any, product?: Product) {
    this.modalOption.backdrop = 'static';
    this.modalOption.keyboard = false;

    this.initItemsForm();

    this.loading = true;
    this.productService.find()
      .subscribe((res: PartialList<Product>) => {
        this._productList = res.data;
        this.loading = false;
      });

    this.modalService
      .open(modal, this.modalOption)
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

  initItemsForm(orderitem?: OrderItems): void {

    if (orderitem) {
      this.selectedOrderItem = Object.assign(OrderItems, orderitem);
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
      ],
      productMRP: [
        orderitem ? orderitem.mrp : '',
        [Validators.required]
      ],

      discountOnMRP: [
        orderitem ? orderitem.product_discount_percentage : '',
        [Validators.required]
      ],

      itemDiscountAmt: [orderitem ? orderitem.product_discount_amount : '', [Validators.required]],

      subtotal: [
        orderitem ? orderitem.sub_total : '',
        [Validators.required]],

      itemTotal: [orderitem ? orderitem.sub_total : '', [Validators.required]],

    });
  }


  //=================update price   selected item===================================
  updatePrice(ctrl) {
    if (ctrl.selectedIndex == 0) {
      this.formProducts.patchValue({
        name: '',
        productMRP: 0
      });
    }
    else {
      this.formProducts.patchValue({
        //name:this._productList[ctrl.selectedIndex - 1].name ,
        productMRP: this._productList[ctrl.selectedIndex - 1].mrp,
      });

    }
    this.updateSubTotal();
  }

  updateSubTotal() {
    const itemTotal = parseFloat((this.formProducts.value.quantity * this.formProducts.value.productMRP).toFixed(2));

    const discount = Math.round((this.formProducts.value.discountOnMRP / 100) * this.formProducts.value.productMRP);
    const newMRP = (this.formProducts.value.productMRP - discount);
    const newVal = parseFloat((this.formProducts.value.quantity * newMRP).toFixed(2));

    const discountPrice = parseFloat((this.formProducts.value.quantity * discount).toFixed(2));

    this.formProducts.patchValue({
      itemTotal: itemTotal,
      subtotal: newVal,
      itemDiscountAmt: discountPrice
    });

  }

  updateGrandTotal() {
    let grand: number;
    let  costs=  parseFloat(this.mainForm.get('shippingCost').value);
    let  discount_on_total=  parseFloat(this.mainForm.get('discountOnTotal').value);
    let netTotal:number;


    grand = this.orderItemList.reduce((prev, curr) => {
      return prev + curr.sub_total;
    }, 0);

    netTotal =  (grand+costs) -  discount_on_total;


    this.mainForm.patchValue({
        grandTotal:    parseFloat(netTotal.toFixed(2)),
    });

    let discount: number;
    discount = this.orderItemList.reduce((prev, curr) => {
      return prev + curr.product_discount_amount;
    }, 0);
    this.mainForm.patchValue({
      discountAmount: parseFloat(discount.toFixed(2)),
    });


    let sub_total: number;
    sub_total = this.orderItemList.reduce((prev, curr) => {
      return prev + curr.sub_total;
    }, 0);
    this.mainForm.patchValue({
      totalAmount: parseFloat(sub_total.toFixed(2)),
    });



  }

  updateDueAmount() {
    let due: number;
    due = (this.mainForm.value.grandTotal - this.mainForm.value.paidAmount);
    this.mainForm.patchValue({ dueAmount: parseFloat(due.toFixed(2)), });
  }
  //=================update price   selected item===================================


  addItemToInvoice(formProducts: any, modal?: any): void {

    let formItem = new OrderItems();
    formItem.product_id = formProducts.value.name.id;
    formItem.product_name = formProducts.value.name.name;

    formItem.quantity = formProducts.value.quantity;
    formItem.mrp = formProducts.value.productMRP;
    formItem.sub_total = formProducts.value.itemTotal;

    formItem.product_discount_percentage = formProducts.value.discountOnMRP;
    formItem.product_discount_amount = formProducts.value.itemDiscountAmt;

    formItem.sub_total = formProducts.value.sub_total;

    formItem.cost_price = formProducts.value.name.cost_price;

    if (this.formProducts.valid) {
      this.orderItemList.push(formItem);
      this.updateGrandTotal();
      this.updateDueAmount();
      //this.close(modal, true);
      this.initItemsForm();
    }


  }


  //Main Save Function
  save(form: any) {

    //console.log(JSON.stringify(this.orderItemList));


    this._saving = true;
    if (parseFloat(this.mainForm.get('paidAmount').value) > this.mainForm.get('grandTotal').value) {
      error('Error!', "Paid amount (" + this.mainForm.get('paidAmount').value + ") cant\'be greater than total amount (" + this.mainForm.get('grandTotal').value + ")", this._toastr);
      this._saving = false
      return false;
    }

    if (this.orderItemList.length == 0) {
      error('Error!', "No product selected for this Invoice", this._toastr);
      this._saving = false
      return false;
    }
    //console.log(JSON.stringify(this.orderItemList));

    const formData = new FormData();
    formData.append('customer', this.mainForm.get('customerName').value);
    formData.append('order_no', this.mainForm.get('orderNumber').value);
    formData.append('user_id', this.mainForm.get('user_id').value);
    formData.append('paid', this.mainForm.get('customerName').value);
    formData.append('method', this.mainForm.get('paymentMethod').value);
    formData.append('total', this.mainForm.get('grandTotal').value);
    formData.append('paid', this.mainForm.get('paidAmount').value);
    formData.append('discount', this.mainForm.get('discountOnTotal').value);
    formData.append('shipping_cost', this.mainForm.get('shippingCost').value);
    formData.append('discountType', 'flat');
    formData.append('sells', JSON.stringify(this.orderItemList));

    this.sellsOrdererSvice.save(formData, false).subscribe((res: SellsInvoice) => {
      success('Success!', 'The Order  is successfully saved to invoice.', this._toastr);
      this.initForm();
      this.router.navigate([`order-list`]);

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



  onDeleteOrderItem(orderItemID: number, i: number) {
    if (orderItemID != null) {

     if (orderItemID != null) {
        this.orderItemList.splice(i, 1);
        this.updateGrandTotal();
      }
    }

  }



  //mat customer
  openDialog(client?: Client): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.width = '25%';

    if (client) {
      dialogConfig.data = client
    }
    else {
      dialogConfig.data = {}
    }

    const dialogRef = this.dialog.open(AddCustomerComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
     // console.log(result)
      if (result.data == 200) {
        success('success!', 'New Customer is successfully saved.', this._toastr);
        this.initForm();
      }

      else if (result.data == 500) {
        error('Error!', "Server Error", this._toastr);
      }
      else {
        warning('warning!', result.data, this._toastr);
      }


    });
  }

}
