import { useState, useEffect } from "react";
import api from "../services/api";

export interface Categoria {
  id: string;
  nome: string;
}

export function useCategorias() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api
      .get("/categorias")
      .then((res) => setCategorias(res.data))
      .catch(() => setError("Não foi possível carregar as categorias."))
      .finally(() => setIsLoading(false));
  }, []);

  return { categorias, isLoading, error };
}
