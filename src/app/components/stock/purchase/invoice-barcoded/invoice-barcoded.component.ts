import { Component, OnInit } from '@angular/core';
import { Product } from '@models/stock/product.model';

@Component({
  selector: 'app-invoice-barcoded',
  templateUrl: './invoice-barcoded.component.html',
  styleUrls: ['./invoice-barcoded.component.scss']
})
export class InvoiceBarcodedComponent implements OnInit {


 barcoded:Barcoded;

  constructor() {

    this.barcoded = {
      ppp:'pp40',
      isSiteName: true,
      isProductName: true,
      isProductPrice: true,
      isClientCode: true,
    }

   }

  ngOnInit() {
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


}

export interface Barcoded {
  ppp:string,
  isSiteName: boolean;
  isProductName: boolean;
  isProductPrice: boolean;
  isClientCode: boolean;
}
