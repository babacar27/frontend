import { Component, OnInit } from '@angular/core';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { LigneCommande } from 'src/app/core/models/LigneCommande/ligneCommande-response.module';
import { DeclarationServiceService } from 'src/app/core/services/declaration-service.service';
import { AuthServiceService } from 'src/app/core/services/auth-service.service';
import { ReglementService } from 'src/app/core/services/reglement.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthResponse } from 'src/app/core/models/auth/auth-reponse.module';
import { CommandeServiceService } from 'src/app/core/services/commande-service.service';
import { Commande } from 'src/app/core/models/Commande/commande-response.module';

@Component({
  selector: 'app-moyen-paiement',
  templateUrl: './moyen-paiement.component.html',
  styleUrls: ['./moyen-paiement.component.css']
})
export class MoyenPaiementComponent implements OnInit {
  declarations: LigneCommande[] = [];
  total: number = 0;
  fraisLivraison: number = 2000;
  fraisDeLivraisonActive: boolean = false;
  selectedPaymentMethod: string = '';
  stripe: Stripe | null = null;
  clientEmail: string = '';
  clientName: string = '';
  userId: number | null = null;
  commandeId: number | null = null;
  commande: Commande | null = null;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(
    private declarationService: DeclarationServiceService,
    private authService: AuthServiceService,
    private reglementService: ReglementService,
    private commandeService: CommandeServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    this.stripe = await loadStripe('pk_test_51Q08WuP22xndwjnHfCbziHhKObu9uhpbFzRM5PZQQuTAtz5LBPkS3uqK1UkW97iG1jebzhPKnsIr8cotYFG5e5mm00B9FZwpFC');
    this.setClientId();
    this.getDeclarations();

    // Récupérer commandeId depuis les paramètres de route
    this.commandeId = 1

    if (this.commandeId) {
      await this.getCommande(); // Récupérer la commande ici seulement si commandeId est valide
    }
  }

  private setClientId(): void {
    this.authService.getUserInfo().subscribe({
      next: (response: AuthResponse) => {
        if (response && response.id) {
          this.clientEmail = response.email;
          this.clientName = response.name;
          this.userId = response.id;
        } else {
          this.handleError('ID du client non trouvé');
        }
      },
      error: err => {
        this.handleError('Erreur lors de la récupération des informations du client', err);
      }
    });
  }

  private getDeclarations(): void {
    this.declarationService.obtenirDeclarations().subscribe(response => {
      this.declarations = response;
      this.calculateTotal();
    }, error => {
      this.handleError('Erreur lors de la récupération des déclarations', error);
    });
  }

  private getCommande(): void {
    if (this.commandeId) {
      this.commandeService.getCommandeById(this.commandeId).subscribe(
        response => {
          this.commande = response;
          console.log('Commande récupérée:', this.commande); // Affichage de la commande
        },
        error => {
          this.handleError('Erreur lors de la récupération de la commande:', error);
        }
      );
    } else {
      this.handleError('commandeId non défini.');
    }
  }

  private calculateTotal(): void {
    this.total = this.declarations.reduce((sum, ligne) => sum + (ligne.prixUnitaire * ligne.quantite), 0);
  }

  getTotalGeneral(): number {
    return this.fraisDeLivraisonActive ? this.total + this.fraisLivraison : this.total;
  }

  toggleFraisDeLivraison(event: any): void {
    this.fraisDeLivraisonActive = event.target.checked;
  }

  async processOrder(): Promise<void> {
    const totalAmount = this.getTotalGeneral();

    if (this.selectedPaymentMethod === 'carte') {
      this.savePayment(totalAmount, 'en_attente');

      try {
        const response = await this.commandeService.createCheckoutSession(totalAmount, this.clientEmail, this.clientName).toPromise();
        const sessionId = response.sessionId;

        if (this.stripe) {
          const result = await this.stripe.redirectToCheckout({ sessionId });
          if (result.error) {
            this.handleError('Erreur lors du redirectionnement:', result.error.message);
            this.router.navigate(['/payment-cancel']);
          }
        }
      } catch (err) {
        this.handleError('Erreur lors de la création de la session Stripe Checkout:', err);
      }
    } else if (this.selectedPaymentMethod === 'espece') {
      this.savePayment(totalAmount, 'validé');
    } else {
      alert('Veuillez sélectionner un mode de paiement.');
    }
  }

  private savePayment(totalAmount: number, statut: string): void {
    if (this.userId === null) {
      this.handleError('ID de l\'utilisateur non trouvé');
      return;
    }

    const paymentData = new FormData();
    paymentData.append('methode_paiement', this.selectedPaymentMethod);
    paymentData.append('type_paiement', 'plein');
    paymentData.append('montant', totalAmount.toString());
    paymentData.append('statut', statut);
    paymentData.append('user_id', this.userId.toString());

    // Ensure commande is available and use its commande_id
    if (this.commande) {
      const commandeId = this.commande.id; // Use commande.id to send
      if (commandeId) {
        paymentData.append('commande_id', commandeId.toString()); // Use commande_id
      } else {
        this.handleError('Commande non trouvée pour le paiement, commande_id manquant.');
      }
    } else {
      this.handleError('Commande non trouvée pour le paiement.');
    }

    this.reglementService.createReglement(paymentData).subscribe(
      response => {
        this.successMessage = 'Paiement enregistré avec succès !';
      },
      error => {
        this.handleError('Erreur lors de l\'enregistrement du paiement:', error);
      }
    );
  }

  selectPaymentMethod(event: any): void {
    this.selectedPaymentMethod = event.target.value;
  }

  private handleError(message: string, error?: any): void {
    console.error(message, error);
    this.errorMessage = message; // Afficher l'erreur à l'utilisateur si nécessaire
  }
}
