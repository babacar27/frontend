import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { passwordMatchValidator } from 'src/app/core/models/auth/password-match-validator';
import { AuthServiceService } from 'src/app/core/services/auth-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {
  message: string = '';
  photo: File | null = null;
  photoError: string | null = null;

  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    password_confirmation: new FormControl('', [Validators.required]),
    role: new FormControl('', [Validators.required]),
    adresse: new FormControl('', [Validators.required]),
    telephone: new FormControl('', [Validators.required]),
  }, { validators: passwordMatchValidator() });

  constructor(
    private authService: AuthServiceService,
    private router: Router
  ) {}

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.photo = file;
      this.photoError = null;
    } else {
      this.photoError = 'Veuillez sélectionner un fichier.';
    }
  }

  register() {
    if (!this.photo) {
      this.photoError = 'Le fichier photo est requis.';
      return;
    }

    // Crée un nouvel objet FormData
    const formData = new FormData();

    // Utilise une fonction d'assistance pour vérifier la présence des valeurs avant de les ajouter
    const appendField = (name: string, value: string | null | undefined) => {
      if (value != null) {
        formData.append(name, value);
      }
    };

    // Ajoute les valeurs du formulaire au FormData
    appendField('name', this.registerForm.get('name')?.value);
    appendField('email', this.registerForm.get('email')?.value);
    appendField('password', this.registerForm.get('password')?.value);
    appendField('password_confirmation', this.registerForm.get('password_confirmation')?.value);
    appendField('role', this.registerForm.get('role')?.value);
    appendField('adresse', this.registerForm.get('adresse')?.value);
    appendField('telephone', this.registerForm.get('telephone')?.value);
    appendField('statut', this.registerForm.get('statut')?.value);
    formData.append('photo', this.photo);

    // Envoie le FormData au service d'authentification
    this.authService.register(formData).subscribe({
      next: (response) => {
        if (response.statut === 201) {
          this.router.navigate(['/login']);
        }
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 422) {
          // Gérer les erreurs de validation
          if (error.error.errors) {
            const errors = error.error.errors;
            if (errors.email) {
              this.message = "Cet email est déjà utilisé.";
            } else if (errors.name || errors.password || errors.password_confirmation || errors.adresse || errors.telephone || errors.statut) {
              this.message = "Erreur de validation. Veuillez vérifier les champs.";
            }
          } else {
            this.message = "Erreur de validation. Veuillez vérifier les champs.";
          }
        } else {
          this.message = "Erreur lors de l'inscription. Veuillez réessayer.";
        }
      }
    });
  }

  // Méthode pour vérifier si le mot de passe et la confirmation correspondent
  get passwordMismatch() {
    return this.registerForm.errors?.['mismatch'];
  }
}
