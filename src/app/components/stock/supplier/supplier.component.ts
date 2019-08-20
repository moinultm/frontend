import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PartialList } from '@models/common/patial-list.model';
import { Client } from '@models/stock/client.model';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Title } from '@angular/platform-browser';
import { SupplierService } from '@services/stock/supplier.service';
@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.scss']
})
export class SupplierComponent implements OnInit {
  data: PartialList<Client>;
  loading: boolean;
  savingCustomer: boolean;
  deletingSupplier: boolean;
  page = 1;
  size = 10;
  form: FormGroup;
  selectedSupplier: Client;

  
  constructor(private supplierService: SupplierService,
    private _toastr: ToastrService,
    private modalService: NgbModal,
    titleService: Title,
    private _formBuilder: FormBuilder) {
      titleService.setTitle('Stock - Supplier');
     }


  ngOnInit() {
    this.loadData()

  }

  loadData(page?: number): void {
    this.page = page ? page : 1;
    this.loading = true;
    this.supplierService.find({
      page: this.page,
      size: this.size
    }).subscribe((res: PartialList<Client>) => {
      this.data = res;
      this.loading = false;
    });
  }

}
