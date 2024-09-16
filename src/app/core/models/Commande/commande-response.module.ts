export interface UserData {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    role: string;
    adresse: string;
    photo: string;
    telephone: string;
    statut: string;
  }

  
  export interface Commande {
  numero_commande: string;
  montant_total: string | null;
  dateCommande: string;
  status: string;
  client_id: number; // Clé étrangère pour la catégorie
  id: number;
  client: UserData;

}
export interface CommandeResponse {
    message: string;
    data: Commande;
    status: number;
  }