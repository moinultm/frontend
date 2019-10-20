import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { RepresentStock } from '@models/stock/represent-stock.model';
import { PartialList } from '@models/common/patial-list.model';
import { RepresentStockService } from '@services/stock/represent-stock.service';

@Component({
  selector: 'app-user-receipt-detail',
  templateUrl: './user-receipt-detail.component.html',
  styleUrls: ['./user-receipt-detail.component.scss']
})
export class UserReceiptDetailComponent implements OnInit {
  loadingDetails:boolean;
  details:PartialList <RepresentStock> ;

  constructor(private _toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private sellsService: RepresentStockService,
 ) { }

  ngOnInit() {
    let id=this.route.snapshot.params.id;
    this.ShowBillDetails(id);
 
  }

  ShowBillDetails(id:number){
    this.loadingDetails = true;
    this.sellsService.viewInvoice(id).subscribe((res:PartialList <RepresentStock>) => {
      this.details = res;
       console.log(res);
      this.loadingDetails = false;
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
          .hidden-form {
            display: none;
        }
        
          </style>
        </head>
    <body onload="window.print();window.close()">${printContents}</body>
      </html>`
    );
    popupWin.document.close();
}


}
