import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/core/services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  message: string='';
  loginForm = new FormGroup({
    email : new FormControl('',[Validators.required,Validators.email]),
    password : new FormControl('',[Validators.required]),
  });

  constructor(private authService:AuthServiceService,private router :Router){}

// login(){
// this.authService.login(this.loginForm.value).subscribe((response)=>
// {
//   if(response.statut===200){
//     // console.log(response);
//     localStorage.setItem('token',response.token)
//     this.router.navigate(['/accueilAdmin'])
//   }else{
//     this.message='Email ou mot de passe incorrect'
//   }
// })
// }

login() {
  this.authService.login(this.loginForm.value).subscribe({
    next: (response) => {
      if (response.statut === 200 && response.token) {
        // Assurez-vous que le rôle est stocké dans la réponse du serveur ou récupérez-le d'une autre manière
        const clientId :number= response.data.id;
        const role = response.data.role || 'client'; // Exemple : Si le rôle n'est pas disponible dans la réponse
        localStorage.setItem('token', response.token);
        localStorage.setItem('clientId', clientId.toString());
        localStorage.setItem('role', role); // Stocker le rôle dans le localStorage
        this.redirectUser(role);
      } else {
        this.message = 'Email ou mot de passe incorrect';
      }
    },
    error: () => {
      this.message = 'Une erreur est survenue. Veuillez réessayer.';
    }
  });
}

redirectUser(role: string) {
  switch (role) {
    case 'admin':
      this.router.navigate(['/accueilAdmin']);
      break;
    case 'vendeur':
      this.router.navigate(['/accueilVendeur']);
      break;
    case 'client':
      this.router.navigate(['/accueilClient']);
      break;
    default:
      this.router.navigate(['/login']);
      break;
  }
}

}
