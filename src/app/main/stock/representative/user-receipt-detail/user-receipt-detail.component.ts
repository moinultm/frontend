import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { RepresentStock } from '@app/shared/models/stock/represent-stock.model';
import { PartialList } from '@app/shared/models/common/patial-list.model';
import { RepresentStockService } from '@app/core/services/stock/represent-stock.service';

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

  ShowBillDetails(ref:string){
    this.loadingDetails = true;
    this.sellsService.viewInvoice({ref:ref}).subscribe((res:PartialList <RepresentStock>) => {
      this.details = res;
       console.log(res);
      this.loadingDetails = false;
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
        body
          {
            padding: 50mm  10mm  10mm 10mm;
          }
      </style>
      </head>
      <body onload="window.print(); setTimeout(()=>{ window.close(); }, 0)">
        ${printContents}
      </body>
    </html>`);
  popupWin.document.close();
}




}
