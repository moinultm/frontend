import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Platform } from '@angular/cdk/platform';

export interface ConfigObject {
  navbar: boolean;
  sidebar: boolean;
  footer: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  settings: ConfigObject;
  onSettingsChanged: BehaviorSubject<ConfigObject>;

  constructor(
    public platform: Platform
  ) {
    this.settings = this.defaultSettings();

    this.onSettingsChanged = new BehaviorSubject(this.settings);
  }

  setSettings(settings: ConfigObject) {
    this.settings = Object.assign({}, this.settings, settings);

    this.onSettingsChanged.next(this.settings);
  }

  defaultSettings(): ConfigObject {
    return {
      navbar: true,
      sidebar: true,
      footer: true
    };
  }


}
