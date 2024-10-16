'use client'
import { readProduct } from '@/lib/features/products/productAPI';
import { Product } from '@/types/types';
import Image from 'next/image';
import Link from 'next/link';
import ProductReview from '../components/ProductReview';
import { useAppSelector } from '@/lib/hooks';
import { selectProduct } from '@/lib/features/products/productSlice';




const ProductReviewPage = () => {

    const product = useAppSelector(selectProduct)


    return (
        <>
            <ol className="flex pl-3 text-gray-500 font-semibold dark:text-white-dark mb-5">
                <li>
                    <Link href={'/'} className="hover:text-gray-500/70 dark:hover:text-white-dark/70">Dashboard</Link>
                </li>
                <li className="before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4">
                    <Link href={'/product'} className=" hover:text-gray-500/70 dark:hover:text-white-dark/70">Products</Link>
                </li>
                <li className="before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4">
                    <button className="text-primary"><span>{(product as Product)?.name}</span> </button>
                </li>
            </ol>
            <ProductReview product={product} />
        </>

    )
}

export default ProductReviewPage