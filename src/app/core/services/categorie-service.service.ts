import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environnement } from 'src/app/environnements/environnement'; // Assurez-vous que le chemin est correct
import { Categorie, CategorieListResponse, CategorieResponse } from '../models/categorie/categorie-reponse.module'; // Assurez-vous que le chemin est correct

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  private apiUrl = `${environnement.ApiUrl}/categories`; // URL de base pour l'API

  constructor(private http: HttpClient) { }

  // Vérifier si l'utilisateur est authentifié (si un token est présent)
  isAuth(): boolean {
    const token = localStorage.getItem('token');
    return !!token; // retourne true si un token est présent
  }

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

  // Liste toutes les catégories
  getCategories(): Observable<Categorie[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<Categorie[]>(this.apiUrl, { headers });
  }

  // Affiche une catégorie spécifique
  getCategorie(id: number): Observable<Categorie> {
    const headers = this.getAuthHeaders();
    return this.http.get<Categorie>(`${this.apiUrl}/${id}`, { headers });
  }

  // Crée une nouvelle catégorie (avec données et headers)
  createCategorie(data: FormData): Observable<CategorieResponse> {
    const headers = this.getAuthHeaders();
    return this.http.post<CategorieResponse>(this.apiUrl, data, { headers });
  }

  // Met à jour une catégorie spécifique
  updateCategorie(id: number, data: { nomCategorie?: string; image?: File; statut?: string }): Observable<CategorieResponse> {
    const formData = new FormData();
    if (data.nomCategorie) {
      formData.append('nomCategorie', data.nomCategorie);
    }
    if (data.image) {
      formData.append('image', data.image);
    }
    if (data.statut) {
      formData.append('statut', data.statut);
    }

    const headers = this.getAuthHeaders();
    return this.http.put<CategorieResponse>(`${this.apiUrl}/${id}`, formData, { headers });
  }

  // Supprime une catégorie spécifique
  deleteCategorie(id: number): Observable<void> {
    const headers = this.getAuthHeaders();
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
  }
}
