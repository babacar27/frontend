// declaration.model.ts
export interface UserData {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
  role: string;
  adresse: string; // Adresse du vendeur
  photo: string;
  telephone: string;
  statut: string;
}

export interface Categorie {
  id: number;
  nomCategorie: string;
  image: string | null;
  statut: string;
  updated_at: string;
  created_at: string;
}


export interface Produit {
  nom: string;
  libelle: string | null;
  image: string;
  statut: string;
  updated_at: string;
  created_at: string;
  categorie_id: number; // Clé étrangère pour la catégorie
  id: number;
  categorie: Categorie;

}

export interface Declaration {
  id: number;
  produit_id: number;
  prix: number;
  quantite: number;
  description: string;
  tracabilite: string;
  date_peremption: string; // ou utilisez Date si vous préférez manipuler des objets Date
  statut: string;
  vendeur_id: number;
  produit: Produit; // Détails du produit associés à la déclaration
  vendeur: UserData; // Détails du vendeur associés à la déclaration
}
