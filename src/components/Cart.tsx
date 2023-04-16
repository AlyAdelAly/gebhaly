import { useCart } from "@/context/CartContext"
import CartProduct from "./CartProduct"
import ClearIcon from '@mui/icons-material/Clear';
import Image from "next/image";
import EmptyCart from '../utils/empty-cart.png'


type CartProps = {
    isOpen: boolean
}

export const Cart = ({ isOpen }: CartProps) => {
    const { closeCart, cartProducts, products } = useCart()
    return (
        <>
            {isOpen ? (
                <>
                    <div className="flex justify-center items-center overflow-x-hidden overflow-y-hidden fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className={cartProducts.length > 0 ? "relative w-auto my-6 mx-auto max-w-3xl" : "relative w-[500px] my-6 mx-auto max-w-3xl"} >
                            <div className="border-0 rounded-lg shadow-lg bg-slate-200 relative flex flex-col w-full h-[500px] outline-none focus:outline-none overflow-y-auto">
                                <div className="flex items-start justify-between bg-slate-400 p-5 border-b border-solid border-gray-300 rounded-t ">
                                    <h3 className="text-4xl ">Cart</h3>
                                    <button
                                        className="bg-transparent border-0 text-black float-right"
                                        onClick={closeCart}
                                    >
                                        <span className="text-black opacity-7 h-8 w-6 text-xl block py-0 rounded-lg">
                                            <ClearIcon />
                                        </span>
                                    </button>
                                </div>
                                {cartProducts.length > 0 ?
                                    <div>
                                        <div className="flex flex-col items-center justify-center p-10 border-t border-solid border-blueGray-200 rounded-b">
                                            {cartProducts.map((product: { id: number, quantity: number }) => (
                                                <CartProduct key={product.id} id={product.id} quantity={product.quantity} />
                                            ))}
                                        </div>
                                        <div className="ml-auto mr-10 mb-10 text-lg bg-gray-400 w-fit p-2 rounded-md">
                                            Total Cost: ${" "}
                                            {
                                                cartProducts.reduce((total: number, cartItem: { id: string; quantity: number; }) => {
                                                    const item = products.find((product: { id: number; }) => product.id === parseInt(cartItem.id))
                                                    return (total + (item?.price || 0) * cartItem.quantity).toFixed(1);
                                                }, 0)
                                            }
                                        </div>
                                    </div> :
                                    <div className="flex flex-col justify-center items-center m-auto">
                                        <Image src={EmptyCart} alt="EmptyCart" className='m-auto block' width={100} height={100} />
                                        <p className="text-2xl pt-4">Your Cart is Empty</p>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </>
            ) : null}
        </>
    )
}