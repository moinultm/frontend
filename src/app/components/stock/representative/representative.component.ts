import { Component, OnInit } from '@angular/core';
import { RepresentStock } from '@models/stock/represent-stock.model';
import { PartialList } from '@models/common/patial-list.model';
import { RepresentStockService } from '@services/stock/represent-stock.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-representative',
  templateUrl: './representative.component.html',
  styleUrls: ['./representative.component.scss']
})
export class RepresentativeComponent implements OnInit {
  data: PartialList<RepresentStock>;
  loading: boolean;
  savingSubcategory: boolean;
  deletingSubcategory: boolean;

  loadingCategory: boolean;
  page = 1;
  size = 10;

  form: FormGroup;
  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());

  constructor(  private representService: RepresentStockService,
    private _fb: FormBuilder,
    private datePipe : DatePipe,
    private router:Router,) { }

  ngOnInit() {
    this.loadData();
    this.iniForm();
  }


  iniForm(){
    this.form = this._fb.group({
      fromDate: [  '',  [Validators.nullValidator],],
      toDate: [  '',  [Validators.nullValidator],]
    });
  }



  //Loading Data
  loadData(page?: number): void {
    this.page = page ? page : 1;
    this.loading = true;
    this.representService.find({
      page: this.page,
      size: this.size
    }).subscribe((res: PartialList<RepresentStock>) => {
      this.data = res;
      this.loading = false;
    });
  }


  dateFilter(form:any){    
   console.log( )
  }


  toDetails(id:number){
    this.router.navigate([`representative/receipt-detail/${id}`]);
  }


}
