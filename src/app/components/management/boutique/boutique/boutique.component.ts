import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Declaration } from 'src/app/core/models/declaration/declaration-reponse.module';
import { DeclarationServiceService } from 'src/app/core/services/declaration-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-boutique',
  templateUrl: './boutique.component.html',
  styleUrls: ['./boutique.component.css']
})
export class BoutiqueComponent implements OnInit{
  declarations: any[] = [];

  constructor(private declarationService :DeclarationServiceService,private router:Router){}

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
   
   // Fonction appelée lorsque l'utilisateur clique sur "Ajouter au panier"
   addToCart() {
    if (!this.declarationService.isAuth()) {
      // Utilisation de SweetAlert2 pour demander à l'utilisateur de se connecter
      Swal.fire({
        icon: 'warning',
        title: 'Non connecté',
        text: 'Veuillez vous connecter pour ajouter cet article au panier.',
        confirmButtonText: 'Se connecter',
        confirmButtonColor: '#3085d6',
        showCancelButton: true,
        cancelButtonText: 'Annuler'
      }).then((result) => {
        if (result.isConfirmed) {
          this.declarationService.redirectToLogin(); // Redirige vers la page de connexion
        }
      });
    } else {
      // Logique pour ajouter l'article au panier
      console.log('Article ajouté au panier');
      Swal.fire({
        icon: 'success',
        title: 'Ajouté au panier',
        text: 'L\'article a été ajouté à votre panier avec succès.'
      });
    }
  }
  
   // Rediriger vers la page de connexion
  
}
