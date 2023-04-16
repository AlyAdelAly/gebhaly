import { useCart } from '@/context/CartContext'
import Image from 'next/image'
import React from 'react'
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

type CartProductProps = {
    id: number
    quantity: number
}


const CartProduct = ({ id, quantity }: CartProductProps) => {
    const { removeFromCart, products, increaseCartQuantity, decreaseCartQuantity } = useCart();


    const product = products?.find((product: { id: number; }) => product.id === parseInt(id))
    if (product == null) return null;


    return (
        <div className='flex flex items-center justify-content pb-10'>
            <div>
                <Image src={product.image} alt={product.title} width={90} height={90} className='mx-auto pr-10' />
            </div>
            <div>
                {product.title.length > 12 ? product.title.substring(0, 12) + '..' : product.title}{" "}
                {quantity > 1 && (
                    <span className="text-sm text-gray-500" >
                        x{quantity}
                    </span>
                )}
                <div className="text-muted">
                    $ {product.price}
                </div>
            </div>
            <div className='flex justify-center items-center mx-auto'>
                {quantity === 1 ? (
                    <button onClick={() => increaseCartQuantity(id)} className="flex justify-center w-10 bg-blue-700 text-slate-100 text-sm p-1 mx-12 sm:mx-32 rounded-md">
                        Edit
                    </button>
                ) : (
                    <div className="flex flex-row items-center  mx-12 sm:mx-14 ">
                        <div className="flex flex-row items-center justify-center gap-2">
                            <button onClick={() => decreaseCartQuantity(id)} className='bg-blue-500 px-3 py-1 rounded-md'>-</button>
                            <div>
                                <span className="fs-3">{quantity}</span> in cart
                            </div>
                            <button onClick={() => increaseCartQuantity(id)} className='bg-blue-500 px-3 py-1 rounded-md'>+</button>
                        </div>
                    </div>
                )}
            </div>
            <div>
                <span className='pr-2'> ${product.price * quantity}</span>
                <button
                    className='p-2'
                    onClick={() => removeFromCart(id)}
                >
                    <HighlightOffIcon />
                </button>
            </div>
        </div>
    )
}

export default CartProduct