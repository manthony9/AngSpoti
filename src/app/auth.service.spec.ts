import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../environments/environment';

import { JwtHelperService } from '@auth0/angular-jwt';

const helper = new JwtHelperService();



@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}


}
