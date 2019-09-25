import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslatePipe } from '../../services/pipes/translate.pipe';


@NgModule({
  declarations: [TranslatePipe],


  exports: [TranslatePipe]
})
export class TranslateModule { }
