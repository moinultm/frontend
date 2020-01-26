import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { GiftService } from '@app/core/services/stock/gift.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Title } from '@angular/platform-browser';
import { PartialList } from '@app/shared/models/common/patial-list.model';
import { Damage } from '@app/shared/models/stock/damage.model';
import { JwtHelperService } from '@app/core/services/security/jwt-helper.service';
import { Gift } from '@app/shared/models/stock/gift.model';

@Component({
  selector: 'app-list-gift',
  templateUrl: './list-gift.component.html',
  styleUrls: ['./list-gift.component.scss']
})
export class ListGiftComponent implements OnInit {
  data:any;
  loading:boolean;

  selectedInvoice:Gift;
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
    private giftService: GiftService,
    private _toastr: ToastrService,
    private modalService: NgbModal,
    titleService: Title,
    private _formBuilder: FormBuilder,
    public jwtHelper: JwtHelperService) {
      titleService.setTitle('Stock - GIFT List');
      this.CanManage= this.jwtHelper.hasRole('ROLE_PRODUCT_MANAGE');

     }

  ngOnInit() {
    if (this.CanManage)
    {this.CanManage=true}
     else{ this.CanManage=false}

    this.loadData();
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


  initDelete(modal: any, invoice: Gift): void {
    this.selectedInvoice = invoice;
    // Open the delete confirmation modal
    this.modalService
      .open(modal)
      .result
      .then((result) => {
        if (result) {
          this.loadData();
        }
        this.selectedInvoice = new Gift();
      }, () => {
        // If the modal is dismissed
        this.selectedInvoice = new Gift();
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


  close(modal: any, flag?: boolean): void {
    modal.close(flag ? true : false);
  }

}
