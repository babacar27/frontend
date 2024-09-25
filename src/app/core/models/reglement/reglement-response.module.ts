export interface Commande {
  numero_commande: string;
  montant_total: string | null;
  dateCommande: string;
  status: string;
  client_id: number; // Clé étrangère pour la catégorie
  id: number;

}

export interface Reglement {
  id: number;
  methode_paiement: 'carte' | 'espece';
  type_paiement: 'plein' | 'partiel';
  montant: number; // Montant en XOF
  date_paiement: string; // Format de date, par exemple 'YYYY-MM-DD HH:mm:ss'
  statut: 'en_attente' | 'validé' | 'échoué';
  user_id: number; // ID de l'utilisateur
  payment_intent_id: string; // ID de l'intention de paiement Stripe
  created_at: string; // Date de création
  updated_at: string; // Date de mise à jour
  commande:Commande
}

export interface ReglementResponse {
  message: string; // Message de réponse
  data: Reglement; // Données du paiement
  status: number; // Code de statut HTTP
}
