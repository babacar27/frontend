import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environnement } from 'src/app/environnements/environnement';
import { Commande, CommandeResponse } from '../models/Commande/commande-response.module';
import { Declaration } from '../models/declaration/declaration-reponse.module';
import { LigneCommande } from '../models/LigneCommande/ligneCommande-response.module';

@Injectable({
  providedIn: 'root'
})
export class CommandeServiceService {
  private apiUrl = `${environnement.ApiUrl}/commandes`; // URL de base pour l'API
  private apiUrlV = `${environnement.ApiUrl}/lignes-commandes`;
  private apiUrlPa = 'http://localhost:8000/api'; // Votre URL d'API
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


// Assuming you have a service like this
createPaymentIntent(amount: number, clientEmail: string): Observable<any> {
  return this.http.post<any>(`${this.apiUrlPa}/create-payment-intent`, { amount, clientEmail });
}
createCheckoutSession(totalAmount: number, email: string,name:string): Observable<any> {
  const requestBody = {
    totalAmount: totalAmount,
    email: email,
    name: name,
  };
  return this.http.post(`${this.apiUrlPa}/create-checkout-session`, requestBody);
}


// Ajoutez cette méthode à votre service CommandeServiceService
getCommandeById(commandeId: number): Observable<any> {
  const headers = this.getAuthHeaders();
  return this.http.get<any>(`${this.apiUrl}/${commandeId}`, { headers })
    .pipe(catchError(this.handleError));
}
  // Gérer les erreurs
  private handleError(error: any): Observable<never> {
    console.error('Une erreur s\'est produite:', error); // Log l'erreur
    return throwError(error); // Rejette l'erreur pour qu'elle puisse être traitée ailleurs
  }

   // Dans le service CommandeServiceService

 // Méthode pour récupérer les commandes validées d'un vendeur
 getCommandesValideesParVendeur(): Observable<Commande[]> {
  const headers = this.getAuthHeaders();
  return this.http.get<Commande[]>(`${this.apiUrlPa}/commandes-par-vendeur`, { headers })
    .pipe(
      catchError(this.handleError)
    );
}

// Obtenir le total des commandes validées
getTotalCommandesValidees(): Observable<CommandeResponse> {
  const headers = this.getAuthHeaders();
  return this.http.get<CommandeResponse>(`${this.apiUrlPa}/total-commandes-validees`, { headers })
    .pipe(catchError(this.handleError));
}


// Obtenir le total des annonces par vendeur
getTotalAnnoncesParVendeur(): Observable<Declaration> {
  const headers = this.getAuthHeaders();
  return this.http.get<any>(`${this.apiUrlPa}/total-annonces-par-vendeur`, { headers })
    .pipe(catchError(this.handleError));
}

// Obtenir le total des annonces par catégorie
getTotalAnnoncesParCategorie(): Observable<Declaration[]> {
  const headers = this.getAuthHeaders();
  return this.http.get<any>(`${this.apiUrlPa}/total-annonces-par-categorie`, { headers })
    .pipe(catchError(this.handleError));
}

// Obtenir le total des lignes de commandes par catégorie
getTotalLignesCommandesParCategorie(): Observable<LigneCommande[]> {
  const headers = this.getAuthHeaders();
  return this.http.get<any>(`${this.apiUrlPa}/total-lignes-commandes-par-categorie`, { headers })
    .pipe(catchError(this.handleError));
}

// Obtenir le total des commandes journalières
getTotalCommandesJournalieres(): Observable<Commande[]> {
  const headers = this.getAuthHeaders();
  return this.http.get<any>(`${this.apiUrlPa}/total-commandes-journalieres`, { headers })
    .pipe(catchError(this.handleError));
}

// Obtenir le montant total des commandes
getMontantTotalCommandes(): Observable<CommandeResponse> {
  const headers = this.getAuthHeaders();
  return this.http.get<any>(`${this.apiUrlPa}/montant-total-commandes`, { headers })
    .pipe(catchError(this.handleError));
}

}
