import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Spinner from '@/utils/Spinner';
import { Button } from 'react-bootstrap';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import StarIcon from '@mui/icons-material/Star';
import { useCart } from '@/context/CartContext';

const ProductDetails = () => {

    const router = useRouter();
    const { id } = router.query;

    const { getProductQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart, getProductsData, productById } = useCart();
    const quantity = getProductQuantity(id);

    useEffect(() => {
        getProductsData(id);
    }, [id]);

    return (
        <div>
            <div className="mt-16 py-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 sm:flex-row mx-6">
                    <div className="pr-12">
                        {
                            productById.image ? <Image src={productById.image} alt={productById.title} width={400} height={400} className='mx-auto' /> : <Spinner />
                        }
                    </div>
                    <div>
                        <h1 className="text-xl text-slate-500">{productById.category?.toUpperCase()}</h1>
                        <h2 className="text-4xl pt-6">{productById.title}</h2>
                        <h2 className='text-lg mt-3 font-bold'>Rating {productById.rating?.rate}<StarIcon /></h2>
                        <h2 className="mt-8 text-3xl font-bold">$ {productById.price}</h2>
                        <h3 className="mt-6 text-gray-500">{productById.description}</h3>
                        <div className="mt-4">
                            {quantity === 0 ? (
                                    <Button onClick={() => increaseCartQuantity(id)} className="w-32 bg-blue-700 hover:bg-blue-900 text-slate-100 p-2 rounded-md">
                                        Add To Cart
                                    </Button>
                            ) : (
                                <div
                                    className="flex flex-row items-center"
                                >
                                    <div
                                        className="flex flex-row items-center justify-center gap-2"
                                    >
                                        <Button onClick={() => decreaseCartQuantity(id)} className='bg-blue-500 px-3 py-1 rounded-md'>-</Button>
                                        <div>
                                            <span className="fs-3">{quantity}</span> in cart
                                        </div>
                                        <Button onClick={() => increaseCartQuantity(id)} className='bg-blue-500 px-3 py-1 rounded-md'>+</Button>
                                    </div>
                                    <Button
                                        className='pl-2'
                                        onClick={() => removeFromCart(id)}
                                    >
                                        <HighlightOffIcon />
                                    </Button>
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails