import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Categorie } from 'src/app/core/models/categorie/categorie-reponse.module';
import { CategorieService } from 'src/app/core/services/categorie-service.service';

@Component({
  selector: 'app-ajout-categorie',
  templateUrl: './ajout-categorie.component.html',
  styleUrls: ['./ajout-categorie.component.css']
})
export class AjoutCategorieComponent implements OnInit {

  categorieForm: FormGroup;
  categories: Categorie[] = [];
  errorMessage: string | null = null; // Pour gérer les erreurs
  successMessage: string | null = null; // Pour gérer les messages de succès

  constructor(private categorieService: CategorieService, private fb: FormBuilder) {
    this.categorieForm = this.fb.group({
      nomCategorie: ['', Validators.required],
      image: [null],
      statut: ['publie']
    });
  }

  ngOnInit(): void {
    // Chargement initial des catégories
    this.loadCategories();
  }

  // Fonction pour charger les catégories
  loadCategories(): void {
    this.categorieService.getCategories().subscribe(response => {
      console.log('Réponse de l\'API:', response); // Ajoutez un log pour voir la structure de la réponse
      this.categories = response; // Directement attribuer la réponse au tableau des catégories
    }, error => {
      console.error('Erreur lors du chargement des catégories:', error);
      this.errorMessage = 'Erreur lors du chargement des catégories.';
    });
  }

  // Fonction pour créer une nouvelle catégorie
  createCategorie(formData: FormData): void {
    this.categorieService.createCategorie(formData).subscribe(response => {
      this.successMessage = 'Catégorie créée avec succès !';
      this.categorieForm.reset({
        statut: 'publie' // Réinitialiser le formulaire avec la valeur par défaut
      });
      // Recharger la liste des catégories après création
      this.loadCategories();
    }, error => {
      console.error('Erreur lors de la création de la catégorie:', error);
      this.errorMessage = 'Erreur lors de la création de la catégorie.';
    });
  }

  // Fonction appelée lors de la soumission du formulaire
  onSubmit(): void {
    this.errorMessage = null; // Réinitialiser les messages d'erreur
    this.successMessage = null; // Réinitialiser les messages de succès

    if (this.categorieForm.invalid) {
      return; // Arrêtez le traitement si le formulaire est invalide
    }

    const formData = new FormData();
    formData.append('nomCategorie', this.categorieForm.get('nomCategorie')?.value);
    formData.append('statut', this.categorieForm.get('statut')?.value);

    const image = this.categorieForm.get('image')?.value;
    if (image) {
      formData.append('image', image);
    }

    // Créer la catégorie
    this.createCategorie(formData);
  }

  // Fonction pour gérer le changement de fichier
  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.categorieForm.patchValue({
        image: file
      });
      this.categorieForm.get('image')?.updateValueAndValidity();
    }
  }
}
