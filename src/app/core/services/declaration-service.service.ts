import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environnement } from 'src/app/environnements/environnement';
import { Declaration, Produit } from '../models/declaration/declaration-reponse.module';

@Injectable({
  providedIn: 'root'
})
export class DeclarationServiceService {
  private apiUrl = `${environnement.ApiUrl}/declarations`; // Utilisez l'URL de base de votre API
  private apiUrlV = `${environnement.ApiUrl}`; // Utilisez l'URL de base de votre API
  private apiUrlVe = `${environnement.ApiUrl}/litProduits`;

  constructor(private http: HttpClient) { }

  // Vérifier si l'utilisateur est authentifié (si un token est présent)
  isAuth(): boolean {
    const token = localStorage.getItem('token');
    return !!token; // retourne true si un token est présent
  }

  // Ajouter le token aux en-têtes de la requête
  private getAuthHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    const token = localStorage.getItem('token');
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  // Méthode pour créer ou mettre à jour une déclaration
  createOrUpdateDeclaration(declaration: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post<any>(this.apiUrl, declaration, { headers }).pipe(
      catchError(error => {
        console.error('Erreur lors de la création ou mise à jour de la déclaration', error);
        return throwError(error);
      })
    );
  }
  // Méthode pour récupérer les déclarations d'un produit spécifique
  getDeclarationsByProduit(id: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get<any>(`${this.apiUrl}/produits/${id}`, { headers }).pipe(
      catchError(error => {
        console.error('Erreur lors de la récupération des déclarations pour le produit', error);
        return throwError(error);
      })
    );
  }

  // Méthode pour récupérer les déclarations d'un vendeur spécifique
  getDeclarationsByVendeur(vendeurId: number): Observable<Declaration[]> {
    const headers = this.getAuthHeaders();

    return this.http.get<{ declarations: Declaration[] }>(`${this.apiUrlV}/vendeurs/${vendeurId}/declarations`, { headers })
      .pipe(
        map((response: { declarations: Declaration[] }) => response.declarations), // Ajoutez un typage explicite pour 'response'
        catchError(error => {
          console.error('Erreur lors de la récupération des déclarations pour le vendeur', error);
          return throwError(error);
        })
      );
  }

  updateStatut(vendeurId: number, declarationId: number, nouveauStatut: string): Observable<Declaration> {
    const headers = this.getAuthHeaders();
    return this.http.put<Declaration>(`${this.apiUrlV}/vendeurs/${vendeurId}/declarations/${declarationId}/statut`, { statut: nouveauStatut }, { headers }).pipe(
      catchError(error => {
        console.error('Erreur lors de la mise à jour du statut', error);
        return throwError(error);
      })
    );
  }



  // Méthode pour récupérer une déclaration spécifique par ID
  getDeclarationById(id: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get<any>(`${this.apiUrl}/${id}`, { headers }).pipe(
      catchError(error => {
        console.error('Erreur lors de la récupération de la déclaration par ID', error);
        return throwError(error);
      })
    );
  }
  getProduitsV(): Observable<Produit> {
    const headers = this.getAuthHeaders();
    return this.http.get<Produit>(this.apiUrlVe, { headers });
  }

}
