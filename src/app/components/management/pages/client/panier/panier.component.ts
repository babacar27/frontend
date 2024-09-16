import { Component, OnInit } from '@angular/core';
import { LigneCommande } from 'src/app/core/models/LigneCommande/ligneCommande-response.module';
import { CommandeServiceService } from 'src/app/core/services/commande-service.service';
import { DeclarationServiceService } from 'src/app/core/services/declaration-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit{
  declarations: LigneCommande[] = [];
  total: number = 0;
  ligne: any;
  constructor(private declarationService :DeclarationServiceService,private commandeService :CommandeServiceService){}
  ngOnInit(): void {
    this.getDeclarations();
  }
  getDeclarations(): void {
    this.declarationService.obtenirDeclarations().subscribe(response => {
      this.declarations = response; // Supposons que la réponse est directement un tableau de `LigneCommande`
      this.calculateTotal();
    });
  }

  calculateTotal(): void {
    this.total = this.declarations.reduce((sum, ligne) => sum + (ligne.prixUnitaire * ligne.quantite), 0);
  }
 // Fonction pour incrémenter la quantité d'une ligne de commande
 incrementerQuantite(ligneCommandeId: number): void {
  this.commandeService.incrementerQuantite(ligneCommandeId).subscribe(
    response => {
      // Traiter la réponse du serveur
      console.log(response.message);
      // Mettre à jour la quantité localement dans l'interface utilisateur si nécessaire
      const ligneCommande = this.declarations.find(l => l.id === ligneCommandeId);
      if (ligneCommande) {
        ligneCommande.quantite = response.quantite;
      }
    },
    error => {
      // Gérer les erreurs
      console.error('Erreur lors de l\'incrémentation de la quantité', error);
    }
  );
}
  // Méthode pour décrémenter la quantité
  decrementerQuantite(ligneCommandeId: number): void {
    this.commandeService.decrementerQuantite(ligneCommandeId).subscribe(
      response => {
        // Traiter la réponse du serveur
        console.log(response.message);
        // Mettre à jour la quantité localement dans l'interface utilisateur si nécessaire
        const ligneCommande = this.declarations.find(l => l.id === ligneCommandeId);
        if (ligneCommande) {
          ligneCommande.quantite = response.quantite;
        }
      },
      error => {
        // Gérer les erreurs
        console.error('Erreur lors de la décrémentation de la quantité', error);
      }
    );
  }
// Méthode pour supprimer une ligne de commande
supprimerLigne(ligneCommandeId: number): void {
  Swal.fire({
    title: 'Êtes-vous sûr?',
    text: 'Cette action supprimera la ligne de commande',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Oui, supprimer!',
    cancelButtonText: 'Annuler'
  }).then((result) => {
    if (result.isConfirmed) {
      this.commandeService.supprimerLigneCommande(ligneCommandeId).subscribe(() => {
        this.declarations = this.declarations.filter(ligne => ligne.id !== ligneCommandeId);
        this.calculateTotal(); // Recalculer le total après suppression
        Swal.fire('Supprimé!', 'La ligne de commande a été supprimée.', 'success');
      }, error => {
        console.error('Erreur lors de la suppression de la ligne de commande', error);
        Swal.fire('Erreur!', 'La suppression a échoué.', 'error');
      });
    }
  });
}
}
