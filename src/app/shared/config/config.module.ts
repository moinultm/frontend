import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigPipe } from '../../core/services/pipes/config.pipe';


@NgModule({
  declarations: [ConfigPipe],

  exports: [ConfigPipe]
})
export class ConfigModule { }
