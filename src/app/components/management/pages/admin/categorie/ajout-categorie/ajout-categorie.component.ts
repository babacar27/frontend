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
  imagePreview: string | null = null; // Prévisualisation de l'image
  baseUrl: string = 'http://127.0.0.1:8000/storage/images/categories/'; // Base URL pour les images
  selectedCategorie: Categorie | null = null;
  isEditMode: boolean = false;
  editCategorieId: number | null = null; // Stocke l'ID de la catégorie à modifier

  constructor(private categorieService: CategorieService, private fb: FormBuilder) {
    this.categorieForm = this.fb.group({
      nomCategorie: ['', Validators.required],
      image: [null, Validators.required],
      statut: ['publie']
    });
  }

  ngOnInit(): void {
    this.loadCategories();
     // Vérifiez si vous avez un ID de catégorie à modifier (par exemple, à partir des paramètres de la route)
  if (this.editCategorieId) {
    this.loadCategorieToEdit(this.editCategorieId);
  }
  }
  loadCategorieToEdit(id: number): void {
    this.categorieService.getCategorie(id).subscribe(categorie => {
      this.selectedCategorie = categorie;
      this.isEditMode = true;
      this.categorieForm.patchValue({
        nomCategorie: categorie.nomCategorie,
        statut: categorie.statut
        // Ne pas inclure `image` ici car il s'agit d'un fichier, vous devrez le gérer différemment
      });
      this.imagePreview = this.getImageUrl(categorie.image);
    }, error => {
      console.error('Erreur lors du chargement des détails de la catégorie:', error);
      this.errorMessage = 'Erreur lors du chargement des détails de la catégorie.';
    });
  }


  loadCategories(): void {
    this.categorieService.getCategories().subscribe(response => {
      console.log('Réponse de l\'API:', response);
      this.categories = response;
    }, error => {
      console.error('Erreur lors du chargement des catégories:', error);
      this.errorMessage = 'Erreur lors du chargement des catégories.';
    });
  }

  createCategorie(formData: FormData): void {
    this.categorieService.createCategorie(formData).subscribe(response => {
      this.successMessage = 'Catégorie créée avec succès !';
      this.errorMessage = null;

      this.categorieForm.reset({
        statut: 'publie'
      });

      this.imagePreview = null;
      this.loadCategories();
    }, error => {
      console.error('Erreur lors de la création de la catégorie:', error);
      this.errorMessage = 'Erreur lors de la création de la catégorie.';
      this.successMessage = null;
    });
  }

  onSubmit(): void {
    this.errorMessage = null;
    this.successMessage = null;

    if (this.categorieForm.invalid) {
      return;
    }

    const formData = new FormData();
    formData.append('nomCategorie', this.categorieForm.get('nomCategorie')?.value);
    formData.append('statut', this.categorieForm.get('statut')?.value);

    const image = this.categorieForm.get('image')?.value;
    if (image) {
      formData.append('image', image);
    }

    if (this.isEditMode && this.editCategorieId !== null) {
      // Mettre à jour une catégorie existante
      this.categorieService.updateCategorie(this.editCategorieId, {
        nomCategorie: this.categorieForm.get('nomCategorie')?.value,
        statut: this.categorieForm.get('statut')?.value,
        image: this.categorieForm.get('image')?.value
      }).subscribe(response => {
        this.successMessage = 'Catégorie modifiée avec succès !';
        this.isEditMode = false;
        this.editCategorieId = null;
        this.categorieForm.reset({ statut: 'publie' });
        this.imagePreview = null;
        this.loadCategories();
      }, error => {
        console.error('Erreur lors de la modification de la catégorie:', error);
        this.errorMessage = 'Erreur lors de la modification de la catégorie.';
      });
    } else {
      // Créer une nouvelle catégorie
      this.createCategorie(formData);
    }
  }

  editCategorie(categorie: Categorie): void {
    this.editCategorieId = categorie.id;
    this.loadCategorieToEdit(categorie.id);
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];

    if (file) {
      if (!file.type.startsWith('image/')) {
        this.errorMessage = 'Veuillez sélectionner un fichier image valide.';
        return;
      }

      this.categorieForm.patchValue({
        image: file
      });
      this.categorieForm.get('image')?.updateValueAndValidity();

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  getImageUrl(imagePath: string | null): string {
    if (!imagePath) {
      console.warn('Aucun chemin d\'image fourni, retour à l\'image par défaut.');
      return 'assets/default-image.jpg'; // Chemin d'accès à l'image par défaut
    }
    const fullUrl = `${this.baseUrl}${imagePath}`;
    console.log('URL générée pour l\'image:', fullUrl);
    return fullUrl;
  }

  deleteCategorie(id: number): void {
    if (confirm('Voulez-vous vraiment supprimer cette catégorie ?')) {
      this.categorieService.deleteCategorie(id).subscribe(
        (response) => {
          this.successMessage = 'Catégorie supprimée avec succès !';
          this.loadCategories(); // Recharge la liste des catégories après suppression
        },
        (error) => {
          console.error('Erreur lors de la suppression de la catégorie', error);
          this.errorMessage = 'Erreur lors de la suppression de la catégorie.';
        }
      );
    }
  }


  updateCategorieStatus(id: number, statut: string): void {
    this.categorieService.updateCategorieStatus(id, statut).subscribe(() => {
      this.successMessage = `Catégorie ${statut === 'publie' ? 'publiée' : 'archivée'} avec succès !`;
      this.errorMessage = null;
      this.loadCategories();
    }, error => {
      console.error('Erreur lors de la mise à jour du statut de la catégorie:', error);
      this.errorMessage = 'Erreur lors de la mise à jour du statut de la catégorie.';
      this.successMessage = null;
    });
  }

}
