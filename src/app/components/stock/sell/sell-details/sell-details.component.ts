
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sell-details',
  templateUrl: './sell-details.component.html',
  styleUrls: ['./sell-details.component.scss']
})


export class SellDetailsComponent implements OnInit {


  constructor(  private _toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {

    let id=this.route.snapshot.params.id;
    this.ShowBillDetails(id);

  }


  ShowBillDetails(id:number){

  }

}
