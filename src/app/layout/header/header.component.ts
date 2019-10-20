import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@services/common/translate.service';
import { AuthenticationService } from '@services/security/authentication.service';
import { JwtHelperService } from '@services/security/jwt-helper.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private translate: TranslateService,
    private Auth: AuthenticationService,
    public jwtHelper: JwtHelperService
    ) {

     }

  ngOnInit() {
 
  }


  setLang(lang: string) {
    event.preventDefault()
    this.translate.use(lang);
  }


  logout(): void {
    this.Auth.logout();
  }

}
