import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Login } from '../models/login.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService extends BaseService{
  public emailLogin: string;
  public claveLogin: string;

  constructor(private http: HttpClient) {
    super();
  }

  login(formData: Login)  {
    return this.http.post(this.urlLogin, formData);
  }
}
