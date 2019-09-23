import { Component, OnInit } from '@angular/core';
import { PartialList } from '@models/common/patial-list.model';
import { SellsOrder } from '@models/stock/sells-order.model';
import { RepresentStockService } from '@services/stock/represent-stock.service';
import { RepresentStock } from '@models/stock/represent-stock.model';
import { UserService } from '@services/security/user.service';
import { User } from '@models/security/user.model';


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

users:PartialList <User>;

  constructor(private representService: RepresentStockService,    private userService:UserService) { }

  ngOnInit() {

    this.loadData(0);

    this.loadUser();
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
