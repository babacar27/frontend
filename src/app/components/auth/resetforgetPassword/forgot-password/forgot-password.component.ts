import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthServiceService } from 'src/app/core/services/auth-service.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  message: string = '';
  forgotPasswordForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });
  isLoading = false;

  constructor(private authService: AuthServiceService) {}

  sendResetLink() {
    if (this.forgotPasswordForm.valid) {
      this.isLoading = true;
      const email = this.forgotPasswordForm.get('email')?.value;

      if (typeof email === 'string') {
        this.authService.sendResetLink({ email }).subscribe({
          next: (response) => {
            this.isLoading = false;
            this.message = 'Un lien de réinitialisation a été envoyé à votre email.';
          },
          error: (error) => {
            this.isLoading = false;
            this.message = 'Erreur lors de l\'envoi du lien de réinitialisation.';
          }
        });
      } else {
        this.isLoading = false;
        this.message = 'Veuillez entrer un email valide.';
      }
    } else {
      this.message = 'Veuillez entrer un email valide.';
    }
  }
}
