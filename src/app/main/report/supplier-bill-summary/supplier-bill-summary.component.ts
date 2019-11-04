import { Component, OnInit } from '@angular/core';
import { Client } from '@app/shared/models/stock/client.model';
import { FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { PartialList } from '@app/shared/models/common/patial-list.model';
import { SupplierService } from '@app/core/services/stock/supplier.service';

@Component({
  selector: 'app-supplier-bill-summary',
  templateUrl: './supplier-bill-summary.component.html',
  styleUrls: ['./supplier-bill-summary.component.scss']
})
export class SupplierBillSummaryComponent implements OnInit {

  data: PartialList<Client>;
  loading: boolean;
  savingCategory: boolean;
  deletingCategory: boolean;
  page = 1;
  size = 10;
  form: FormGroup;
  selectedCategory: Client;


  constructor( private supplierService: SupplierService,

    titleService: Title,
   ) {
    titleService.setTitle('Report Supplier - Transactions');

    }

  ngOnInit() {
    this.loadData();
  }


   //Loading Data
   loadData(id?: number): void {


    this.supplierService.findTransactionSummary (0)
    .subscribe((res: PartialList<Client>) => {
      this.data = res;
      this.loading = false;
    });
  }



}
