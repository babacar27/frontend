import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthResponse } from 'src/app/core/models/auth/auth-reponse.module';
import { Produit } from 'src/app/core/models/produit/produit-reponse.module';
import { AuthServiceService } from 'src/app/core/services/auth-service.service';
import { DeclarationServiceService } from 'src/app/core/services/declaration-service.service';
import { ProduitServiceService } from 'src/app/core/services/produit-service.service';

@Component({
  selector: 'app-ajout-annonces',
  templateUrl: './ajout-annonces.component.html',
  styleUrls: ['./ajout-annonces.component.css']
})
export class AjoutAnnoncesComponent implements OnInit {
  annonceForm: FormGroup;
  // produits: Produit[] = [];
  isSubmitting = false;
  errorMessage: string | null = null;
  vendeurId: number | null = null;
  // produit!: Produit;
  produitId!: number;
  produit: Produit | null = null;

  constructor(
    private fb: FormBuilder,
    private declarationService: DeclarationServiceService,
    private produitService: ProduitServiceService,
    private authService: AuthServiceService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef  // Inject ChangeDetectorRef
  ) {
    this.annonceForm = this.fb.group({
      produit_id: [null, Validators.required],
      prix: [0, [Validators.required, Validators.min(0.01)]],
      quantite: [0, [Validators.required, Validators.min(1)]],
      description: ['', Validators.required],
      tracabilite: ['', Validators.required],
      date_peremption: ['', Validators.required],
      statut: ['publier', Validators.required],
      vendeur_id: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    // Récupère l'ID du produit à partir des queryParams
    this.route.queryParams.subscribe(params => {
      this.produitId = params['produitId']; // Assurez-vous que produitId est bien défini dans votre composant

      // Si un produitId est présent dans les queryParams, on pré-remplit le formulaire
      if (this.produitId) {
        this.annonceForm.patchValue({
          produit_id: this.produitId // Pré-remplit l'ID du produit dans le formulaire
        });
        this.loadProduit(this.produitId); // Charge les données du produit avec cet ID
      }
    });

    this.setVendeurId(); // Initialise l'ID du vendeur si nécessaire
  }

  setVendeurId(): void {
    this.authService.getUserInfo().subscribe({
      next: (response: AuthResponse) => {
        if (response && response.id) {
          this.vendeurId = response.id;
          this.annonceForm.patchValue({ vendeur_id: this.vendeurId }); // Ajoute l'ID du vendeur dans le formulaire
        } else {
          console.error('ID du vendeur non trouvé');
        }
      },
      error: err => {
        console.error('Erreur lors de la récupération des informations du vendeur', err);
      }
    });
  }
  loadProduit(id: number): void {
    this.produitService.getProduitById(id).subscribe({
      next: (data: any) => {
        this.produit = data.produit;  // Assurez-vous que vous accédez à `data.produit`
        console.log('Produit récupéré:', this.produit);
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des données du produit', err);
      }
    });
  }



  onSubmit(): void {
    if (this.annonceForm.invalid) {
      return;
    }

    this.isSubmitting = true;
    this.declarationService.createOrUpdateDeclaration(this.annonceForm.value).subscribe({
      next: response => {
        console.log('Déclaration ajoutée avec succès', response);
        this.annonceForm.reset(); // Réinitialiser le formulaire après succès
        this.errorMessage = null; // Réinitialiser le message d'erreur
        this.isSubmitting = false;
        this.router.navigate(['/MesAnnonces']); // Rediriger après succès
      },
      error: err => {
        console.error('Erreur lors de l\'ajout de la déclaration', err);
        this.errorMessage = 'Erreur lors de l\'ajout de l\'annonce.';
        this.isSubmitting = false;
      }
    });
  }

}
