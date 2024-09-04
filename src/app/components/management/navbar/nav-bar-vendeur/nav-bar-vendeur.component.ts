import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/core/services/auth-service.service';

@Component({
  selector: 'app-nav-bar-vendeur',
  templateUrl: './nav-bar-vendeur.component.html',
  styleUrls: ['./nav-bar-vendeur.component.css']
})
export class NavBarVendeurComponent {
  isLogoutDisabled: boolean = false;
  loading: boolean = false;
  error: string = '';
  imageFile: File | null = null;
  constructor(
    private authService: AuthServiceService,
    private router: Router
  ) {}



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
}
