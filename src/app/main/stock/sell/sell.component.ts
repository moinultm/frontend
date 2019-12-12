import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { PartialList } from '@app/shared/models/common/patial-list.model';
import { SellsInvoice } from '@app/shared/models/stock/invoice.model';
import { SellsInvoiceService } from '@app/core/services/stock/sells-invoice.service';
import{TablesDataSource} from '@app/core/services/stock/lessons.datasource'
import { fromEvent, merge, Observable } from 'rxjs';
import { tap, distinctUntilChanged, debounceTime, filter, map } from 'rxjs/operators';
import { ProductService } from '@app/core/services/stock/product.service';
import { UserService } from '@app/core/services/security/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';




@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.scss']
})
export class SellComponent implements OnInit {



  apiResponse:any;
  isSearching:boolean;
@ViewChild('input', { static: false }) input: ElementRef;
@ViewChild('input2',{ static: false }) input2: ElementRef;

  data: any;
  loading: boolean;
  savingSles: boolean;
  deletingSales: boolean;
  page = 1;
  size = 10;

  form: FormGroup;

  //dataSource: TablesDataSource;
  //displayedColumns= ["slNo", "referenceNo", "date", "name","total","paid","user","actions"];
  //@ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  //@ViewChild(MatSort, { static: false }) sort: MatSort;


  route: any;
  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());

  constructor(
    private sellsService:SellsInvoiceService,
    private router:Router,
    private _fb: FormBuilder,private datePipe : DatePipe,
    private actRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.iniForm();
   // this.loadData();
   this.fillList();
  }

  data$: Observable<any>;

//Loading Data
loadData(page?: number): void {
  this.page = page ? page : 1;
  this.loading = true;
  let formDt = this.datePipe.transform(this.form.get('fromDate').value, 'yyyy-MM-dd');
  let toDt = this.datePipe.transform(this.form.get('toDate').value, 'yyyy-MM-dd');

  this.sellsService.find({
    page: this.page,
    size: this.size,
    from:  formDt,
    to:   toDt
  }).subscribe((res: PartialList<SellsInvoice>) => {
    this.data = res;

    this.loading = false;
  });
}


fillList(){
  this.actRoute.data.subscribe(data => {
    this.data=data.SellsListResolver;
    this.loading = false;
  });
  }



//Search
dateFilter(){
  let formDt = this.datePipe.transform(this.form.get('fromDate').value, 'yyyy-MM-dd');
  let toDt = this.datePipe.transform(this.form.get('toDate').value, 'yyyy-MM-dd');
  this.loading = true;
  this.sellsService.find({
    from:  formDt,
    to:   toDt
  }).subscribe((res: PartialList<SellsInvoice>) => {
    this.data = res;
    this.loading = false;
  });

}


searchByInvoiceNo(text:string){
  console.log(text);
}

//Redirection
toDetails(id:number){
  this.router.navigate([`sell/details/${id}`]);
}

refereToNewSell(){
  this.router.navigate(['sell/add']);
}

refereToReturnSell(id:number){
  this.router.navigate([`sell/return/${id}`]);
}


refereToEditInvoice(id:number){

}


iniForm(){
  this.form = this._fb.group({
    fromDate: [ new Date(),  [Validators.required],],
    toDate: [  new Date(),  [Validators.required],]
  });
}



ngAfterViewInit(){
  fromEvent(this.input.nativeElement, 'keyup').pipe(
    map((event: any) => {
      return event.target.value;
    })
    ,filter(res => res.length > 3)
    ,debounceTime(1000)
    ,distinctUntilChanged()
    ).subscribe((text: Text) => {
      this.isSearching = true;
       this.sellsService.findByInvoiceNo(text).subscribe((res)=>{
        //console.log('res',res);
        this.loading = false;
        this.data = res;
      },(err)=>{
        this.loading = false;
       // console.log('error',err);
      });


    });
}
}
