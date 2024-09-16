import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LigneCommande } from 'src/app/core/models/LigneCommande/ligneCommande-response.module';
import { AuthServiceService } from 'src/app/core/services/auth-service.service';
import { DeclarationServiceService } from 'src/app/core/services/declaration-service.service';

@Component({
  selector: 'app-nav-bar-client',
  templateUrl: './nav-bar-client.component.html',
  styleUrls: ['./nav-bar-client.component.css']
})
export class NavBarClientComponent  implements OnInit{
  isLogoutDisabled: boolean = false;
  loading: boolean = false;
  error: string = '';
  imageFile: File | null = null;
  nombreLignes: number = 0; // Nouvelle propriété pour le nombre de lignes de commande
  constructor(
    private authService: AuthServiceService,
    private router: Router,private declarationService :DeclarationServiceService
  ) {}
  ngOnInit(): void {
    this.getNombreLignesParUtilisateur();
  }



  logoutApp() {
    this.authService.logout().subscribe(
      (response) => {
        if (response!) {
          localStorage.removeItem('token');
          this.router.navigate(['/login']);
        } else {
          localStorage.removeItem('token');
          this.router.navigate(['/login']);

        }
      },
      (error) => {
        localStorage.removeItem('token');
        this.router.navigate(['/login']);

      }
    );
  }
  getNombreLignesParUtilisateur(): void {
    this.declarationService.obtenirNombreLignesParUtilisateur().subscribe(
      (response) => {
        // Vérifiez la structure de la réponse ici
        console.log('Réponse API:', response);
        this.nombreLignes = response.nombre_lignes || 0;
      },
      (error) => {
        console.error('Erreur lors de la récupération des lignes de commande:', error);
        this.nombreLignes = 0; // En cas d'erreur, vous pouvez définir la valeur à 0
      }
    );
  }
  
}
