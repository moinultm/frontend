import { Component, OnInit } from '@angular/core';
import { PartialList } from '@models/common/patial-list.model';
import { Product } from '@models/stock/product.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ProductService } from '@services/stock/product.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-barcode',
  templateUrl: './product-barcode.component.html',
  styleUrls: ['./product-barcode.component.scss']
})
export class ProductBarcodeComponent implements OnInit {
  elementType = 'svg';
  value = 'fuck';
  format = 'CODE128';
  lineColor = '#000000';
  width = 2;
  height = 100;
  displayValue = true;
  fontOptions = '';
  font = 'monospace';
  textAlign = 'center';
  textPosition = 'bottom';
  textMargin = 2;
  fontSize = 20;
  background = '#ffffff';
  margin = 10;
  marginTop = 10;
  marginBottom = 10;
  marginLeft = 10;
  marginRight = 10;

  data: PartialList<Product>;
  details:PartialList<Product>;
  loadingDetails:boolean;
  loading: boolean;
  savingProduct: boolean;
  deletingProduct: boolean;

  form: FormGroup;
  selectedProduct: Product;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,


  ) { }

  ngOnInit() {
    let id=this.route.snapshot.params.id;
    this.loadData(id)
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

          </style>
        </head>
    <body onload="window.print();window.close()">${printContents}</body>
      </html>`
    );
    popupWin.document.close();
  }




}
