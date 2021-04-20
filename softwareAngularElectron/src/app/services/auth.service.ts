import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Admin } from '../interfaces/admin.interface';
import { RegisterAdmin } from '../interfaces/register.interface';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  register(admin: RegisterAdmin): Observable<object> {
    return this.httpClient.post("https://api-radio-world.herokuapp.com/admin/register", {
      'firstname': admin.firstname,
      'lastname' : admin.lastname,
      'email' : admin.email,
      'createdBy' : admin.createdBy,
    });
  }

  login(admin: Admin): Observable<object> {
    return this.httpClient.post("https://api-radio-world.herokuapp.com/admin/login", {
      'email': admin.email,
      'password': admin.password
    });
  }

  logout(token: string): Observable<object> {
    const headers = { 'Authorization': 'Bearer ' + token };
    return this.httpClient.delete("https://api-radio-world.herokuapp.com/admin/logout", { headers });
  }

  forgotPassword(email: string): Observable<object> {
    console.log(email)
    return this.httpClient.post("https://api-radio-world.herokuapp.com/admin/forgot-password", { 'email': email });
  }
}