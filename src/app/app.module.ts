import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccueilAdminComponent } from './components/management/accueil/accueil-admin/accueil-admin.component';
import { AccueilClientComponent } from './components/management/accueil/accueil-client/accueil-client.component';
import { AccueilVendeurComponent } from './components/management/accueil/accueil-vendeur/accueil-vendeur.component';
import { ForgotPasswordComponent } from './components/auth/resetforgetPassword/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/auth/resetforgetPassword/reset-password/reset-password.component';
import { NavBarClientComponent } from './components/management/navbar/nav-bar-client/nav-bar-client.component';
import { NavBarAdminComponent } from './components/management/navbar/nav-bar-admin/nav-bar-admin.component';
import { NavBarVendeurComponent } from './components/management/navbar/nav-bar-vendeur/nav-bar-vendeur.component';
import { ChargementComponent } from './components/management/chargement/chargement/chargement.component';
import { FooterComponent } from './components/management/footer/footer/footer.component';
import { PageAccueilComponent } from './components/management/accueil/accueil-visiteur/page-accueil/page-accueil.component';
import { Section1Component } from './components/management/sections/section1/section1.component';
import { Section2Component } from './components/management/sections/section2/section2.component';
import { Section3Component } from './components/management/sections/section3/section3.component';
import { Section4Component } from './components/management/sections/section4/section4.component';
import { Section5Component } from './components/management/sections/section5/section5.component';
import { Section6Component } from './components/management/sections/section6/section6.component';
import { Section7Component } from './components/management/sections/section7/section7.component';
import { NavBarVisiteurComponent } from './components/management/navbar/nav-bar-visiteur/nav-bar-visiteur/nav-bar-visiteur.component';
import { BoutiqueComponent } from './components/management/boutique/boutique/boutique.component';
import { ContactComponent } from './components/management/contact/contact/contact.component';
import { AccueilComponent } from './components/management/pages/vendeur/accueil/accueil.component';
import { ListeProduitComponent } from './components/management/pages/vendeur/produit/liste-produit/liste-produit.component';
import { AjoutProduitComponent } from './components/management/pages/vendeur/produit/ajout-produit/ajout-produit.component';
import { ProduitComponent } from './components/management/pages/client/produit/produit.component';
import { PanierComponent } from './components/management/pages/client/panier/panier.component';
import { ListeAnnoncesComponent } from './components/management/pages/admin/annonces/liste-annonces/liste-annonces.component';
import { ListeCategorieComponent } from './components/management/pages/admin/categorie/liste-categorie/liste-categorie.component';
import { AjoutCategorieComponent } from './components/management/pages/admin/categorie/ajout-categorie/ajout-categorie.component';
import { ListeCommandeComponent } from './components/management/pages/admin/commande/liste-commande/liste-commande.component';
import { ListeUtilisateurComponent } from './components/management/pages/admin/utilisateur/liste-utilisateur/liste-utilisateur.component';
import { ListeProduitAdminComponent } from './components/management/pages/admin/produit/liste-produit-admin/liste-produit-admin.component';
import { AjoutProduitAdminComponent } from './components/management/pages/admin/produit/ajout-produit-admin/ajout-produit-admin.component';
import { MesAnnoncesComponent } from './components/management/pages/vendeur/annonces/mes-annonces/mes-annonces.component';
import { AjoutAnnoncesComponent } from './components/management/pages/vendeur/annonces/ajout-annonces/ajout-annonces.component';
import { MesCommandeComponent } from './components/management/pages/vendeur/commande/mes-commande/mes-commande.component';
import { SectionClient1Component } from './components/management/sectionClient/section-client1/section-client1.component';
import { SectionClient2Component } from './components/management/sectionClient/section-client2/section-client2.component';
import { SectionClient3Component } from './components/management/sectionClient/section-client3/section-client3.component';
import { SectionClient4Component } from './components/management/sectionClient/section-client4/section-client4.component';
import { SectionClient5Component } from './components/management/sectionClient/section-client5/section-client5.component';
import { SectionClient6Component } from './components/management/sectionClient/section-client6/section-client6.component';
import { SectionClient7Component } from './components/management/sectionClient/section-client7/section-client7.component';
import { DetailAnnonceComponent } from './components/management/pages/vendeur/detail-annonce/detail-annonce.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProfilAdminComponent } from './components/management/pages/admin/profil-admin/profil-admin.component';
import { MoyenPaiementComponent } from './components/management/pages/client/moyen-paiement/moyen-paiement.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AccueilAdminComponent,
    AccueilClientComponent,
    AccueilVendeurComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    NavBarClientComponent,
    NavBarAdminComponent,
    NavBarVendeurComponent,
    ChargementComponent,
    FooterComponent,
    PageAccueilComponent,
    Section1Component,
    Section2Component,
    Section3Component,
    Section4Component,
    Section5Component,
    Section6Component,
    Section7Component,
    NavBarVisiteurComponent,
    BoutiqueComponent,
    ContactComponent,
    AccueilComponent,

     ListeProduitComponent,
     AjoutProduitComponent,
     ProduitComponent,
     PanierComponent,
     ListeAnnoncesComponent,
     ListeCategorieComponent,
     AjoutCategorieComponent,
     ListeCommandeComponent,
     ListeUtilisateurComponent,
     ListeProduitAdminComponent,
     AjoutProduitAdminComponent,
     MesAnnoncesComponent,
     AjoutAnnoncesComponent,
     MesCommandeComponent,
     SectionClient1Component,
     SectionClient2Component,
     SectionClient3Component,
     SectionClient4Component,
     SectionClient5Component,
     SectionClient6Component,
     SectionClient7Component,
     DetailAnnonceComponent,
     ProfilAdminComponent,
     MoyenPaiementComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
