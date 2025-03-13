import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import IcartItem from "../components/IcartItem";

const useCart = () => {
    const context = useContext(CartContext);

    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }

    const { cartItems, setCartItems } = context;
    
    const addToCart = (product: IcartItem) => {
        if (cartItems.some(item => item.id === product.id)) {
            setCartItems(cartItems.map(item => {
                if (item.id === product.id) {
                    return { ...item, quantity: item.quantity + 1 };
                }
                return item;
            }));
            return;
        }
        setCartItems([...cartItems, product]);
    }

    const removeFromCart = (product: IcartItem) => {
        setCartItems(cartItems.filter(item => item.id !== product.id));
    }
    const decreaseQuantity = (product: IcartItem) => {
        if (product.quantity === 1) {
            removeFromCart(product);
            return;
        }
        setCartItems(cartItems.map(item => {
            if (item.id === product.id) {
                return { ...item, quantity: item.quantity - 1 };
            }
            return item;
        }));
    }

    const clearCart = () => {
        setCartItems([]);
    }
    const getItemsCount = () => {
        return cartItems.reduce((total, product) => total + product.quantity, 0);
    }
    const getTotalPrice = () => {
        return cartItems.reduce((total, product) => total + product.price * product.quantity, 0);
    }
    

    return { cartItems, addToCart , removeFromCart, clearCart, getItemsCount, getTotalPrice, decreaseQuantity};
}

export default useCart;
