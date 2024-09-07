import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { AuthResponse } from '../models/auth/auth-reponse.module';
import { environnement } from '../../environnements/environnement';


@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
redirctUrl: string='/login';
  isAuth (): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      return true;
    }
    return false;
  }

  constructor(private http :HttpClient) {}

  login(request: any): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      `${environnement.ApiUrl}/login`,
      request
    );
  }

  getUserInfo(): Observable<AuthResponse> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<AuthResponse>(`${environnement.ApiUrl}/user`, { headers });
  }


  register(request: any): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      `${environnement.ApiUrl}/register`,
      request
    );
  }
  private handleError(error: HttpErrorResponse) {
    return throwError(error);
  }
  logout(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post<any>(
      `${environnement.ApiUrl}/logout`,
      {},
      { headers }
    );
  }


  sendResetLink(data: { email: string }): Observable<any> {
    return this.http.post<any>
    (`${environnement.ApiUrl}/password/email`,
       data);
  }
  resetPassword(data:{ email: string; password: string; password_confirmation: string; token: string }): Observable<any> {
    return this.http.post<any>
    (`${environnement.ApiUrl}/password/reset`,
       data);
  }

  forgotPassword(email: { email: string }): Observable<any> {
    return this.http.post<any>
    (`${environnement.ApiUrl}/password/email`,
       email);
  }


}
