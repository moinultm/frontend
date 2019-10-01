import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Product } from '@models/stock/product.model';
import { PurchaseOrderService } from '@services/stock/purchase-order.service';
import { PurchaseOrder } from '@models/stock/purchase-order.model';
import { PartialList } from '@models/common/patial-list.model';
import { FormGroup, FormControl } from '@angular/forms';
import { SellsOrderService } from '@services/stock/sells-order.service';
import { SellsOrder } from '@models/stock/sells-order.model';


@Component({
  selector: 'app-invoice-barcoded',
  templateUrl: './invoice-barcoded.component.html',
  styleUrls: ['./invoice-barcoded.component.scss']
})
export class InvoiceBarcodedComponent implements OnInit {
  data:any;
  loading: boolean;
  savingSupplier: boolean;
  deletingSupplier: boolean;
  page = 1;
  size = 10;
  form: FormGroup;
  selectedInvoice: PurchaseOrder;


 barcoded:Barcoded;

 selectedInvoiceId : number;
 loadingDetails:boolean;
 selectedTypeId : number;


 loadingDetailsSell:boolean;
 detailsData:PartialList<PurchaseOrder>;
 detailsDataSell:PartialList<SellsOrder>;

  constructor(   private purchaseService: PurchaseOrderService,private sellsService: SellsOrderService,) {

    this.barcoded = {
      ppp:'pp40',
      isSiteName: true,
      isProductName: true,
      isProductPrice: true,
      isClientCode: true,
    }



   }

  ngOnInit() {

   this.selectedInvoiceId=0;
   this.loadingDetails = true;

    this.loadData();
  }



  loadData(page?: number): void {
    this.page = page ? page : 1;
    this.loading = true;
    this.purchaseService.getList( ).subscribe((res: PartialList<PurchaseOrder>) => {
      this.data = res;
      this.loading = false;
    });
  }

  loadSells(page?: number): void {
    this.page = page ? page : 1;
    this.loading = true;
    this.sellsService.getList( ).subscribe((res: PartialList<SellsOrder>) => {
      this.data = res;
      this.loading = false;
    });
  }

  ShowBillDetails(id:number){
    if (this.selectedTypeId==1){
      this.sellsDetail(id)
    }

  if (this.selectedTypeId==2){
    this.purchaseDetail(id)
  }

  }


  sellsDetail(id){
    this.loadingDetails = true;
    this.sellsService.findDetailsById(id).subscribe((res:PartialList <SellsOrder>) => {
      this.detailsData = res;
       //console.log(res);
      this.loadingDetails = false;
    });
  }

  purchaseDetail(id){
    this.loadingDetailsSell = true;
    this.purchaseService.findDetailsById(id).subscribe((res:PartialList <PurchaseOrder>) => {
      this.detailsDataSell = res;
      this.loadingDetailsSell = false;
    });
  }

  getSells(event){

    if (event==1){
      this.loadSells();
    }
    if (event==2){
      this.loadData();
    }


  }


  counter(i: number) {
    return new Array(i);
}

  print(): void {
    event.preventDefault()
   window.print();

   /**
    let printContents, popupWin;
    printContents = document.getElementById('section-to-print').innerHTML;
    popupWin = window.open();
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>Print Barcode Report</title>
          <style>
          .pp40 {
            width: 1.799in;
            height: 1.003in;
            margin: 0 .07in;
            padding-top: .05in;
            border: 1px solid #ddd;
            margin-top: 2px;
          }
          .barcode-info-p {
            line-height: 15px !important;
            font-size: 8px !important;
            color: black !important;
            margin-bottom: 0;
          }

          </style>
        </head>
    <body onload="window.print();window.close()">${printContents}</body>
      </html>`
    );
    popupWin.document.close();
    */
}


//https://ng-select.github.io/ng-select#/data-sources
//https://github.com/ng-select/ng-select#getting-started

}

export interface Barcoded {
  ppp:string,
  isSiteName: boolean;
  isProductName: boolean;
  isProductPrice: boolean;
  isClientCode: boolean;
}
