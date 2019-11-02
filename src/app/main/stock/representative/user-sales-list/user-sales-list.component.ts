import { Component, OnInit } from '@angular/core';
import { PartialList } from '@models/common/patial-list.model';
import { SellsInvoice } from '@models/stock/invoice.model';
import { RepresentStockService } from '@services/stock/represent-stock.service';
import { RepresentStock } from '@models/stock/represent-stock.model';
import { UserService } from '@services/security/user.service';
import { User } from '@models/security/user.model';
import { JwtHelperService } from '@services/security/jwt-helper.service';


@Component({
  selector: 'app-user-sales-list',
  templateUrl: './user-sales-list.component.html',
  styleUrls: ['./user-sales-list.component.scss']
})
export class UserSalesListComponent implements OnInit {

data: PartialList<RepresentStock>;
loading: boolean;
loadingUser:boolean;
savingSubcategory: boolean;
deletingSubcategory: boolean;

loadingCategory: boolean;
page = 1;
size = 10;

currentUserID=0;

users:PartialList <User>;

isRoleViewAll:any;


  constructor(    public jwtHelper: JwtHelperService,
    private representService: RepresentStockService,    private userService:UserService) {
      this.currentUserID=parseInt(this.jwtHelper.id());
      this.isRoleViewAll=  this.jwtHelper.hasRole('ROLE_VIEW_ALL');
    }

  ngOnInit() {

    console.log(this.jwtHelper.userRoles());
    if (this.isRoleViewAll){      this.loadUser();    }
    else{this.loadingUser=true;}

    let uid =this.currentUserID;
    this.loadData(uid);



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
      this.representService.findSells(id,{
        page: this.page,
        size: this.size
      }).subscribe((res: PartialList<RepresentStock>) => {
        this.data = res;
        this.loading = false;
      });
    }


    changeSelection(id:number){
      //console.log(id)
      this.loadData(id);
    }

}