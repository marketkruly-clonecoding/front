import { cls } from '@libs/cls';
import { Product, ProductDetail, ProductList } from '@libs/types';
import useMutate from '@libs/useMutate';
import { RootState } from '@modules/index';
import { closeCartWindow, openCartAlarm } from '@modules/product';
import { ICartInfoResult } from 'pages/cart';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useSWR from 'swr';




const StoreInCart = ({ info }: { info: [Info: Product, ListInfo: [] | ProductList[]] }) => {

    const dispatch = useDispatch();
    const { user } = useSelector((state: RootState) => state.user);
    const [mutate, { loading }] = useMutate(`http://prod.hiimpedro.site:9000/app/products/${info[0].product_idx || ""}/addcart`);
    const { data, mutate: cartMutate } = useSWR<ICartInfoResult>(`http://prod.hiimpedro.site:9000/app/users/${user.userIdx}/Cart`);

    const [buyNumbers, setBuyNumbers] = useState(info[1].length > 1 ? info[1].map(item => 1) : [1]);

    const getAllCost = () => {
        let result = 0;
        if (buyNumbers.length === 1) {
            result += (info[0].discount_price ? +info[0].discount_price * buyNumbers[0]
                : +info[0].price * buyNumbers[0]);
        } else if (buyNumbers.length > 1) {
            info[1].forEach((item, index) => {
                if (item.discount_price) {
                    result += (+item.discount_price * buyNumbers[index]);
                } else {
                    result += (+item.origin_price * buyNumbers[index]);
                }
            })

        }
        return result;
    }

    const onSubmit = () => {
        if (loading) return;
        if (buyNumbers.length === 1) {
            mutate({ addCartList: [{ product_detail_idx: 0, count: buyNumbers[0] }] });
        } else if (buyNumbers.length > 1) {
            mutate({ addCartList: info[1].map((list, index) => ({ product_detail_idx: list.index, count: buyNumbers[index] })) });
        }
        dispatch(openCartAlarm(info[0]));
        dispatch(closeCartWindow());
        cartMutate(prev => ({ ...prev!, result: [[...prev!.result[0], { ...prev!.result[0][1] }], [...prev!.result[1]]] }), false);
    }



    const onCloseClick = () => {
        dispatch(closeCartWindow());
    }

    const onItemClick = (key: "Product" | "List") => (e: React.MouseEvent) => {
        const plusBtn = (e.target as HTMLElement).closest("[data-plus]") as HTMLElement;
        const minusBtn = (e.target as HTMLElement).closest("[data-minus]") as HTMLElement;

        if (plusBtn) {
            if (key === "Product") {
                if (info[0].maxminum_purchase && +info[0].maxminum_purchase <= buyNumbers[0]) {
                    alert(`최대 ${info[0].maxminum_purchase}개 까지입니다.`)
                    return;
                }
                setBuyNumbers(prev => [prev[0] + 1]);

            } else if (key === "List") {
                const { dataset: { plus } } = plusBtn;
                if (!plus) return;
                if (info[0].maxminum_purchase && +info[0].maxminum_purchase <= buyNumbers[+plus]) {
                    alert(`최대 ${info[0].maxminum_purchase}개 까지입니다.`)
                    return;
                }
                setBuyNumbers(prev => {
                    const newArr = [...prev];
                    newArr[+plus] += 1;
                    return newArr
                })
            }


        }

        if (minusBtn) {
            if (key === "Product") {
                if (buyNumbers[0] === 1) return;
                setBuyNumbers(prev => [prev[0] - 1]);
            } else if (key === "List") {
                const { dataset: { minus } } = minusBtn;
                if (!minus || buyNumbers[+minus] === 1) return;
                setBuyNumbers(prev => {
                    const newArr = [...prev];
                    newArr[+minus] -= 1;
                    return newArr
                })


            }

        }

    }

    return (
        <div className="fixed top-0 left-0 z-30 w-full h-full bg-[rgba(15,15,15,0.5)] flex justify-center items-center">
            <div className={cls(info[1].length === 1 ? "h-[300px]" : "", "w-[430px]  rounded-md bg-white p-8 flex flex-col justify-between")}>
                {
                    info[1].length !== 0 ?
                        <div onClick={onItemClick("List")} className="h-[80vh] overflow-auto space-y-10">
                            <h1 className="p-5 border-b-2 border-black">{info[0].brand_name ? `[${info[0].brand_name}]` : null} {info[0].name}</h1>
                            {info[1].map((item, index) =>
                                <div key={index} className="space-y-20">
                                    <div className="grid grid-cols-[4fr_1fr] ">
                                        <div className="text-left text-sm space-y-2">
                                            <div> {info[0].brand_name ? `[${info[0].brand_name}]` : null} {item.name}</div>
                                            {
                                                item.discount_price ?
                                                    <div className="font-semibold space-x-1">
                                                        <span className="line-through">{item.origin_price}원</span>
                                                        <span>{item.discount_price}원</span>
                                                    </div>
                                                    :
                                                    <div className="font-semibold">{item.origin_price}원</div>
                                            }
                                        </div>

                                        <div className='flex border-2 w-20 justify-between justify-self-end items-center'>
                                            <button data-minus={index} className='p-1'>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
                                                </svg>
                                            </button>
                                            <div className="p-1 " >{buyNumbers[index]}</div>
                                            <button data-plus={index} className="p-1 " >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>)}
                            <div className="grid grid-cols-[4fr_1.5fr]">
                                <div className="text-left text-sm">합계</div>
                                <div className="justify-self-end text-xl font-semibold">{getAllCost()}원</div>
                            </div>
                        </div>
                        :
                        <div onClick={onItemClick("Product")} className="space-y-20">
                            <div className="grid grid-cols-[4fr_1fr] ">
                                <div className="text-left text-sm space-y-2">
                                    <div> {info[0].brand_name ? `[${info[0].brand_name}]` : null} {info[0].name}</div>
                                    {
                                        info[0].discount ?
                                            <div className="font-semibold space-x-1">
                                                <span className="line-through">{info[0].price}원</span>
                                                <span>{info[0].discount_price}원</span>
                                            </div>
                                            :
                                            <div className="font-semibold">{info[0].price}원</div>
                                    }
                                </div>

                                <div className='mt-5 flex border-2 w-20 justify-between justify-self-end items-center'>
                                    <button data-minus="0" className='p-1'>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
                                        </svg>
                                    </button>
                                    <div className="p-1 " >{buyNumbers[0]}</div>
                                    <button data-plus="0" className="p-1 " >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <div className="grid grid-cols-[4fr_1.5fr]">
                                <div className="text-left text-sm">합계</div>
                                <div className="justify-self-end text-xl font-semibold">{getAllCost()}원</div>
                            </div>
                        </div>
                }
                <div className="flex w-full space-x-1">
                    <button onClick={onCloseClick} className="w-1/2 border-[1px] rounded-sm py-5">취소</button>
                    <button onClick={onSubmit} className="w-1/2 bg-purple-800 text-white rounded-sm py-4">장바구니 담기</button>
                </div>
            </div>
        </div>
    )
}

export default StoreInCart;