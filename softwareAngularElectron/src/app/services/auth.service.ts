import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Admin } from '../interfaces/admin.interface';
import { RegisterAdmin } from '../interfaces/register.interface';
const herokuURL = "https://api-radio-world.herokuapp.com";
const localHost = "http://localhost:3001";
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  register(admin: RegisterAdmin): Observable<object> {
    return this.httpClient.post(localHost+"/admin/register", {
      'firstname': admin.firstname,
      'lastname': admin.lastname,
      'email': admin.email,
      'createdBy': admin.createdBy,
    });
  }

  login(admin: Admin): Observable<object> {
    return this.httpClient.post(localHost+"/admin/login", {
      'email': admin.email,
      'password': admin.password
    });
  }

  getAdmins(token: string): Observable<object> {
    const headers = { 'Authorization': 'Bearer ' + token };
    return this.httpClient.get(localHost+"/admin/get-admins", { headers });
  }

  getCustomersData(token: string): Observable<object> {
    const headers = { 'Authorization': 'Bearer ' + token };
    return this.httpClient.get(localHost+"/admin/get-customers-data", { headers });
  }

  logout(token: string): Observable<object> {
    const headers = { 'Authorization': 'Bearer ' + token };
    return this.httpClient.delete(localHost+"/admin/logout", { headers });
  }

  forgotPassword(email: string): Observable<object> {
    console.log(email)
    return this.httpClient.post(localHost+"/admin/forgot-password", { 'email': email });
  }
}