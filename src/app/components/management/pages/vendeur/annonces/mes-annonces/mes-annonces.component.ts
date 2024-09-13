import { Component, OnInit } from '@angular/core';
import { DeclarationServiceService } from 'src/app/core/services/declaration-service.service';
import { AuthServiceService } from 'src/app/core/services/auth-service.service';
import { AuthResponse } from 'src/app/core/models/auth/auth-reponse.module';
import { Declaration } from '../../../../../../core/models/declaration/declaration-reponse.module';

@Component({
  selector: 'app-mes-annonces',
  templateUrl: './mes-annonces.component.html',
  styleUrls: ['./mes-annonces.component.css']
})
export class MesAnnoncesComponent implements OnInit {
  declarations: Declaration[] = [];
  vendeurId: number | null = null;
  errorMessage: string | null = null;

  constructor(
    private declarationService: DeclarationServiceService,
    private authService: AuthServiceService
  ) {}

  ngOnInit(): void {
    this.setVendeurId();
  }

  setVendeurId(): void {
    this.authService.getUserInfo().subscribe({
      next: (response: AuthResponse) => {
        if (response && response.id) {
          this.vendeurId = response.id;
          this.getAnnonces();
        } else {
          console.error('ID du vendeur non trouvé');
        }
      },
      error: err => {
        console.error('Erreur lors de la récupération des informations du vendeur', err);
      }
    });
  }

  getAnnonces(): void {
    if (this.vendeurId) {
      this.declarationService.getDeclarationsByVendeur(this.vendeurId).subscribe({
        next: (data:Declaration[]) => {
          this.declarations = data;
          console.log('Déclarations récupérées :', this.declarations);
        },
        error: err => {
          console.error('Erreur lors de la récupération des annonces', err);
          this.errorMessage = 'Erreur lors de la récupération des annonces.';
        }
      });
    }
  }

  changerStatut(declaration: Declaration, nouveauStatut: string): void {
    // Assurez-vous que vendeurId n'est pas null avant de l'utiliser
    if (this.vendeurId != null) {
      // Met à jour localement le statut de la déclaration
      declaration.statut = nouveauStatut;

      // Envoyer une requête à l'API pour sauvegarder le changement de statut
      this.declarationService.updateStatut(this.vendeurId, declaration.id, nouveauStatut).subscribe({
        next: (response: Declaration) => {
          console.log('Statut de la déclaration mis à jour avec succès', response);
        },
        error: (err) => {
          console.error('Erreur lors de la mise à jour du statut de la déclaration', err);
        }
      });
    } else {
      console.error('Vendeur ID est nul');
    }
  }

  }





