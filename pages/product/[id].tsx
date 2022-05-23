import Button from '@components/Button';
import SideBar from '@components/SideBar';
import { cls } from '@libs/cls';
import { ProductDetail, ProductList, ProductReview, ProductUserInfo } from '@libs/types';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import useSWR from 'swr';


interface IProductDetailResult {
    code: number;
    isSuccess: boolean;
    message: string;
    result: [ProductDetail[], ProductList[], ProductUserInfo[], ProductReview[]];
}

const ProductDetail: NextPage = () => {

    const router = useRouter();

    const { data, mutate } = useSWR<IProductDetailResult>(`http://prod.hiimpedro.site:9000/app/products/${router.query.id ? router.query.id : ""}`);

    const [buyNumber, setBuyNumber] = useState(1);

    if (!data?.isSuccess) {
        return (
            <div>상품 정보가 없습니다.</div>
        )
    }

    const onHeartClick = () => {
        mutate(prev => ({
            ...prev!, result: [
                [...prev!.result[0]], [...prev!.result[1]], [
                    {
                        ...prev!.result[2][0],
                        user_islike: prev!.result[2][0].user_islike === 1 ? 0 : 1
                    }
                ], [...prev!.result[3]]
            ]
        }), false);
    }

    const onBuyPlusClick = () => {
        setBuyNumber(prev => prev + 1);
    }

    const onBuyMinusClick = () => {
        if (buyNumber === 1) return;
        setBuyNumber(prev => prev - 1);
    }


    return (
        <div className="px-28 pt-7">
            <div className="mb-24 grid grid-cols-[4fr_6fr] gap-16 text-sm ">
                <div className="relative w-[430px] h-[550px] bg-gray-700">
                    <Image layout="fill" objectFit='cover' src={data.result[0][0].url} />
                </div>
                <div className="">
                    <div className="mb-5 p-4">
                        <h1 className="text-2xl font-semibold mb-2">
                            {data.result[0][0].brand_name ? `[${data.result[0][0].brand_name}]` : null}{data.result[0][0].name}</h1>
                        <h5 className="text-sm text-gray-500 ">{data.result[0][0].subname}</h5>
                    </div>
                    {data.result[0][0].discount ?
                        <div className="text-2xl font-semibold p-4">
                            <div >
                                <span>{data.result[0][0].discount_price}원</span>
                                <span className="text-orange-500 ml-2">{data.result[0][0].discount}%</span>
                            </div>
                            <div className="text-base text-gray-400 font-semibold line-through">{data.result[0][0].price}원</div>
                        </div>
                        :
                        <div className="text-2xl font-semibold p-4">{data.result[0][0].price}원</div>
                    }
                    <div className="">
                        <div className="p-4 border-b-[1px]" >
                            <div className="grid grid-cols-[2fr_8fr] py-3 ">
                                <h5>판매단위</h5>
                                <div>{data.result[0][0].sales_unit}</div>
                            </div>
                            <div className="grid grid-cols-[2fr_8fr] py-3 ">
                                <h5>중량/용량</h5>
                                <div>{data.result[0][0].weight}</div>
                            </div>
                        </div>
                        <div className="grid grid-cols-[2fr_8fr]  border-b-[1px] p-4">
                            <h5>배송구분</h5>
                            <div>{data.result[0][0].distinct_deliver}</div>
                        </div>
                        {data.result[0][0].source
                            ? <div className="grid grid-cols-[2fr_8fr]  border-b-[1px] p-4">
                                <h5>원산지</h5>
                                <div>{data.result[0][0].source}</div>
                            </div>
                            : null}
                        <div className="grid grid-cols-[2fr_8fr]  border-b-[1px] p-4 ">
                            <h5>포장타입</h5>
                            <div>{data.result[0][0].packaging_type}</div>
                        </div>
                        {data.result[0][0].allergie_info ?
                            <div className="grid grid-cols-[2.4fr_8fr] border-b-[1px] p-4">
                                <h5>알레르기정보</h5>
                                <ul className="list-disc">
                                    {data.result[0][0].allergie_info.split("\n").map((item, index) => <li key={index}>{item}</li>)}
                                </ul>
                            </div>
                            : null
                        }
                        {data.result[0][0].shelf_life ?
                            <div className="grid grid-cols-[2fr_8fr] border-b-[1px] p-4">
                                <h5>유통기한</h5>
                                <p>{data.result[0][0].shelf_life}</p>
                            </div>
                            : null
                        }
                        {data.result[0][0].notice ?
                            <div className="grid grid-cols-[2.4fr_8fr] border-b-[1px] p-4">
                                <h5>안내사항</h5>
                                <ul className="list-disc">
                                    {data.result[0][0].notice.split("\n").map((item, index) => <li key={index}>{item}</li>)}
                                </ul>
                            </div>
                            : null
                        }
                        <div className="grid grid-cols-[2fr_8fr] border-b-[1px] p-4">
                            <h1>구매수량</h1>
                            <div className='flex border-2 w-20 justify-between'>
                                <button onClick={onBuyMinusClick} className='p-1'>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
                                    </svg>
                                </button>
                                <div className="p-1 " >{buyNumber}</div>
                                <button onClick={onBuyPlusClick} className="p-1 " >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className="flex justify-end p-10 pr-0">
                            <div>
                                <span>총 상품금액:</span>
                                <span className="text-3xl font-semibold ml-6 mr-2">
                                    {data.result[0][0].discount ?
                                        data.result[0][0].discount_price * buyNumber
                                        :
                                        data.result[0][0].price * buyNumber
                                    }
                                </span>
                                <span className="text-lg">원</span>
                            </div>
                        </div>
                        <div className="flex space-x-2">
                            <button onClick={onHeartClick} className="p-4 border-2 rounded-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" className={cls(data.result[2][0].user_islike ? "text-red-500" : "", "h-7 w-7")} viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                </svg>
                            </button>
                            <button className="p-4 border-2 rounded-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                </svg>
                            </button>
                            <Button backcolor='purple' text="바로구매" size="large" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="">
                <ul className="flex  ">
                    <li className=" text-gray-500 font-semibold w-1/4 p-5 flex justify-center bg-gray-100">상품설명</li>
                    <li className=" text-gray-500 font-semibold w-1/4 p-5 flex justify-center bg-gray-100">상세정보</li>
                    <li className=" text-gray-500 font-semibold w-1/4 p-5 flex justify-center bg-gray-100">후기{`(${data.result[2][0].review_cnt})`}</li>
                    <li className=" text-gray-500 font-semibold w-1/4 p-5 flex justify-center bg-gray-100">문의</li>
                </ul>
            </div>
            <SideBar position="30vh" initScrollPosition={150} />
        </div>
    )
}


// export const getStaticPaths: GetStaticPaths = async () => {
//     return {
//         paths: [],
//         fallback: true
//     }
// }

// export const getStaticProps: GetStaticProps = async ({ params }) => {

//     const result = await (await fetch(`http://prod.hiimpedro.site:9000/app/products/${params?.id}`)).json();

//     return {
//         props: {
//             result: JSON.parse(JSON.stringify(result))
//         },
//         revalidate: 86400
//     }
// }


export default ProductDetail;