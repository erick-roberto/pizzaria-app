// Importa useState do React para gerenciar o estado do carrinho
import { useState } from "react";

// Importa o contexto do carrinho previamente criado
import { CartContext } from "./CartContext";

// Componente Provider que engloba a aplicação e fornece o contexto do carrinho
export default function CartProvider({ children }) {
  // Estado 'cart' que guarda os itens do carrinho
  const [cart, setCart] = useState([]);

  // Função para adicionar uma pizza ao carrinho
  const addToCart = (pizza) => {
    // Verifica se a pizza já existe no carrinho
    const existing = cart.find(item => item.id === pizza.id);
    
    if (existing) {
      // Se já existir, aumenta a quantidade do item
      setCart(cart.map(item =>
        item.id === pizza.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      // Se não existir, adiciona a pizza ao carrinho com quantity inicial 1
      setCart([...cart, { ...pizza, quantity: 1 }]);
    }
  };

  // Função para remover um item do carrinho pelo id
  const removeFromCart = (id) => setCart(cart.filter(item => item.id !== id));

  // Função para limpar todo o carrinho
  const clearCart = () => setCart([]);

  // Provedor do contexto que passa o estado 'cart' e as funções de manipulação para os filhos
  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children} {/* Renderiza os componentes filhos que usam este contexto */}
    </CartContext.Provider>
  );
}
