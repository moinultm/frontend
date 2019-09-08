
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { PartialList } from '@models/common/patial-list.model';
import { SellsOrder } from '@models/stock/sellsorder.model';
import { SellsOrderService } from '@services/stock/sellsorder.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AddPaymentComponent } from '../add-payment/add-payment.component';

@Component({
  selector: 'app-sell-details',
  templateUrl: './sell-details.component.html',
  styleUrls: ['./sell-details.component.scss']
})


export class SellDetailsComponent implements OnInit {

  loadingDetails:boolean;
  details:PartialList <SellsOrder> ;

  constructor(  private _toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private sellsService: SellsOrderService,
    private dialog: MatDialog,

  ) { }

  ngOnInit() {
    let id=this.route.snapshot.params.id;
    this.ShowBillDetails(id);

  }

  ShowBillDetails(id:number){
    this.loadingDetails = true;
    this.sellsService.findDetailsById(id).subscribe((res:PartialList <SellsOrder>) => {
      this.details = res;
console.log(res);
      this.loadingDetails = false;
    });
  }



  openDialogPayments(id:number){

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;


    //dialogConfig.width= '50%';


    if (id)
    {
      dialogConfig.data = id
    }
    else
    {
      dialogConfig.data ={}
    }

    const dialogRef=   this.dialog.open(AddPaymentComponent, dialogConfig,);

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
