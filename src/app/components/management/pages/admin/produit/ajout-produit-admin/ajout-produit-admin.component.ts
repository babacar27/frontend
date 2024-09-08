import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Categorie } from 'src/app/core/models/categorie/categorie-reponse.module';
import { Produit } from 'src/app/core/models/produit/produit-reponse.module';
import { CategorieService } from 'src/app/core/services/categorie-service.service';
import { ProduitServiceService } from 'src/app/core/services/produit-service.service';

@Component({
  selector: 'app-ajout-produit-admin',
  templateUrl: './ajout-produit-admin.component.html',
  styleUrls: ['./ajout-produit-admin.component.css']
})
export class AjoutProduitAdminComponent implements OnInit {
  categories: Categorie[] = [];
  produitForm: FormGroup;
  produits: Produit[] = [];
  errorMessage: string | null = null; // Pour gérer les erreurs
  successMessage: string | null = null; // Pour gérer les messages de succès
  imagePreview: string | null = null; // Prévisualisation de l'image
  baseUrl: string = 'http://127.0.0.1:8000/storage/images/produits/';

  constructor(
    private produitService: ProduitServiceService,
    private categorieService: CategorieService,
    private fb: FormBuilder,private router: Router
  ) {
    this.produitForm = this.fb.group({
      nom: ['', Validators.required],
      libelle: ['', Validators.required],
      image: [null, Validators.required],
      categorie_id: ['', Validators.required],
      statut: ['publier']
    });
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  createProduit(formData: FormData): void {
    this.produitService.createProduits(formData).subscribe(
      response => {
        this.successMessage = 'Produit créé avec succès !';
        this.errorMessage = null;

        this.produitForm.reset({
          statut: 'publier'
        });

        this.imagePreview = null;
      },
      error => {
        console.error('Erreur lors de la création du produit:', error);
        this.errorMessage = 'Erreur lors de la création du produit.';
        this.successMessage = null;
      }
    );
  }

  onSubmit(): void {
    this.errorMessage = null;
    this.successMessage = null;

    if (this.produitForm.invalid) {
      this.errorMessage = 'Veuillez remplir correctement le formulaire.';
      return;
    }

    const formData = new FormData();
    formData.append('nom', this.produitForm.get('nom')?.value);
    formData.append('libelle', this.produitForm.get('libelle')?.value || '');
    formData.append('statut', this.produitForm.get('statut')?.value);
    formData.append('categorie_id', this.produitForm.get('categorie_id')?.value.toString());

    const image = this.produitForm.get('image')?.value;
    if (image) {
      formData.append('image', image);
    }

    this.createProduit(formData);
    this.router.navigate(['/ListeProduit']);
    this.getProduits();
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];

    if (file) {
      if (!file.type.startsWith('image/')) {
        this.errorMessage = 'Veuillez sélectionner un fichier image valide.';
        return;
      }

      this.produitForm.patchValue({
        image: file
      });
      this.produitForm.get('image')?.updateValueAndValidity();

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  loadCategories(): void {
    this.categorieService.getCategories().subscribe(
      response => {
        console.log('Réponse de l\'API:', response);
        this.categories = response;
      },
      error => {
        console.error('Erreur lors du chargement des catégories:', error);
        this.errorMessage = 'Erreur lors du chargement des catégories.';
      }
    );
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
}
