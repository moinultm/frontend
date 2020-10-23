import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ConsumeService } from '@app/core/services/stock/consume.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Title } from '@angular/platform-browser';
import { PartialList } from '@app/shared/models/common/patial-list.model';
import { Damage } from '@app/shared/models/stock/damage.model';
import { JwtHelperService } from '@app/core/services/security/jwt-helper.service';
import { Consume } from '@app/shared/models/stock/consume.model';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-list-consum',
  templateUrl: './list-consum.component.html',
  styleUrls: ['./list-consum.component.scss']
})
export class ListConsumComponent implements OnInit {

  data:any;
  loading:boolean;

  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());

  selectedInvoice:Consume;
  deletingItem:boolean;
  deletingInvoice:boolean;
  savingCategory: boolean;
  deletingCategory: boolean;
  page = 1;
  size = 10;
  form: FormGroup;
  //selectedCategory: Category;
  CanManage:any;

  constructor(
    private giftService: ConsumeService,
    private _toastr: ToastrService,
    private datePipe : DatePipe,
    private modalService: NgbModal,
    titleService: Title,
    private _formBuilder: FormBuilder,
    public jwtHelper: JwtHelperService, private _fb: FormBuilder,) {
      titleService.setTitle('Stock - GIFT List');
      this.CanManage= this.jwtHelper.hasRole('ROLE_PRODUCT_MANAGE');

     }

  ngOnInit() {
    if (this.CanManage)
    {this.CanManage=true}
     else{ this.CanManage=false}

    this.loadData();
    this.iniForm();
  }
  iniForm(){
    this.form = this._fb.group({
      fromDate: [  new Date(),  [Validators.required],],
      toDate: [   new Date(),  [Validators.required],]
    });
  }
  //Loading Data
  loadData(page?: number): void {
    this.page = page ? page : 1;
    this.loading = true;
    this.giftService.find({
      page: this.page,
      size: this.size
    }).subscribe((res: PartialList<Damage>) => {
      this.data = res;
      console.log( this.data)
      this.loading = false;
    });
  }


  initDelete(modal: any, invoice:   Consume): void {
    this.selectedInvoice = invoice;
    // Open the delete confirmation modal
    this.modalService
      .open(modal)
      .result
      .then((result) => {
        if (result) {
          this.loadData();
        }
        this.selectedInvoice = new  Consume();
      }, () => {
        // If the modal is dismissed
        this.selectedInvoice = new  Consume();
      });
  }

  delete(modal: any): void {
    this.deletingInvoice = true;
    this.giftService.delete({
      id: this.selectedInvoice.id
    }).subscribe(() => {
      this.close(modal, true);
      this.deletingInvoice = false;
    });
  }


  dateFilter(){
    let formDt = this.datePipe.transform(this.form.get('fromDate').value, 'yyyy-MM-dd');
    let toDt = this.datePipe.transform(this.form.get('toDate').value, 'yyyy-MM-dd');
    this.loading = true;
    this.giftService.find({
      from:  formDt,
      to:   toDt
    }).subscribe((res: PartialList<Consume>) => {
      this.data = res;
      this.loading = false;
    });

  }




  close(modal: any, flag?: boolean): void {
    modal.close(flag ? true : false);
  }

}
