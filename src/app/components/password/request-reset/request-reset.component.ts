import { Component, OnInit } from '@angular/core';
import { PoolsService } from '@services/security/pools.service';
import { SnotifyService } from 'ng-snotify';

@Component({
  selector: 'app-request-reset',
  templateUrl: './request-reset.component.html',
  styleUrls: ['./request-reset.component.scss']
})
export class RequestResetComponent implements OnInit {

  public form ={
    email:null
  };

  constructor(private Pools: PoolsService,private snotify: SnotifyService,    private sNotfiy:SnotifyService) { }

  ngOnInit() {
  }

  onSubmit(){
this.Pools.sendPasswordResetLink(this.form).subscribe(
data => this.handleResponse(data),
error => this.snotify.error(error.error.error),

);
  }

  handleResponse(res){
    console.log(res);
    this.form.email=null;
  }

}
