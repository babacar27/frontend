import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { AuthResponse, UserData } from '../models/auth/auth-reponse.module';
import { environnement } from '../../environnements/environnement';


@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private apiUrl = `${environnement.ApiUrl}/user`;
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

  getUsers(): Observable<{statut: number, data: UserData[]}> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<{statut: number, data: UserData[]}>(`${environnement.ApiUrl}/users`, { headers });
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

// Récupère les informations du vendeur connecté
getVendeur(): any {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null; // Assurez-vous que les informations du vendeur incluent un champ 'id'
}
private getAuthHeaders(): HttpHeaders {
  const token = localStorage.getItem('token');
  if (token) {
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  } else {
    throw new Error('Token non disponible');
  }
}

updateUserStatus(id: number, statut: string): Observable<any> {
  const headers = this.getAuthHeaders();
  return this.http.patch(`${this.apiUrl}/${id}/status`, { statut }, { headers });
}

deleteUser(id: number): Observable<void> {
  const headers = this.getAuthHeaders();
  return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
}

updateUser(id: number, userData: Partial<UserData>): Observable<any> {
  const headers = this.getAuthHeaders();
  return this.http.put<any>(`${this.apiUrl}/${id}`, userData, { headers });
}
}
