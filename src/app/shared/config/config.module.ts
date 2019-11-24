import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigurePipe } from '../../core/services/pipes/config.pipe';


@NgModule({
  declarations: [ConfigurePipe],

  exports: [ConfigurePipe]
})
export class ConfigModule { }
