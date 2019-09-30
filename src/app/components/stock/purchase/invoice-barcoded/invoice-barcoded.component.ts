import { Component, OnInit } from '@angular/core';
import { Product } from '@models/stock/product.model';
import { PurchaseOrderService } from '@services/stock/purchase-order.service';
import { PurchaseOrder } from '@models/stock/purchase-order.model';
import { PartialList } from '@models/common/patial-list.model';
import { FormGroup, FormControl } from '@angular/forms';

import { Select2OptionData } from 'ng2-select2';

@Component({
  selector: 'app-invoice-barcoded',
  templateUrl: './invoice-barcoded.component.html',
  styleUrls: ['./invoice-barcoded.component.scss']
})
export class InvoiceBarcodedComponent implements OnInit {
  data: PartialList<PurchaseOrder>;
  loading: boolean;
  savingSupplier: boolean;
  deletingSupplier: boolean;
  page = 1;
  size = 10;
  form: FormGroup;
  selectedInvoice: PurchaseOrder;
  

 barcoded:Barcoded;

 selectedPersonId = '5a15b13c36e7a7f00cf0d7cb';

 

  constructor(   private purchaseService: PurchaseOrderService,) {

    this.barcoded = {
      ppp:'pp40',
      isSiteName: true,
      isProductName: true,
      isProductPrice: true,
      isClientCode: true,
    }

  

   }

  ngOnInit() {
    
 
    this.loadData();

 
  }

  
 
  loadData(page?: number): void {
    this.page = page ? page : 1;
    this.loading = true;
    this.purchaseService.find({
      page: this.page,
      size: this.size
    }).subscribe((res: PartialList<PurchaseOrder>) => {
      this.data = res;
      
      this.loading = false;
    });
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
