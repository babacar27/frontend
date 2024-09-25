import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ReglementResponse } from '../models/reglement/reglement-response.module';

@Injectable({
  providedIn: 'root'
})
export class ReglementService {
  private apiUrl = 'http://127.0.0.1:8000/api/store-payment'; // URL de l'API Laravel

  constructor(private http: HttpClient) {}

  // Récupérer les headers avec le token d'authentification
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

  // Méthode pour enregistrer le paiement
  createReglement(data: FormData): Observable<ReglementResponse> {
    const headers = this.getAuthHeaders();
    return this.http.post<ReglementResponse>(this.apiUrl, data, { headers }).pipe(
      catchError(error => {
        console.error('Erreur lors de la création du paiement:', error);
        return throwError(error);
      })
    );
  }
}
