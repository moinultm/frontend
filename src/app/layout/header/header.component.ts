import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@app/core/services/common/translate.service';
import { AuthenticationService } from '@app/core/services/security/authentication.service';
import { JwtHelperService } from '@app/core/services/security/jwt-helper.service';
import { AttendanceService } from '@app/core/services/employee/attendance.service';
import { ToastrService } from 'ngx-toastr';
import { warning, error, success } from '@app/core/utils/toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  name = 'Angular';
  time = new Date();
  timer;

  checkedIn:boolean;
user:number;

  constructor(private translate: TranslateService,
    private Auth: AuthenticationService,
    public jwtHelper: JwtHelperService,
    private attservice:AttendanceService,
    private _toastr: ToastrService,
    ) {

     }

  ngOnInit() {
    this.user=parseInt (this.jwtHelper.id());
    this.isCheckedIn();
   this. timeClock();
  }


  setLang(lang: string) {
    event.preventDefault()
    this.translate.use(lang);
  }


  logout(): void {
    this.Auth.logout();
  }


  fullScreen(event) {
    event.preventDefault()
    let elem = document.documentElement;
    let methodToBeInvoked = elem.requestFullscreen ||
      elem["webkitRequestFullScreen"] || elem['mozRequestFullscreen']
      ||
      elem['msRequestFullscreen'];
    if (methodToBeInvoked) methodToBeInvoked.call(elem);
}

timeClock(){
  this.timer = setInterval(() => {
    this.time = new Date();
  }, 1000);
}

ngOnDestroy(){
  clearInterval(this.timer);
}



isCheckedIn(){
  this.attservice.checkAttandance({
    id:  this.user,
  })
    .subscribe((data: boolean) =>   {
      this.checkedIn=data;
      //console.log( this.checkedIn)
    });
}
//   warning('Warning!', e, this._toastr);
doChekIn(){
  event.preventDefault()
  this.attservice.inAttandance({
    id:  this.user,
  })
    .subscribe((data: any) =>   {
      this.checkedIn=true;
      //console.log( this.checkedIn)
      success('Info!', data.user_name +' - Checkin time added', this._toastr);
    }, (err: any) => {
      if (err.status === 403) {
        this.checkedIn=true;
      warning('Warning!', err.error.error, this._toastr);

      } else {
        error('Error!', 'An error has occured when saving, please contact system administrator.', this._toastr);
      }

    });
}

doChekOut(){
  event.preventDefault()
  this.attservice.outAttandance({
    id:  this.user,
  })
    .subscribe((data: any) =>   {
     // this.checkedIn=false;
      success('Info!', data.user_name +' - Checkout time updated', this._toastr);
      this.checkedIn=false;
      //console.log( this.checkedIn)
    }, (err: any) => {
      if (err.status === 403) {
        warning('Warning!', err.error.error, this._toastr);
      } else {
        error('Error!', 'An error has occured when saving , please contact system administrator.', this._toastr);
      }

    });
  }

}
