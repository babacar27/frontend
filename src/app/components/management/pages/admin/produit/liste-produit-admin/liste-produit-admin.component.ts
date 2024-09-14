import { Component, OnInit } from '@angular/core';
import { Produit } from 'src/app/core/models/produit/produit-reponse.module';
import { ProduitServiceService } from 'src/app/core/services/produit-service.service';

@Component({
  selector: 'app-liste-produit-admin',
  templateUrl: './liste-produit-admin.component.html',
  styleUrls: ['./liste-produit-admin.component.css']
})
export class ListeProduitAdminComponent implements OnInit {
  produits: Produit[] = [];
  serverUrl = 'http://127.0.0.1:8000/storage/images/produits/';
  errorMessage: string | null = null; // Pour gérer les erreurs
  successMessage: string | null = null; // Pour gérer les messages de succès
  constructor(private produitService: ProduitServiceService){}
  ngOnInit(): void {
    this.getProduits();
  }
  getProduits(): void {
    this.produitService.getProduits().subscribe({
      next: (data: Produit[]) => {
        this.produits = data;  // Assigne simplement les données récupérées à la variable `produits`
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des produits', err);
      }
    });
  }

  archiverProduit(id: number): void {
    this.produitService.archiverProduit(id).subscribe({
      next: (response) => {
        console.log('Produit archivé', response);
        this.getProduits(); // Recharger les produits après l'archivage
      },
      error: (err) => {
        console.error('Erreur lors de l\'archivage du produit', err);
      }
    });
  }

  publierProduit(id: number): void {
    this.produitService.publierProduit(id).subscribe({
      next: (response) => {
        console.log('Produit publié', response);
        this.getProduits(); // Recharger les produits après la publication
      },
      error: (err) => {
        console.error('Erreur lors de la publication du produit', err);
      }
    });
  }
  loadProduits(): void {
    this.produitService.getProduits().subscribe(response => {
      console.log('Réponse de l\'API:', response);
      this.produits = response;
    }, error => {
      console.error('Erreur lors du chargement des catégories:', error);
      this.errorMessage = 'Erreur lors du chargement des catégories.';
    });
  }


  updateCategorieStatus(id: number, statut: string): void {
    this.produitService.updateProduitStatus(id, statut).subscribe(() => {
      this.successMessage = `Produit ${statut === 'publier' ? 'publiée' : 'archiver'} avec succès !`;
      this.errorMessage = null;
      this.loadProduits();
    }, error => {
      console.error('Erreur lors de la mise à jour du statut de la catégorie:', error);
      this.errorMessage = 'Erreur lors de la mise à jour du statut de la catégorie.';
      this.successMessage = null;
    });
  }



  deleteProduit(id: number): void {
    if (confirm('Voulez-vous vraiment supprimer cette produit ?')) {
      this.produitService.deleteProduit(id).subscribe(
        (response) => {
          this.successMessage = 'produit supprimée avec succès !';
          this.loadProduits(); // Recharge la liste des catégories après suppression
        },
        (error) => {
          console.error('Erreur lors de la suppression de la produit', error);
          this.errorMessage = 'Erreur lors de la suppression de la produit.';
        }
      );
    }
  }


}
