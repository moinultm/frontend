import { Component, OnInit } from '@angular/core';
import { RepresentStock } from '@app/shared/models/stock/represent-stock.model';
import { PartialList } from '@app/shared/models/common/patial-list.model';
import { RepresentStockService } from '@app/core/services/stock/represent-stock.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { JwtHelperService } from '@app/core/services/security/jwt-helper.service';
import { success, warning, error } from '@app/core/utils/toastr';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '@app/core/services/security/user.service';
import { User } from '@app/shared/models/security/user.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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

  selectedInvoice:RepresentStock;
  deletingInvoice:boolean;

  users:PartialList <User>;
  loadingUser:boolean;
  loadingPermission:boolean;
  currentUserID=0;
  isRoleViewAll:any;

  CanManage:any;

  deletingItem:boolean;
  form: FormGroup;

  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());

  constructor(
     public jwtHelper: JwtHelperService,
    private representService: RepresentStockService,
    private _fb: FormBuilder,
    private datePipe : DatePipe,
    private router:Router,
    private _toastr: ToastrService,
    private userService:UserService,
    private modalService: NgbModal
    ) {
      this.currentUserID=parseInt(this.jwtHelper.id());
      this.isRoleViewAll=  this.jwtHelper.hasRole('ROLE_MANAGER_PRIVILEGE');
      this.CanManage= this.jwtHelper.hasRole('ROLE_SALES_MANAGE');
    }

  ngOnInit() {
   // console.log(this.jwtHelper.userRoles());
   if (this.CanManage)
   {this.CanManage=true}
    else{ this.CanManage=false}

    if (this.isRoleViewAll)
        {this.loadUser();}
    else{
     // this.loadingUser=true;
    this.loadingPermission=true;}

    let uid =this.currentUserID;

    this.loadData(uid);
   // this.loadUser();
    this.iniForm();
  }


  iniForm(){
    this.form = this._fb.group({
      fromDate: [ new Date(),  [Validators.required],],
      toDate: [  new Date(),  [Validators.required],]
    });
  }

  loadUser(): void {
    this.loadingUser = true;
    this.userService.findRepresentative().subscribe((res: PartialList<User>) => {
      this.users = res;
       this.loadingUser = false;
    });
  }


  //Loading Data
  loadData(id:number,page?: number): void {
    this.page = page ? page : 1;
    this.loading = true;
    this.representService.findChallans(id,{
      page: this.page,
      size: this.size
    }).subscribe((res: PartialList<RepresentStock>) => {
      this.data = res;
      console.log(this.data)
      this.loading = false;
    });
  }


  //Search
dateFilter(){
  let formDt = this.datePipe.transform(this.form.get('fromDate').value, 'yyyy-MM-dd');
  let toDt = this.datePipe.transform(this.form.get('toDate').value, 'yyyy-MM-dd');

  this.loading = true;
  this.representService.find({
    from:  formDt,
    to:   toDt
  }).subscribe((res: PartialList<RepresentStock>) => {
    this.data = res;
    this.loading = false;
  });

}




  changeSelection(id:number){
    //console.log(id)
    this.loadData(id);
  }




  toDetails(id?:string){
    this.router.navigate([`representative/receipt-detail/${id}`]);
  }


updateConformed(ref?){

  this.representService.updateReceiving( {ref:ref} )
    .subscribe((data: any) =>   {
      success('Info!', 'Receiving Challan Conformed', this._toastr);
    }, (err: any) => {
      if (err.status === 403) {
        warning('Warning!', err.error.error, this._toastr);
      } else {
        error('Error!', 'An error has occured when updating , please contact system administrator.', this._toastr);
      }
    });
  }



  initDelete(modal: any, invoice: RepresentStock): void {
    this.selectedInvoice = invoice;
    // Open the delete confirmation modal
    this.modalService
      .open(modal)
      .result
      .then((result) => {
        if (result) {
          this.loadData(this.currentUserID);
        }
        this.selectedInvoice = new RepresentStock();
      }, () => {
        // If the modal is dismissed
        this.selectedInvoice = new RepresentStock();
      });
  }

  delete(modal: any): void {
    this.deletingInvoice = true;
    this.representService.delete({
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
