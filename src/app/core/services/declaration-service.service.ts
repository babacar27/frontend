import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environnement } from 'src/app/environnements/environnement';
import { Declaration, Produit } from '../models/declaration/declaration-reponse.module';
import { Router } from '@angular/router';
import { LigneCommande, LigneCommandeResponse } from '../models/LigneCommande/ligneCommande-response.module';

@Injectable({
  providedIn: 'root'
})
export class DeclarationServiceService {
  private apiUrl = `${environnement.ApiUrl}/declarations`; // Utilisez l'URL de base de votre API
  private apiUrlV = `${environnement.ApiUrl}`; // Utilisez l'URL de base de votre API
  private apiUrlVe = `${environnement.ApiUrl}/litProduits`;
  private apiUrlC = 'http://127.0.0.1:8000/api/lignes-commandes'; // URL de votre API


  constructor(private http: HttpClient ,private router :Router) { }

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
  // Méthode pour récupérer toutes les déclarations
  getDeclarations(): Observable<{ declarations: Declaration[] }> {
    return this.http.get<{ declarations: Declaration[] }>(this.apiUrl).pipe(
      catchError(error => {
        console.error('Erreur lors de la récupération des déclarations:', error);
        throw error;
      })
    );
  }

  redirectToLogin() {
    this.router.navigate(['/login']); // Redirection vers la page de connexion
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

  ajouterLigneCommande(declarationId: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post<any>(this.apiUrlC, { declaration_id: declarationId }, { headers });
  }
  ///Méthode pour récupérer les commandes de chaque client
  obtenirDeclarations(): Observable<LigneCommande[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<LigneCommande[]>(`${this.apiUrlC}/user`, { headers });
  }
   // Nouvelle méthode pour obtenir le nombre de lignes de commande par utilisateur
   obtenirNombreLignesParUtilisateur(): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get<any>(`${this.apiUrlV}/lignes-par-utilisateur`, { headers });
  }

  // Stocker l'ID de l'utilisateur lors de la connexion
  setUserId(userId: number): void {
    localStorage.setItem('userId', userId.toString());
  }

  // Récupérer l'ID de l'utilisateur
  getUserId(): number | null {
    const userId = localStorage.getItem('userId');
    return userId ? Number(userId) : null;
  }
}
