import React, { createContext, useContext, useState, useCallback } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
	const [refreshCart, setRefreshCart] = useState(false);

	const triggerCartRefresh = useCallback(() => {
		setRefreshCart((prev) => !prev); // toggling the value to trigger re-fetch
	}, []);

	return <CartContext.Provider value={{ refreshCart, triggerCartRefresh }}>{children}</CartContext.Provider>;
};

export const useCartContext = () => useContext(CartContext);
