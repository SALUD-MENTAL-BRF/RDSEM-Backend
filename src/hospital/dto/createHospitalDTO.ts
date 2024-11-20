enum TypeHospital {
  Publico = "Publico",
  Privado = "Privado"
}

export interface createHospital {
  name: string;
  address: string;
  telephone: string;
  email: string;
  website?: string;
  director?: string;
  openingHours: string;
  type: TypeHospital
  specialties?: number[] | undefined;  // IDs de las especialidades
  services?: number[] | undefined;     // IDs de los servicios
  userId: number | undefined; //
}
