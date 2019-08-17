import { Component, OnInit } from '@angular/core';
import { SellsOrderService } from '@services/stock/sellsorder.service';
import { Client } from '@models/stock/client.model';
import { FormGroup } from '@angular/forms';
import { SellsOrder } from '@models/stock/sellsorder.model';
import { PartialList } from '@models/common/patial-list.model';
import { CustomerService } from '@services/stock/customer.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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


  constructor(private sellsOrdererSvice: SellsOrderService,
    private customeService:CustomerService,
    private modalService: NgbModal,

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


  initForm(salesorder?: SellsOrder): void {
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

  initItemModal(modal: any, sellsOrder?: SellsOrder){


    this.modalService
    .open(modal)
    .result
    .then((result) => {
      if (result) {
        //this.loadData();
      } else {
        //this.initSaveForm();
      }
    }, () => {
     // this.initSaveForm();
    });

  }

}
