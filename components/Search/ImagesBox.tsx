import StoreInCart from '@components/Cart/StoreInCart';
import { cls } from '@libs/cls';
import { Product, ProductList } from '@libs/types';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ISearch } from 'pages/[id]';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ImageItem from './ImageItem';




interface IImagesBox {
    productsInfo: any[];
}

const ImagesBox = ({ productsInfo }: any) => {

    const router = useRouter();
    const [data, setData] = useState(productsInfo[1]);
    const [separateKey, setSeparateKey] = useState("");
    useEffect(() => {
        setData(productsInfo[1]);
    }, [router]);

    const onSeparateKeyClick = (e: React.MouseEvent) => {
        const target = (e.target as HTMLElement).closest("li");
        if (!target) return;
        const { dataset: { key } } = target!;
        if (key === "lowPrice") {
            const newData = [...data].sort((a, b) => {
                if (a[0].discount && b[0].discount) {
                    return +a[0].discount_price - +b[0].discount_price;
                } else if (a[0].discount && !b[0].discount) {
                    return +a[0].discount - +b[0].price
                } else if (!a[0].discount && b[0].discount) {
                    return +a[0].price - +b[0].discount_price
                } else {
                    return +a[0].price - +b[0].price
                }
            });
            setSeparateKey("lowPrice");
            setData(newData);
        } else if (key === "highPrice") {
            const newData = [...data].sort((a, b) => {
                if (a[0].discount && b[0].discount) {
                    return +b[0].discount_price - +a[0].discount_price;
                } else if (a[0].discount && !b[0].discount) {
                    return +b[0].discount - +a[0].price
                } else if (!a[0].discount && b[0].discount) {
                    return +b[0].price - +a[0].discount_price
                } else {
                    return +b[0].price - +a[0].price
                }
            });
            setSeparateKey("highPrice");
            setData(newData);

        } else if (key === "new") {

            const newData = [...data].sort((a, b) => {
                const one = new Date(b[0].update_at);
                const two = new Date(a[0].update_at);
                if (one <= two) return -1;
                else return 1;
            });
            setSeparateKey("new");
            setData(newData);
        }

    }



    const onRightClick = () => {
        const [a, b, page] = router.asPath.split("-");
        if (+page < 4) {
            router.push(a + "-" + b + "-" + `${+page + 1}`);
        }
    }

    const onLeftClick = () => {
        const [a, b, page] = router.asPath.split("-");
        if (+page > 1) {
            router.push(a + "-" + b + "-" + `${+page - 1}`);
        }
    }


    return (
        <div>
            <header className="py-4 flex justify-between text-xs">
                <div>{productsInfo && productsInfo[0]}개</div>
                <ul onClick={onSeparateKeyClick} className="flex space-x-2 text-gray-400">
                    <li data-key="recommend">추천순</li>
                    <span> | </span>
                    <li data-key="new" className={cls(separateKey === "new" ? "text-black font-semibold" : "", "cursor-pointer")}>신상품순</li>
                    <span> | </span>
                    <li data-key="sales" className={cls(separateKey === "sales" ? "text-black font-semibold" : "", "cursor-pointer")}>판매량순</li>
                    <span> | </span>
                    <li data-key="혜택순">혜택순</li>
                    <span> | </span>
                    <li data-key="lowPrice" className={cls(separateKey === "lowPrice" ? "text-black font-semibold" : "", "cursor-pointer")}>낮은가격순</li>
                    <span> | </span>
                    <li data-key="highPrice" className={cls(separateKey === "highPrice" ? "text-black font-semibold" : "", "cursor-pointer")}>높은가격순</li>
                </ul>
            </header>
            <main className=" ">
                <ul className="grid gap-10 grid-cols-3">
                    {productsInfo && data.map((item: [Info: Product, ListInfo: [] | ProductList[]], index: number) => <ImageItem key={index} data={item} />)}
                </ul>
                {router.asPath.includes("vegetables-1-") ?
                    <div className="flex  justify-center mt-24">
                        <button className="border-2 p-2 w-9 h-9 flex justify-center items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                            </svg>
                        </button>
                        <button onClick={onLeftClick} className="border-2 p-2 w-9 h-9 flex justify-center items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <ul className="flex">
                            {productsInfo && Array.from({ length: Math.ceil(20 / 6) }, (v, i) => i + 1).map((number, index) =>
                                <li key={index} >
                                    <Link href={`/category/vegetables-1-${number}`}>
                                        <a className={cls(router.asPath.split("-")[2] === number + "" ? "bg-gray-400 text-purple-800 border-gray-400" : "", "cursor-pointer flex justify-center items-center text-sm border-2 p-2 w-9 h-9")}>
                                            {index + 1}
                                        </a>
                                    </Link>
                                </li>)}
                        </ul>
                        <button onClick={onRightClick} className="border-2 p-2 w-9 h-9   flex justify-center items-center">
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
                    : null}
            </main>

        </div>
    )
}

export default ImagesBox;