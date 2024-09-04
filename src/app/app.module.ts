import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
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
    ContactComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
