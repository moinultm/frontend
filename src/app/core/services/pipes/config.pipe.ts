import { Pipe, PipeTransform } from '@angular/core';
import { ConfigureService } from '../common/config.service';

@Pipe({
  name: 'configure',
  pure: false
})


export class ConfigurePipe implements PipeTransform {

  constructor(private configure: ConfigureService) {
  }


  transform(key: any): any {
    return this.configure.data[key] || key;
  }



}
