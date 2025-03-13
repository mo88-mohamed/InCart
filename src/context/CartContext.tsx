import { createContext, useState } from "react";
import IcartItem from "../components/IcartItem";

interface IcartContext {
    cartItems: IcartItem[];
    setCartItems: React.Dispatch<React.SetStateAction<IcartItem[]>>;
}

const CartContext = createContext<IcartContext | null>(null);

const CartProvider = ({ children }: any) => {


    const [cartItems,setCartItems] = useState<IcartContext['cartItems']>([]);
    return(
        <CartContext.Provider value={{ cartItems, setCartItems }}>
            {children}
        </CartContext.Provider>
    )
};

export { CartContext, CartProvider };
export type { IcartContext };
