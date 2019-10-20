
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { PartialList } from '@models/common/patial-list.model';
import { PurchaseOrder } from '@models/stock/purchase-order.model';
import { PurchaseOrderService } from '@services/stock/purchase-order.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AddPaymentComponent } from '../add-payment/add-payment.component';
import { error, warning, success } from '@services/core/utils/toastr';

@Component({
  selector: 'app-purchase-details',
  templateUrl: './purchase-details.component.html',
  styleUrls: ['./purchase-details.component.scss']
})


export class PurchaseDetailsComponent implements OnInit {


  loadingDetails:boolean;
  details:PartialList <PurchaseOrder> ;

  constructor(  private _toastr: ToastrService,
    private route: ActivatedRoute,

    private purchaseService: PurchaseOrderService,
    private dialog: MatDialog,

  ) { }

  ngOnInit() {
    let id=this.route.snapshot.params.id;
    this.ShowBillDetails(id);
  }

  ShowBillDetails(id:number){
    this.loadingDetails = true;
    this.purchaseService.findDetailsById(id).subscribe((res:PartialList <PurchaseOrder>) => {
      this.details = res;
       console.log(res);
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
