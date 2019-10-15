
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { PartialList } from '@models/common/patial-list.model';
import {SellsInvoice } from '@models/stock/invoice.model';
import { SellsInvoiceService } from '@services/stock/sells-invoice.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AddPaymentComponent } from '../add-payment/add-payment.component';
import { error, warning, success } from '@services/core/utils/toastr';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})


export class OrderDetailsComponent implements OnInit {


  loadingDetails:boolean;
  details:PartialList <SellsInvoice> ;

  constructor(  private _toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private ordersService:SellsInvoiceService,
    private dialog: MatDialog,


  ) { }

  ngOnInit() {
    let id=this.route.snapshot.params.id;
    this.ShowBillDetails(id);

  }

  ShowBillDetails(id:number){
    this.loadingDetails = true;
    this.ordersService.findOrderDetailsId(id).subscribe((res:PartialList <SellsInvoice>) => {
      this.details = res;
    // console.log(res);
      this.loadingDetails = false;
    });
  }


  openDialogPayments(){

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

      dialogConfig.width= '250px';

      dialogConfig.data = this.details

    const dialogRef=   this.dialog.open(AddPaymentComponent, dialogConfig,);
    dialogRef.afterClosed().subscribe(result => {
      console.log(result)

        let id=this.route.snapshot.params.id;
        this.ShowBillDetails(id);


    });

  }


  makeInvoice(id:number){
    this.router.navigate([`sell/order-invoice/${id}`]);
  }


  print(): void {
    event.preventDefault()

    let printContents, popupWin;
    printContents = document.getElementById('print-section').innerHTML;
    popupWin = window.open();
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>Print tab</title>
          <style>

          </style>
        </head>
    <body onload="window.print();window.close()">${printContents}</body>
      </html>`
    );
    popupWin.document.close();
}



}
