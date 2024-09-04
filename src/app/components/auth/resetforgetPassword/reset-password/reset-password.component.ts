import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidationErrors } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { passwordMatchValidator } from 'src/app/core/models/auth/password-match-validator';
import { AuthServiceService } from 'src/app/core/services/auth-service.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  message: string = '';

  constructor(
    private authService: AuthServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // Initialize the form group with form controls and a custom validator
    this.resetPasswordForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      password_confirmation: new FormControl('', [Validators.required]),
      token: new FormControl(''),
    }, {validators: passwordMatchValidator() });
  }

  ngOnInit() {
    // Récupère le token et l'email des paramètres de l'URL
    this.resetPasswordForm.patchValue({
      token: this.route.snapshot.queryParamMap.get('token'),
      email: this.route.snapshot.queryParamMap.get('email')
    });
  }

  resetPassword() {
    // Get the form values
    const formValue = this.resetPasswordForm.value;
    const email = formValue.email;
    const password = formValue.password;
    const passwordConfirmation = formValue.password_confirmation;
    const token = formValue.token as string;

    // Check if all required fields are filled
    if (email && password && passwordConfirmation && token) {
      this.authService.resetPassword({
        email,
        password,
        password_confirmation: passwordConfirmation,
        token
      }).subscribe({
        next: () => {
          this.message = 'Mot de passe réinitialisé avec succès.';
          this.router.navigate(['/login']);
        },
        error: (error) => {
          this.message = 'Erreur lors de la réinitialisation du mot de passe. Veuillez vérifier le lien de réinitialisation ou essayer à nouveau.';
        }
      });
    } else {
      this.message = 'Veuillez remplir tous les champs.';
    }
  }

  // Custom validator to check if the password and confirmation match
  private passwordMatchValidator(form: FormGroup): ValidationErrors | null {
    const password = form.get('password')?.value;
    const passwordConfirmation = form.get('password_confirmation')?.value;

    return password && passwordConfirmation && password !== passwordConfirmation
      ? { mismatch: true }
      : null;
  }
}
