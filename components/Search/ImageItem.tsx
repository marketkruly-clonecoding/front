import { cls } from '@libs/cls';
import { Product, ProductList } from '@libs/types';
import useMutate from '@libs/useMutate';
import { addRecentviewList, openCartWindow } from '@modules/product';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

interface IImageItem {
    data: [Info: Product, ListInfo: [] | ProductList[]];
    isHome?: boolean;
}

const ImageItem = ({ data, isHome = false }: IImageItem) => {

    const dispatch = useDispatch();
    const router = useRouter();

    const [mutate, { loading }] = useMutate(`http://prod.hiimpedro.site:9000/app/products/${router.query.id || ""}/addcart`);


    const onClick = () => {
        dispatch(addRecentviewList({ url: data[0].url, id: data[0].product_idx }));
    }

    const onImgClick = () => {
        router.push(`/product/${data[0].product_idx}`);
    }

    const onStoreClick = (e: React.MouseEvent) => {

        dispatch(openCartWindow(data));
    }


    //w-[340px] h-[435px]  // w-[250px] h-[318px]
    return <li onClick={onClick} className={cls(isHome ? "pr-[18px] space-y-2" : "w-[340px]")}>
        <div className={cls(isHome ? "relative w-[250px] h-[318px] bg-gray-400" : "relative w-full h-[435px] bg-slate-500 mb-4")}>
            <Image onClick={onImgClick} layout="fill" objectFit='cover' src={data[0].url} />
            <button onClick={onStoreClick} className="absolute z-20 right-3 bottom-3  flex justify-center items-center w-10 h-10  rounded-full bg-[rgba(136,115,142,0.8)]">
                <svg xmlns="http://www.w3.org/2000/svg" className="text-white h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            </button>
        </div>
        <Link href={`/product/${data[0].product_idx}`}>
            <a>
                <div className="space-y-3">
                    <h1 className={isHome ? "mt-3" : "text-xl"}>{data[0].brand_name ? `[${data[0].brand_name}]` : null}{data[0].name}</h1>
                    {data[0].discount ?
                        <div>
                            <div className="text-lg font-semibold">
                                <span className="text-orange-500 mr-2">{data[0].discount}%</span>
                                <span>{data[0].discount_price}원</span>
                            </div>
                            <div className="text-base text-gray-400 font-semibold line-through">{data[0].price}원</div>
                        </div>
                        :
                        <div className="text-lg font-semibold">{data[0].price}원</div>
                    }
                    {isHome ? null : <p className="text-sm text-gray-400 font-semibold">{data[0].subname}</p>}
                    {
                        data[0].is_kurlyonly ?
                            <ul className="flex text-xs space-x-2">
                                <li className="bg-gray-200 px-2 py-1 rounded-sm text-purple-800 font-semibold">Kurly Only</li>
                                {/* <li className="bg-gray-200 px-2 py-1 text-gray-600 font-semibold rounded-sm">한정 수량</li> */}
                            </ul>
                            :
                            null
                    }
                </div >
            </a>
        </Link>
    </li >
}

export default ImageItem;