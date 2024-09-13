import { Component } from '@angular/core';
import { UserData } from 'src/app/core/models/auth/auth-reponse.module';
import { AuthServiceService } from 'src/app/core/services/auth-service.service';

@Component({
  selector: 'app-liste-utilisateur',
  templateUrl: './liste-utilisateur.component.html',
  styleUrls: ['./liste-utilisateur.component.css']
})
export class ListeUtilisateurComponent {
  users: UserData[] = [];
  errorMessage: string | null = null; // Pour gérer les erreurs
  successMessage: string | null = null; // Pour gérer les messages de succès
  serverUrl = 'http://127.0.0.1:8000/storage/images/user/';
  filteredUsers: UserData[] = [];
  searchTerm: string = '';
  selectedRole: string = '';

  constructor(private userService: AuthServiceService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe({
      next: (response) => {
        console.log(response); // Affichez la réponse pour vérifier sa structure
        this.users = response.data; // Ajustez en fonction de la structure de la réponse
        this.filteredUsers = this.users; // Initialement, afficher tous les utilisateurs

      },
      error: (err) => {
        console.error('Erreur lors de la récupération des utilisateurs', err);
      }
    });
  }


  updateUserStatus(id: number, statut: string): void {
    this.userService.updateUserStatus(id, statut).subscribe(() => {
      this.successMessage = `Produit ${statut === 'debloquer' ? 'debloquer' : 'bloquer'} avec succès !`;
      this.errorMessage = null;
      this.loadUsers();
    }, error => {
      console.error('Erreur lors de la mise à jour du statut de utilisateur:', error);
      this.errorMessage = 'Erreur lors de la mise à jour du statut de l\'utilisateur.';
      this.successMessage = null;
    });
  }



  deleteUser(id: number): void {
    if (confirm('Voulez-vous vraiment supprimer cette produit ?')) {
      this.userService.deleteUser(id).subscribe(
        (response) => {
          this.successMessage = 'utilisateur supprimée avec succès !';
          this.loadUsers(); // Recharge la liste des catégories après suppression
        },
        (error) => {
          console.error('Erreur lors de la suppression de l\'utilisateur', error);
          this.errorMessage = 'Erreur lors de la suppression de l\'utilisateur.';
        }
      );
    }
  }


  filterUsers(): void {
    this.filteredUsers = this.users.filter(user =>
      (this.selectedRole ? user.role === this.selectedRole : true) &&
      (this.searchTerm ?
        user.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(this.searchTerm.toLowerCase())
        : true)
    );
  }

  onRoleChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectedRole = target.value;
    this.filterUsers();
  }


}

