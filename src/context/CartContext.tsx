import { Cart } from "@/components/Cart"
import { useContext, createContext, ReactNode, useState } from "react"

type CartProviderProps = {
    children: ReactNode
}

type CartProduct = {
    id: number
    quantity: number
}

type CartContext = {
    openCart: () => void
    closeCart: () => void
    getProductQuantity: (id: number) => number
    increaseCartQuantity: (id: number) => void
    decreaseCartQuantity: (id: number) => void
    removeFromCart: (id: number) => void
    getProductsData: () => void
    cardQuantity: number
}

const CartContext = createContext({});

export const useCart = () => {
    return useContext(CartContext);
}

export const CartProvider = ({ children }: CartProviderProps) => {
    const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);
    const [products, setProducts] = useState([]);
    const [productById, setProductById] = useState([]);
    const [error, setError] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const openCart = () => setIsOpen(true)
    const closeCart = () => setIsOpen(false)

    const getProductQuantity = (id: number) => {
        return cartProducts.find(product => product.id === id)?.quantity || 0
    }

    const increaseCartQuantity = (id: number) => {
        setCartProducts(currProducts => {
            if (currProducts.find(product => product.id === id) == null) {
                return [...currProducts, { id, quantity: 1 }]
            } else {
                return currProducts.map(item => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity + 1 }
                    } else {
                        return item;
                    }
                })
            }
        })
    }

    const decreaseCartQuantity = (id: number) => {
        setCartProducts(currProducts => {
            if (currProducts.find(product => product.id === id)?.quantity === 1) {
                return currProducts.filter(item => item.id !== id)
            } else {
                return currProducts.map(item => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity - 1 }
                    } else {
                        return item;
                    }
                })
            }
        })
    }

    const removeFromCart = (id: number) => {
        setCartProducts(currProducts => {
            return currProducts.filter(item => item.id !== id)
        })
    }

    const getProductsData = async (id?: number) => {
        try {
            const response = await fetch(`https://fakestoreapi.com/products/${id ? id : ''}`);
            const data = await response.json();
            if (id) {
                setProductById(data);
            } else {
                setProducts(data);
            }
        } catch (err) {
            setError(true);
            console.log('Error connecting to fake store API', err);
        }
    };

    const cartQuantity = cartProducts.reduce((quantity, product) => product.quantity + quantity, 0);

    return (
        <CartContext.Provider
            value={{
                getProductQuantity,
                increaseCartQuantity,
                decreaseCartQuantity,
                removeFromCart,
                getProductsData,
                openCart,
                closeCart,
                products,
                productById,
                error,
                cartProducts,
                cartQuantity
            }}>
            {children}
            <Cart isOpen={isOpen} />
        </CartContext.Provider>
    )
}