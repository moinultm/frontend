import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Product } from '@app/shared/models/stock/product.model';
import { PurchaseOrderService } from '@app/core/services/stock/purchase-order.service';
import { PurchaseOrder } from '@app/shared/models/stock/purchase-order.model';
import { PartialList } from '@app/shared/models/common/patial-list.model';
import { FormGroup, FormControl } from '@angular/forms';
import { SellsInvoiceService } from '@app/core/services/stock/sells-invoice.service';
import { SellsInvoice } from '@app/shared/models/stock/invoice.model';


@Component({
  selector: 'app-invoice-barcoded',
  templateUrl: './invoice-barcoded.component.html',
  styleUrls: ['./invoice-barcoded.component.scss']
})
export class InvoiceBarcodedComponent implements OnInit {

  elementType = 'svg';
  value = '';
  format = 'CODE128';
  lineColor = '#000000';
  width = 2;
  height = 50;
  displayValue = true;
  fontOptions = '';
  font = 'monospace';
  textAlign = 'center';
  textPosition = 'bottom';
  textMargin = 2;
  fontSize = 10;
  background = '#ffffff';
  margin = 2;
  marginTop =2;
  marginBottom = 2;
  marginLeft = 2;
  marginRight = 2;

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


 detailsData:PartialList<PurchaseOrder>;


  constructor(   private purchaseService: PurchaseOrderService,private sellsService: SellsInvoiceService,) {

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



  ShowBillDetails(id:number){
    this.purchaseDetail(id)

  }


  purchaseDetail(id){
    this.loadingDetails= true;
    this.purchaseService.findDetailsById(id).subscribe((res:PartialList <PurchaseOrder>) => {
      this.detailsData = res;
      this.loadingDetails = false;
    });
  }



  counter(i: number) {
    return new Array(i);
}

  print(): void {
    event.preventDefault()
  // window.print();


    let printContents, popupWin;
    printContents = document.getElementById('section-to-print').innerHTML;
    popupWin = window.open();
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>Print Barcode Report</title>
          <style>

          @page {
            margin: 0 auto;
            sheet-size: 300px 250mm;
        }

          body {
            margin: 0;
            font-family: "Source Sans Pro",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";}
          .small{font-size: 10px !important;}

.barcode-single-item {
  display: block;
  overflow: hidden;
  text-align: center;
  font-size: 12px;
  line-height: 14px;
  text-transform: uppercase;
  float: left;
}

.barcode-item {
  display: block;
  text-align: center;
  font-size: 12px;
  line-height: 14px;
  text-transform: uppercase;
}



.barcode-info-p {
  line-height: 16px !important;
  font-size: 12px !important;
  color: black !important;
  margin-bottom: 0;
}
          </style>
        </head>
    <body onload="window.print();window.close()">${printContents}</body>
      </html>`
    );
    popupWin.document.close();

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
