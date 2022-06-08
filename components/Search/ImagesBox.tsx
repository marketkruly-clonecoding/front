import StoreInCart from '@components/Cart/StoreInCart';
import { Product, ProductList } from '@libs/types';
import { ISearch } from 'pages/[id]';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import ImageItem from './ImageItem';




interface IImagesBox {
    productsInfo: any[];
}

const ImagesBox = ({ productsInfo }: any) => {

    const [data, setData] = useState(productsInfo[1]);
    const [separateKey, setSeparateKey] = useState("");

    const onSeparateKeyClick = () => {

    }

    return (
        <div>
            <header className="py-4 flex justify-between text-xs">
                <div>{productsInfo && productsInfo[0]}개</div>
                <ul onClick={onSeparateKeyClick} className="flex space-x-2 text-gray-400">
                    <li data-key="추천순">추천순</li>
                    <span> | </span>
                    <li data-key="신상품순">신상품순</li>
                    <span> | </span>
                    <li data-key="판매량순">판매량순</li>
                    <span> | </span>
                    <li data-key="혜택순">혜택순</li>
                    <span> | </span>
                    <li data-key="낮은가격순">낮은가격순</li>
                    <span> | </span>
                    <li data-key="높은가격순">높은가격순</li>
                </ul>
            </header>
            <main className=" ">
                <ul className="grid gap-10 grid-cols-3">
                    {productsInfo && productsInfo[1].map((item: [Info: Product, ListInfo: [] | ProductList[]], index: number) => <ImageItem key={index} data={item} />)}
                </ul>
                <div className="flex  justify-center mt-24">
                    <button className="border-2 p-2 w-9 h-9 flex justify-center items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                        </svg>
                    </button>
                    <button className="border-2 p-2 w-9 h-9 flex justify-center items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <ul className="flex">
                        {productsInfo && Array.from({ length: Math.ceil(productsInfo[0] / 6) }, (v, i) => i + 1).map((number, index) => <li key={index} className=" 
                         cursor-pointer flex justify-center items-center text-sm border-2 p-2 w-9 h-9">
                            {index + 1}
                        </li>)}
                    </ul>
                    <button className="border-2 p-2 w-9 h-9   flex justify-center items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                    <button className="border-2 p-2 w-9 h-9  flex justify-center items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </main>

        </div>
    )
}

export default ImagesBox;