import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environnement } from 'src/app/environnements/environnement';
import { CommandeResponse } from '../models/Commande/commande-response.module';

@Injectable({
  providedIn: 'root'
})
export class CommandeServiceService {
  private apiUrl = `${environnement.ApiUrl}/commandes`; // URL de base pour l'API
  private apiUrlV = `${environnement.ApiUrl}/lignes-commandes`
  constructor(private http:HttpClient) { }

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

   // Créer une commande
   createCommande(declarationId: number): Observable<CommandeResponse> {
    const headers = this.getAuthHeaders();
    return this.http.post<CommandeResponse>(this.apiUrl, { declaration_id: declarationId }, { headers });
  }
  

  // Obtenir les commandes d'un client
  getCommandes(): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get(this.apiUrl,{headers});
  }
  ///methode qui permet d'incrémentter la quantité
  incrementerQuantite(ligneCommandeId: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post(`${this.apiUrlV}/incrementer`, { ligne_commande_id: ligneCommandeId }, { headers });
  }

  // Décrémenter la quantité d'une ligne de commande
  decrementerQuantite(ligneCommandeId: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post(`${this.apiUrlV}/decrementer`, { ligne_commande_id: ligneCommandeId }, { headers });
  }
  supprimerLigneCommande(ligneCommandeId: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.delete(`${this.apiUrlV}/supprimer`, {
      body: { ligne_commande_id: ligneCommandeId }
    ,headers});
  }
}
