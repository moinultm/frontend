import { Pipe, PipeTransform } from '@angular/core';
import { ConfigService } from '../common/config.service';

@Pipe({
  name: 'config',
  pure: false
})


export class ConfigPipe implements PipeTransform {

  constructor(private config: ConfigService) {
  }


  transform(key: any): any {
    return this.config.data[key] || key;
  }



}
