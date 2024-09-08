import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environnement } from 'src/app/environnements/environnement';
import { Produit, ProduitResponse } from '../models/produit/produit-reponse.module';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProduitServiceService {
  private apiUrl = `${environnement.ApiUrl}/produits`; // URL de base pour l'API
  private apiUrlV = `${environnement.ApiUrl}/litProduits`;
  private baseUrl = 'http://127.0.0.1:8000/storage/images/produits/';
  constructor(private http:HttpClient) {}


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

  ///Api produits
  ///Api pour la création d'un produit*
  createProduits(data: FormData): Observable<ProduitResponse> {
    const headers = this.getAuthHeaders();
    return this.http.post<ProduitResponse>(this.apiUrl, data, { headers });
  }
  ///Api récupération des produits 
  getProduits(): Observable<Produit[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<Produit[]>(this.apiUrl, { headers });
  }
  getProduitsV(): Observable<Produit[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<Produit[]>(this.apiUrlV, { headers });
  }
  archiverProduit(id: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.put(`${this.baseUrl}/${id}/archiver`, {headers});
  }

  // Publie un produit
  publierProduit(id: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.put(`${this.baseUrl}${id}/publier`, {headers});
  }
}
