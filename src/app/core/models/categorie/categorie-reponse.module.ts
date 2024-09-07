export interface Categorie {
  nomCategorie: string;
  image: string | null;
  statut: string;
  updated_at: string;
  created_at: string;
  id: number;
}

export interface CategorieResponse {
  message: string;
  data: Categorie;
  status: number;
}

export interface CategorieListResponse {
  data: Categorie[];

}
