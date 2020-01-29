import { Component, OnInit } from '@angular/core';
import { PartialList } from '@app/shared/models/common/patial-list.model';
import { Damage } from '@app/shared/models/stock/damage.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DamageService } from '@app/core/services/stock/damage.service';
import { JwtHelperService } from '@app/core/services/security/jwt-helper.service';

@Component({
  selector: 'app-list-damage',
  templateUrl: './list-damage.component.html',
  styleUrls: ['./list-damage.component.scss']
})
export class ListDamageComponent implements OnInit {

  selectedInvoice:Damage;
  deletingInvoice:boolean;

  deletingItem:boolean;
  data: PartialList<Damage>;
  loading: boolean;
  savingCategory: boolean;
  deletingCategory: boolean;
  page = 1;
  size = 10;
  form: FormGroup;
  //selectedCategory: Category;
  CanManage:any;

  constructor(
    private damageService: DamageService,
    private _toastr: ToastrService,
    private modalService: NgbModal,
    titleService: Title,
    private _formBuilder: FormBuilder,
    public jwtHelper: JwtHelperService,
    private _fb: FormBuilder) {
      this.CanManage= this.jwtHelper.hasRole('ROLE_PRODUCT_MANAGE');
      titleService.setTitle('Stock - Damage List');

     }

  ngOnInit() {
    this.iniForm();

    if (this.CanManage)
    {this.CanManage=true}
     else{ this.CanManage=false}
    this.loadData();
  }

  //Loading Data
  loadData(page?: number): void {
    this.page = page ? page : 1;
    this.loading = true;
    this.damageService.find({
      page: this.page,
      size: this.size
    }).subscribe((res: PartialList<Damage>) => {
      this.data = res;
      this.loading = false;
    });
  }



  iniForm(){
    this.form = this._fb.group({
      fromDate: [ new Date(),  [Validators.required],],
      toDate: [  new Date(),  [Validators.required],]
    });
  }



  initDelete(modal: any, invoice: Damage): void {
    this.selectedInvoice = invoice;
    // Open the delete confirmation modal
    this.modalService
      .open(modal)
      .result
      .then((result) => {
        if (result) {
          this.loadData();
        }
        this.selectedInvoice = new Damage();
      }, () => {
        // If the modal is dismissed
        this.selectedInvoice = new Damage();
      });
  }

  delete(modal: any): void {
    this.deletingInvoice = true;
    this.damageService.delete({
      id: this.selectedInvoice.id
    }).subscribe(() => {
      this.close(modal, true);
      this.deletingInvoice = false;
    });
  }


  close(modal: any, flag?: boolean): void {
    modal.close(flag ? true : false);
  }

}
