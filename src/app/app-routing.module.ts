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
import { AjoutCategorieComponent } from './components/management/pages/admin/categorie/ajout-categorie/ajout-categorie.component';
import { ListeProduitComponent } from './components/management/pages/vendeur/produit/liste-produit/liste-produit.component';
import { AjoutProduitComponent } from './components/management/pages/vendeur/produit/ajout-produit/ajout-produit.component';
import { ListeProduitAdminComponent } from './components/management/pages/admin/produit/liste-produit-admin/liste-produit-admin.component';
import { AjoutProduitAdminComponent } from './components/management/pages/admin/produit/ajout-produit-admin/ajout-produit-admin.component';
import { ListeAnnoncesComponent } from './components/management/pages/admin/annonces/liste-annonces/liste-annonces.component';
import { ListeUtilisateurComponent } from './components/management/pages/admin/utilisateur/liste-utilisateur/liste-utilisateur.component';
import { AjoutAnnoncesComponent } from './components/management/pages/vendeur/annonces/ajout-annonces/ajout-annonces.component';
import { MesAnnoncesComponent } from './components/management/pages/vendeur/annonces/mes-annonces/mes-annonces.component';
import { ListeCommandeComponent } from './components/management/pages/admin/commande/liste-commande/liste-commande.component';
import { MesCommandeComponent } from './components/management/pages/vendeur/commande/mes-commande/mes-commande.component';
import { ProduitComponent } from './components/management/pages/client/produit/produit.component';
import { AccueilComponent } from './components/management/pages/vendeur/accueil/accueil.component';
import { DetailAnnonceComponent } from './components/management/pages/vendeur/detail-annonce/detail-annonce.component';
import { ProfilAdminComponent } from './components/management/pages/admin/profil-admin/profil-admin.component';
import { PanierComponent } from './components/management/pages/client/panier/panier.component';
import { MoyenPaiementComponent } from './components/management/pages/client/moyen-paiement/moyen-paiement.component';

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
  {path: 'AjoutCategorie', component: AjoutCategorieComponent},
  {path: 'ListeProduit', component: ListeProduitAdminComponent},
  {path: 'AjoutProduit', component: AjoutProduitAdminComponent},
  {path: 'ListeAnnonces', component: ListeAnnoncesComponent},
  {path: 'ListeUtilisateur', component: ListeUtilisateurComponent},
  {path: 'Accueil', component: AccueilComponent},
  {path: 'profil-admin', component: ProfilAdminComponent},
  {path: 'panier', component: PanierComponent},
  {path: 'paiement', component: MoyenPaiementComponent},



  //routes des vendeurs
  {path: 'MesAnnonces', component: MesAnnoncesComponent},
  {path: 'AjoutAnnonces', component: AjoutAnnoncesComponent},
  {path: 'MesCommande', component: MesCommandeComponent},
  {path: 'boutiqueClient', component: ProduitComponent},
  {path: 'detail-annonces', component: DetailAnnonceComponent},





];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
