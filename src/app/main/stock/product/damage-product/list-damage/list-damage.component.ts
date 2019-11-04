import { Component, OnInit } from '@angular/core';
import { PartialList } from '@app/shared/models/common/patial-list.model';
import { Damage } from '@app/shared/models/stock/damage.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DamageService } from '@app/core/services/stock/damage.service';

@Component({
  selector: 'app-list-damage',
  templateUrl: './list-damage.component.html',
  styleUrls: ['./list-damage.component.scss']
})
export class ListDamageComponent implements OnInit {

  data: PartialList<Damage>;
  loading: boolean;
  savingCategory: boolean;
  deletingCategory: boolean;
  page = 1;
  size = 10;
  form: FormGroup;
  //selectedCategory: Category;


  constructor(
    private damageService: DamageService,
    private _toastr: ToastrService,
    private modalService: NgbModal,
    titleService: Title,
    private _formBuilder: FormBuilder) {

      titleService.setTitle('Stock - Damage List');

     }

  ngOnInit() {
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


}
