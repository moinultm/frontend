
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { PartialList } from '@models/common/patial-list.model';
import { SellsOrder } from '@models/stock/sellsorder.model';
import { SellsOrderService } from '@services/stock/sellsorder.service';
import { CombineLatestSubscriber } from 'rxjs/internal/observable/combineLatest';

@Component({
  selector: 'app-sell-details',
  templateUrl: './sell-details.component.html',
  styleUrls: ['./sell-details.component.scss']
})


export class SellDetailsComponent implements OnInit {

  loadingDetails:boolean;
  details:PartialList <SellsOrder> ;

  constructor(  private _toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private sellsService: SellsOrderService,
  ) { }

  ngOnInit() {
    let id=this.route.snapshot.params.id;
    this.ShowBillDetails(id);
  }

  ShowBillDetails(id:number){
    this.loadingDetails = true;
    this.sellsService.findDetailsById(id).subscribe((res:PartialList <SellsOrder>) => {
      this.details = res;
      this.loadingDetails = false;
    });
  }


}
