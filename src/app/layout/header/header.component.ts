import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@services/common/translate.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private translate: TranslateService) { }

  ngOnInit() {
  }


  setLang(lang: string) {
    event.preventDefault()
    this.translate.use(lang);
  }



}
