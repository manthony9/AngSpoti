import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../src/app/User';
import { RegisterUser } from '../src/app/RegisterUser';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { environment } from './environments/environment';
const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  getToken(): string {
    return localStorage.getItem('access_token');
  }

  readToken(): User {
    const token = localStorage.getItem('access_token');
    return helper.decodeToken(token);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token');
    if (token) {
      console.log('token exists');
      return true;
    } else {
      console.log('no token');
      return false;
    }
  }

  login(user): Observable<any> {
    return this.http.post<any>('http://localhost:8080/api/login', user);
  }

  logout() {
    localStorage.removeItem('token');
  }

  register(registerUser): Observable<any> {
    return this.http.post<any>(environment.userAPIBase, registerUser);
  }
}
