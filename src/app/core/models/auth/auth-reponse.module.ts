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

export interface AuthResponse {
  statut: number;
  data: UserData;
  token: string;
}

export interface AuthResponse {
  id: number;
  name: string;
  email: string;
  // Ajoute d'autres champs selon la réponse de ton API
}



