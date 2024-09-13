// declaration.model.ts
export interface Categorie {
  nomCategorie: string;
}

export interface Produit {
  id: number;
  nom: string;
  statut: string;
  libelle: string;
  categorie: Categorie;
  image?: string; // Ajoutez cette propriété si nécessaire
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
  produit: Produit; // Détails du produit associés à la déclaration
}
