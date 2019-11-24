import { Component, OnInit } from '@angular/core';
import { PartialList } from '@app/shared/models/common/patial-list.model';
import { Product } from '@app/shared/models/stock/product.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ProductService } from '@app/core/services/stock/product.service';

import { ActivatedRoute } from '@angular/router';
import { Client } from '@app/shared/models/stock/client.model';
import { CustomerService } from '@app/core/services/stock/customer.service';
 import { ConfigureService } from '@app/core/services/common/config.service';
import { TranslateService } from '@app/core/services/common/translate.service';

@Component({
  selector: 'app-product-barcode',
  templateUrl: './product-barcode.component.html',
  styleUrls: ['./product-barcode.component.scss']
})
export class ProductBarcodeComponent implements OnInit {
  elementType = 'svg';
  value = 'kkk';
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
  marginTop = 2;
  marginBottom =2;
  marginLeft = 2;
  marginRight = 2;

  data: PartialList<Product>;
  details:PartialList<Product>;
  loadingDetails:boolean;
  loading: boolean;
  savingProduct: boolean;
  deletingProduct: boolean;

  form: FormGroup;
  selectedProduct: Product;

  barcoded:any;
  selectedClientCode:string;

  countPrint:number;
  customerList: Array<Client>;



  ppp:string;
  isSiteName: boolean;
  isProductName: boolean;
  isProductPrice: boolean;
  isClientCode: boolean;
  prodDate:string;
  expdDate:string;


  constructor(
    private translate: TranslateService,
    private configure:ConfigureService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private customeService:CustomerService
  ) {

    this.barcoded = {
      ppp:'pp40',
      isSiteName: true,
      isProductName: true,
      isProductPrice: true,
      isClientCode: true,
       prodDate:'',
      expdDate:''
    }


/*
this.ppp='pp40';
this.isSiteName= true;
this.isProductName= true;
this.isProductPrice= true;
this.isClientCode= true;
this.prodDate='';
this.expdDate='';
*/
   }

  ngOnInit() {
    let id=this.route.snapshot.params.id;
    this.loadData(id);
    this.FillCustomer();
  }

  setConfig(configure: string) {
    this.configure.use(configure);
  }

  setLang(lang: string) {
    this.translate.use(lang);
  }

  get values(): string[] {
    return this.value.split('\n');
  }

 //Loading Data
 loadData(id: number): void {
  this.loading = true;
  this.productService.findDetailsById(1).subscribe((res: PartialList<Product>) => {
    this.data = res;
    console.log( this.data )
    this.loading = false;
  });
}


FillCustomer()
{
  this.loading=true;
  this.customeService.findCustomer()
  .subscribe((res: PartialList<Client>) => {
    this.customerList = res.data;
     this.loading = false;
  });
}

//Product
  print(): void {
    event.preventDefault();

    let printContents, popupWin;
    printContents = document.getElementById('print-section').innerHTML;
    popupWin = window.open();
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>Print Barcode</title>
          <style>
          .no-print{display:none}
          .small{font-size: 10px !important;}
.a4paper{
  width: 100%;
  /* height: 11.6in; */
  overflow: scroll;
  display: block;
  /* border: 1px solid #ccc; */
  margin: 10px auto;
  padding: 0.1in 0 0 0.1in;
  page-break-after: always;
}

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

.pp40 {
  width: 2in;

  padding: 0.05in;
  border: 1px solid #ddd;
  margin-top: 2px;
  margin-bottom: 2;
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


  counter(i: number) {
    return new Array(i);
}

}

/*
export interface Barcoded {
  ppp:string,
  isSiteName: boolean;
  isProductName: boolean;
  isProductPrice: boolean;
  isClientCode: boolean;
  prodDate:string;
  expdDate:string;
}
*/
