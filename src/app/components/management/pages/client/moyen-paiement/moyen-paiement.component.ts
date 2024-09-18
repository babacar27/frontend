import { Component, OnInit } from '@angular/core';
import { LigneCommande } from 'src/app/core/models/LigneCommande/ligneCommande-response.module';
import { CommandeServiceService } from 'src/app/core/services/commande-service.service';
import { DeclarationServiceService } from 'src/app/core/services/declaration-service.service';

@Component({
  selector: 'app-moyen-paiement',
  templateUrl: './moyen-paiement.component.html',
  styleUrls: ['./moyen-paiement.component.css']
})
export class MoyenPaiementComponent implements OnInit{
  declarations: LigneCommande[] = [];
  total: number = 0;
  ligne: any;
  fraisLivraison: number = 2000; // Montant forfaitaire pour la livraison
  fraisDeLivraisonActive: boolean = false; // État de la case à cocher
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
  // Mettre à jour le total général avec ou sans frais de livraison
  getTotalGeneral(): number {
    if (this.fraisDeLivraisonActive) {
      return this.total + this.fraisLivraison;
    }
    return this.total;
  }

  // Activer ou désactiver les frais de livraison
  toggleFraisDeLivraison(event: any): void {
    this.fraisDeLivraisonActive = event.target.checked;
  }
}
