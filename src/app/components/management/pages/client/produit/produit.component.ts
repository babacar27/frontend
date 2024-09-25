import { Component, OnInit } from '@angular/core';
import { CommandeServiceService } from 'src/app/core/services/commande-service.service';
import { DeclarationServiceService } from 'src/app/core/services/declaration-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.css']
})
export class ProduitComponent implements OnInit{

  declarations: any[] = [];
  constructor(private declarationService :DeclarationServiceService,private commandeService :CommandeServiceService){}
  ngOnInit(): void {
     this.loadDeclarations();
  }
  loadDeclarations(): void {
    this.declarationService.getDeclarations().subscribe(
      response => {
        console.log('Déclarations récupérées:', response);
        this.declarations = response.declarations;
        this.declarations.forEach(declaration => {
          console.log('Catégorie:', declaration.produit.categorie);
        });
      },
      error => {
        console.error('Erreur lors de la récupération des déclarations:', error);
      }
    );
  }

  addToCart(declarationId: number): void {
    this.commandeService.createCommande(declarationId).subscribe(response => {
      // Afficher une alerte SweetAlert2
      Swal.fire({
        title: 'Succès!',
        text: 'Produit ajouté au panier!',
        icon: 'success',
        confirmButtonText: 'OK'
      });

      // Optionnel : Rediriger vers une page de confirmation ou mettre à jour l'affichage
    }, error => {
      // Afficher une alerte SweetAlert2 en cas d'erreur
      Swal.fire({
        title: 'Erreur!',
        text: 'Erreur lors de la création de la commande',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      console.error('Erreur lors de la création de la commande', error);
    });
  }


}
