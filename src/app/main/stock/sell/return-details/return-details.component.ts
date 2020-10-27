import { Component, OnInit } from '@angular/core';
import { PartialList } from '@app/shared/models/common/patial-list.model';
import { SellsInvoice } from '@app/shared/models/stock/invoice.model';
import { SellsInvoiceService } from '@app/core/services/stock/sells-invoice.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfigureService } from '@app/core/services/common/config.service';
import { environment } from '@env/environment';


@Component({
  selector: 'app-return-details',
  templateUrl: './return-details.component.html',
  styleUrls: ['./return-details.component.scss']
})
export class ReturnDetailsComponent implements OnInit {

  loadingDetails:boolean;
  details:PartialList <SellsInvoice> ;

  logoPreview: any;

  constructor(  private _toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private sellsService: SellsInvoiceService,
    private dialog: MatDialog,
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

  ShowBillDetails(id:number){
    this.loadingDetails = true;
    this.sellsService.findReturnDetailsById(id).subscribe((res:PartialList <SellsInvoice>) => {
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

        @media screen {
          div.divFooter {
            display: none;
          }
        }
        @media print {
          div.divFooter {
            position: fixed;
            bottom: 0;
          }
        }

        body
          {
            padding:1mm  10mm  10mm 10mm;
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
