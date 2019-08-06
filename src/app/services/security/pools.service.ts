import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SignupComponent } from '../../components/signup/signup.component';


@Injectable()
export class PoolsService {

  private baseUrl='http://localhost:8000/api'

  constructor(private http: HttpClient) {}


  login(data){
    return this.http.post(`${this.baseUrl}/login`,data)
  }

 signup(data){
   return this.http.post(`${this.baseUrl}/signup`,data)
  }

  sendPasswordResetLink(data : any) {
    return this.http.post(`${this.baseUrl}/sendPasswordResetLink`, data)
  }
  changePassword(data : any) {
    return this.http.post(`${this.baseUrl}/resetPassword`, data)

  }

}
