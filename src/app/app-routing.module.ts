import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { AuthGuard } from './auth.guard';
import { LoginGuardGuard } from './login-guard.guard';
import { AccueilAdminComponent } from './components/management/accueil/accueil-admin/accueil-admin.component';
import { AccueilClientComponent } from './components/management/accueil/accueil-client/accueil-client.component';
import { AccueilVendeurComponent } from './components/management/accueil/accueil-vendeur/accueil-vendeur.component';
import { ForgotPasswordComponent } from './components/auth/resetforgetPassword/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/auth/resetforgetPassword/reset-password/reset-password.component';
import { PageAccueilComponent } from './components/management/accueil/accueil-visiteur/page-accueil/page-accueil.component';
import { BoutiqueComponent } from './components/management/boutique/boutique/boutique.component';
import { ContactComponent } from './components/management/contact/contact/contact.component';

const routes: Routes = [

  { path: '', component: PageAccueilComponent },

  {
   //canActivate:[LoginGuardGuard], // il faux qu'on se  deconnecter complement pour avoir acces a ce page
    path :'login',
    component :LoginComponent,
  },
  {
    path :'register',
    component :RegisterComponent,
  },
  {
    canActivate:[AuthGuard], // il faux se connecter pour avoir acces a ce page
    path :'accueilAdmin',
    component :AccueilAdminComponent,
  },
  {
    canActivate:[AuthGuard], // il faux se connecter pour avoir acces a ce page
    path :'accueilClient',
    component :AccueilClientComponent,
  },
  {
    canActivate:[AuthGuard], // il faux se connecter pour avoir acces a ce page
    path :'accueilVendeur',
    component :AccueilVendeurComponent,
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
  },
  {path: 'boutique', component: BoutiqueComponent},
  {path: 'contact', component: ContactComponent},



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
