// Angular modules
import { Injectable } from '@angular/core';
import { constants } from '@env/constants';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})

export class JwtHelperService {


  private decode(token: string): any {
    if (token !== null || token !== undefined) {
      const base64Url = token.split('.')[1];
      if (base64Url === null || base64Url === undefined) {
        return null;
      }
      const base64 = base64Url.replace('-', '+').replace('_', '/');
      return JSON.parse(window.atob(base64));
    } else {
      return null;
    }
  }


  email(): string {
    const token = localStorage.getItem(constants.access_token);
    if (token === null || token === undefined) {
      return null;
    } else {
      const decoded = this.decode(token);
      return (decoded === 'null') ? null : decoded.email;
    }
  }

  name(): string {
    const token = localStorage.getItem(constants.access_token);
    if (token === null || token === undefined) {
      return null;
    } else {
      const decoded = this.decode(token);
      return (decoded === null) ? null : decoded.name;
    }
  }


  id(): string {
    const token = localStorage.getItem(constants.access_token);
    if (token === null || token === undefined) {
      return null;
    } else {
      const decoded = this.decode(token);
      return (decoded === null) ? null : decoded.sub;
    }
  }


  picture(): string {
    const token = localStorage.getItem(constants.access_token);
    if (token === null || token === undefined) {
      return null;
    } else {
      const decoded = this.decode(token);
      return (decoded === null || !decoded.picture) ? null : environment.web_url + 'users/picture/' + decoded.sub;
    }
  }

  userRoles(): Array<string> {
    const token = localStorage.getItem(constants.access_token);
    if (token === null || token === undefined) {
      return [];
    } else {
      const decoded = this.decode(token);
      return (decoded === null) ? [] : decoded.roles;
    }
  }


  hasRole(role: String): Boolean {
    let result = false;
    const authorities: Array<String> = this.userRoles();
    authorities.forEach((authority: String) => {
      if (authority === role) {
        result = true;
      }
    });
    return result;
  }

}
