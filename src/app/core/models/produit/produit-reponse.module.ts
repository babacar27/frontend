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
  
  export interface ProduitResponse {
    message: string;
    data: Produit;
    status: number;
  }