import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
} from "react";
import api from "../services/api";
import { ProdutoFormData } from "../schemas/produtoSchema";

// Tipo que bate com a resposta da API (inclui categoria aninhada)
export interface Categoria {
  id: string;
  nome: string;
  criadoEm: string;
}

export interface Produto {
  [x: string]: number;
  id: string;
  nome: string;
  descricao?: string | null;
  quantidade: number;
  quantidadeMinima: number;
  preco: number;
  unidade: string;
  categoriaId: string;
  categoria: Categoria;
  criadoEm: string;
  atualizadoEm: string;
}

type State = {
  products: Produto[];
  isLoading: boolean;
  error: string | null;
};

type Action =
  | { type: "SET_LOADING" }
  | { type: "LOAD_SUCCESS"; payload: Produto[] }
  | { type: "LOAD_ERROR"; payload: string }
  | { type: "ADD"; payload: Produto }
  | { type: "UPDATE"; payload: Produto }
  | { type: "DELETE"; payload: string };

interface ProductsContextType {
  products: Produto[];
  isLoading: boolean;
  error: string | null;
  carregarProdutos: () => Promise<void>;
  addProduct: (data: ProdutoFormData) => Promise<void>;
  updateProduct: (id: string, data: ProdutoFormData) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
}

const ProductsContext = createContext<ProductsContextType | null>(null);

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, isLoading: true, error: null };
    case "LOAD_SUCCESS":
      return {
        ...state,
        isLoading: false,
        products: action.payload,
        error: null,
      };
    case "LOAD_ERROR":
      return { ...state, isLoading: false, error: action.payload };
    case "ADD":
      return { ...state, products: [...state.products, action.payload] };
    case "UPDATE":
      return {
        ...state,
        products: state.products.map((p) =>
          p.id === action.payload.id ? action.payload : p,
        ),
      };
    case "DELETE":
      return {
        ...state,
        products: state.products.filter((p) => p.id !== action.payload),
      };
    default:
      return state;
  }
}

export function ProductsProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, {
    products: [],
    isLoading: false,
    error: null,
  });

  // useCallback garante que a referência da função não muda a cada render,
  // evitando loops no useEffect que depende dela.
  const carregarProdutos = useCallback(async () => {
    dispatch({ type: "SET_LOADING" });
    try {
      const response = await api.get("/produtos");
      dispatch({ type: "LOAD_SUCCESS", payload: response.data });
    } catch (err: any) {
      const msg =
        err?.response?.data?.erro ??
        "Erro ao carregar produtos. Verifique sua conexão.";
      dispatch({ type: "LOAD_ERROR", payload: msg });
    }
  }, []);

  useEffect(() => {
    carregarProdutos();
  }, [carregarProdutos]);

  const addProduct = async (data: ProdutoFormData) => {
    const response = await api.post("/produtos", data);
    dispatch({ type: "ADD", payload: response.data });
  };

  const updateProduct = async (id: string, data: ProdutoFormData) => {
    const response = await api.put(`/produtos/${id}`, data);
    dispatch({ type: "UPDATE", payload: response.data });
  };

  const deleteProduct = async (id: string) => {
    await api.delete(`/produtos/${id}`);
    dispatch({ type: "DELETE", payload: id });
  };

  return (
    <ProductsContext.Provider
      value={{
        products: state.products,
        isLoading: state.isLoading,
        error: state.error,
        carregarProdutos,
        addProduct,
        updateProduct,
        deleteProduct,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error("useProducts deve ser usado dentro de um ProductsProvider");
  }
  return context;
};
