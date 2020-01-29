import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { RepresentStock } from '@app/shared/models/stock/represent-stock.model';
import { PartialList } from '@app/shared/models/common/patial-list.model';
import { RepresentStockService } from '@app/core/services/stock/represent-stock.service';

import { environment } from '@env/environment';
import { ConfigureService } from '@app/core/services/common/config.service';




@Component({
  selector: 'app-user-receipt-detail',
  templateUrl: './user-receipt-detail.component.html',
  styleUrls: ['./user-receipt-detail.component.scss']
})
export class UserReceiptDetailComponent implements OnInit {
  loadingDetails:boolean;
  details:PartialList <RepresentStock> ;

  logoPreview: any;

  constructor(private _toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private sellsService: RepresentStockService,
    private configure:ConfigureService
 ) { }

  ngOnInit() {
    this.logoPreview = environment.uploads_url + 'site/';

    let id=this.route.snapshot.params.id;
    this.ShowBillDetails(id);
  }

  setConfig(configure: string) {
    return this.configure.use(configure);
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



  printNew(){
  }

  print(printSectionId): void {
    event.preventDefault();

    let printContents, popupWin, styles = "", links = '';

    styles = this.getElementTag('style');
    links = this.getElementTag('link');


    printContents = document.getElementById(printSectionId).innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
        ${styles}
        ${links}
          <title>Print</title>
          <style>

          </style>
        </head>
    <body onload="window.print();window.close()">${printContents}</body>
      </html>`
    );
    popupWin.document.close();

}






}
