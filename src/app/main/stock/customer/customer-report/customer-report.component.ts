import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Client } from '@app/shared/models/stock/client.model';
import { PartialList } from '@app/shared/models/common/patial-list.model';
import { CustomerService } from '@app/core/services/stock/customer.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Title } from '@angular/platform-browser';
import { success, warning,error } from '@app/core/utils/toastr';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-customer',
  templateUrl: './customer-report.component.html',

})
export class CustomerReportComponent implements OnInit {
  data: PartialList<Client>;
  loading: boolean;
  savingCustomer: boolean;
  deletingCustomer: boolean;
  page = 1;
  size = 10;
  form: FormGroup;
  selectedCustomer: Client;

  constructor(
    private customerService: CustomerService,


    titleService: Title,
    private route: ActivatedRoute,

   ) {
      titleService.setTitle('Stock-Customer');
     }

  ngOnInit() {
    let id=this.route.snapshot.params.id;
    this.loadData(id);
  }

  //Loading Data
      loadData(id:number): void {

        this.loading = true;
        this.customerService.findCustomerReport(id ).subscribe((res: PartialList<Client>) => {
          this.data = res;
          this.loading = false;
        });
      }


      close() {

    }


}
