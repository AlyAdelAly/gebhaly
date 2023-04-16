import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

type ProductProps = {
  id: number
  title: string
  price: number
  image: string
}

const Product = ({ id, title, price, image }: ProductProps) => {
  return (
    <div key={id}>
      <Image
        src={image}
        alt={title}
        width={200}
        height={200}
        className='h-[250px] object-fit rounded-t-lg mx-auto hover:scale-105 duration-300'
      />
      <div className='flex justify-between px-2 py-4'>
        <p className='font-bold text-neutral-800'>{title.length > 12 ? title.substring(0, 12) + '..' : title}</p>
        <p>
          <span className='text-black font-semibold p-1 '>
            ${price}
          </span>
        </p>
      </div>
      <div className='flex justify-center'>
        <button className='w-28 mb-4 bg-blue-500 text-neutral-900/100 font-bold rounded-md p-2'>
          <Link href={`/ProductDetails/${id}`}>
            Buy Now
          </Link>
        </button>
      </div>
    </div>
  )
}

export default Product