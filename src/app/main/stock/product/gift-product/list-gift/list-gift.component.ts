import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { GiftService } from '@app/core/services/stock/gift.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Title } from '@angular/platform-browser';
import { PartialList } from '@app/shared/models/common/patial-list.model';
import { Damage } from '@app/shared/models/stock/damage.model';

@Component({
  selector: 'app-list-gift',
  templateUrl: './list-gift.component.html',
  styleUrls: ['./list-gift.component.scss']
})
export class ListGiftComponent implements OnInit {
  data:any;
  loading:boolean;


  savingCategory: boolean;
  deletingCategory: boolean;
  page = 1;
  size = 10;
  form: FormGroup;
  //selectedCategory: Category;


  constructor(
    private giftService: GiftService,
    private _toastr: ToastrService,
    private modalService: NgbModal,
    titleService: Title,
    private _formBuilder: FormBuilder) {

      titleService.setTitle('Stock - GIFT List');

     }

  ngOnInit() {
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
      this.loading = false;
    });
  }

}
