export type Role = {
  name: EnumRole;
}

export enum EnumRole {
  ADMIN = { id: 1, name: "Admin" },
  CITOYEN_CONNECTE = { id: 2, name: "Utilisateur connecté" },
  // VISITEUR_ANONYME = { id: 3, name: "Citoyen non connecte" },
}