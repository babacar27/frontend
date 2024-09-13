import { Component, OnInit } from '@angular/core';
import { Produit } from 'src/app/core/models/produit/produit-reponse.module';
import { ProduitServiceService } from 'src/app/core/services/produit-service.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit{
  produits: Produit[] = [];
constructor(private produitService :ProduitServiceService){}

  ngOnInit(): void {
    this.loadProduits();
  }

  loadProduits(): void {
    this.produitService.getProduitsV().subscribe({
      next: (data: Produit[]) => {
        this.produits = data;  // Assigne simplement les données récupérées à la variable `produits`
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des produits', err);
      }
    });

}
}
