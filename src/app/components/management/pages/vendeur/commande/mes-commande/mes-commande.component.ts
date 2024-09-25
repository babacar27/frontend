import { Component, OnInit } from '@angular/core';
import { Commande } from 'src/app/core/models/Commande/commande-response.module';
import { CommandeServiceService } from 'src/app/core/services/commande-service.service';
import { ReglementService } from 'src/app/core/services/reglement.service';

@Component({
  selector: 'app-mes-commande',
  templateUrl: './mes-commande.component.html',
  styleUrls: ['./mes-commande.component.css']
})
export class MesCommandeComponent implements OnInit{
  commandes: Commande[] = []; // Stocker les commandes validées
  
  expediatedCommandeIds: number[] = []; 
  constructor(private commandeService: CommandeServiceService,private reglementService :ReglementService) {}

  ngOnInit(): void {
    this.getCommandes();
  }

  // Récupérer les commandes validées via le service
  getCommandes(): void {
    this.commandeService.getCommandesValideesParVendeur().subscribe(
      (response) => {
        this.commandes = response; // Stocker les commandes
        console.log(this.commandes); // Afficher les commandes pour vérification
      },
      (error) => {
        console.error('Erreur lors de la récupération des commandes :', error);
      }
    );
  }
  // Méthode pour marquer une commande comme expédiée
  marquerCommeExpedie(commandeId: number): void {
    this.reglementService.createExpedition(commandeId).subscribe({
      next: (response) => {
        console.log('Expédition créée:', response.data);
        // Ajouter l'ID de la commande à la liste des commandes expédiées
        this.expediatedCommandeIds.push(commandeId);
      },
      error: (error) => {
        console.error('Erreur lors de la création de l\'expédition:', error);
      }
    });
  }

  // Vérifier si la commande est expédiée
  estExpedie(commandeId: number): boolean {
    return this.expediatedCommandeIds.includes(commandeId);
  }

}
