import React, { useEffect, useState } from 'react';
import Product from '@/components/Product';
import { useCart } from '@/context/CartContext';

const Products = () => {

    const { getProductsData, products } = useCart();

    useEffect(() => {
        getProductsData();
    }, []);

    return (
        <div>
            <div className='text-4xl m-8'>
                <h1>Products</h1>
            </div>
            <div className='grid md:grid-cols-3 lg:grid-cols-4 gap-6 pt-4 p-10'>
                {products?.map((item: { id: number, title: string, category: string, price: number, image: string }) => (
                    <div key={item.id} className='shadow-lg rounded-lg'>
                        <Product {...item} />
                    </div>
                ))}
            </div>
        </div>
    )
}


export default Products;