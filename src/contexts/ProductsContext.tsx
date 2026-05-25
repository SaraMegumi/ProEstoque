import React, { createContext, useContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ProdutoFormData } from '../schemas/produtoSchema';

interface Produto extends ProdutoFormData {
  id: string;
}

type Action = 
  | { type: 'ADD'; payload: Produto }
  | { type: 'UPDATE'; payload: Produto }
  | { type: 'DELETE'; payload: string }
  | { type: 'LOAD'; payload: Produto[] };

interface ProductsContextType {
  products: Produto[];
  addProduct: (data: ProdutoFormData) => void;
  updateProduct: (data: Produto) => void; 
  deleteProduct: (id: string) => void;    
}

const ProductsContext = createContext<ProductsContextType | null>(null);

function productsReducer(state: Produto[], action: Action): Produto[] {
  switch (action.type) {
    case 'ADD': return [...state, action.payload];
    case 'UPDATE': return state.map(p => p.id === action.payload.id ? action.payload : p);
    case 'DELETE': return state.filter(p => p.id !== action.payload);
    case 'LOAD': return action.payload;
    default: return state;
  }
}

export function ProductsProvider({ children }: { children: React.ReactNode }) {
  const [products, dispatch] = useReducer(productsReducer, []);

  useEffect(() => {
    AsyncStorage.getItem('@proestoque:products').then(data => {
      if (data) dispatch({ type: 'LOAD', payload: JSON.parse(data) });
    });
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('@proestoque:products', JSON.stringify(products));
  }, [products]);

  const addProduct = (data: ProdutoFormData) => {
    const newProduct = { ...data, id: Date.now().toString() };
    dispatch({ type: 'ADD', payload: newProduct });
  };

  const updateProduct = (product: Produto) => {
    dispatch({ type: 'UPDATE', payload: product });
  };

  const deleteProduct = (id: string) => {
    dispatch({ type: 'DELETE', payload: id });
  };

  return (
    <ProductsContext.Provider value={{ 
      products, 
      addProduct, 
      updateProduct, 
      deleteProduct  
    }}>
      {children}
    </ProductsContext.Provider>
  );
}

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error('useProducts deve ser usado dentro de um ProductsProvider');
  }
  return context;
};