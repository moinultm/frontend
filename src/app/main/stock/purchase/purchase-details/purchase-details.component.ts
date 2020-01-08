
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { PartialList } from '@app/shared/models/common/patial-list.model';
import { PurchaseOrder } from '@app/shared/models/stock/purchase-order.model';
import { PurchaseOrderService } from '@app/core/services/stock/purchase-order.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AddPaymentComponent } from '../add-payment/add-payment.component';
import { error, warning, success } from '@app/core/utils/toastr';

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

      //dialogConfig.width= '250px';

      dialogConfig.data = this.details

    const dialogRef=   this.dialog.open(AddPaymentComponent, dialogConfig,);
    dialogRef.afterClosed().subscribe(result => {
      console.log(result)

        let id=this.route.snapshot.params.id;
        this.ShowBillDetails(id);


    });

  }




  private getElementTag(tag: keyof HTMLElementTagNameMap): string {
    const html: string[] = [];
    const elements = document.getElementsByTagName(tag);
    for (let index = 0; index < elements.length; index++) {
      html.push(elements[index].outerHTML);
    }
    return html.join('\r\n');
  }


  print(printSectionId): void {
    event.preventDefault()
  let printContents, popupWin, styles = "", links = '';


    styles = this.getElementTag('style');
    links = this.getElementTag('link');


  printContents = document.getElementById(printSectionId).innerHTML;
  popupWin = window.open("", "_blank", "top=0,left=0,height=auto,width=auto");
  popupWin.document.open();
  popupWin.document.write(`
    <html>
      <head>
        <title>Report</title>
        ${styles}
        ${links}
        <style>

      </style>
      </head>
      <body onload="window.print(); setTimeout(()=>{ window.close(); }, 0)">
        ${printContents}
      </body>
    </html>`);
  popupWin.document.close();
}


}
