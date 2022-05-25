
import CartItem from '@components/Cart/CartItem';
import { cls } from '@libs/cls';
import { AddressInCartInfo, ICartItem } from '@libs/types';
import { RootState } from '@modules/index';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import useSWR from 'swr';


interface ICartInfoResult {
    code: number;
    isSuccess: boolean;
    message: string;
    result: [CartItem: ICartItem[], Addres: AddressInCartInfo[]]
}

interface IDataKinds {
    freezer: ICartItem[], // 냉동
    fridge: ICartItem[] // 냉장        
}

const Cart = () => {

    const { user } = useSelector((state: RootState) => state.user);
    const { data, mutate } = useSWR<ICartInfoResult>(`http://prod.hiimpedro.site:9000/app/users/${user.userIdx}/Cart`);
    const [dataKinds] = useState<IDataKinds>({ freezer: [], fridge: [] });
    const [checkIdxArr, setCheckIdxArr] = useState<number[]>([]);
    const [kindBtns, setKindBtns] = useState({ freezer: true, fridge: true });

    console.log(data);

    const getFindLikeAddress = () => {
        const likeAddress = data?.result[1].find(item => item.is_like === "Y");
        if (!likeAddress) return "";

        return likeAddress.address_main + " " + likeAddress.address_desc
    }

    const getAllPrice = () => {

        let originPrice = 0;
        let discountPrice = 0;
        if (data?.result[0].length) {
            const { result } = data;
            for (let i = 0; i < result[0].length; i++) {
                if (!checkIdxArr.includes(i)) continue;
                originPrice += (+result[0][i].price * result[0][i].product_amount);
                discountPrice = discountPrice + (+result[0][i].discount_price ? +result[0][i].discount_price : +result[0][i].price) * result[0][i].product_amount;
            }

        }
        return { originPrice, discountAmount: originPrice - discountPrice, discountPrice }
    }



    const onArrowToggleClick = (key: "freezer" | "fridge") => () => {

        setKindBtns(prev => ({ ...prev, [key]: !prev[key] }));
    }

    const isAllInCheckArr = () => checkIdxArr.length === data?.result[0].length;

    const onAllCheckClick = () => {
        if (!data) return;
        if (!isAllInCheckArr()) {
            setCheckIdxArr(Array.from({ length: data.result[0].length }, (v, i) => i));
        } else {
            setCheckIdxArr([]);
        }
    }



    const onFreezerOrFridgeBoxClick = (e: React.MouseEvent) => {
        const checkBtn = (e.target as HTMLElement).closest("[data-check]") as HTMLElement;
        const plusBtn = (e.target as HTMLElement).closest("[data-plus]") as HTMLElement;
        const minusBtn = (e.target as HTMLElement).closest("[data-minus]") as HTMLElement;
        if (!data || data?.result[0].length === 0) return;

        if (checkBtn) {
            const { dataset: { check } } = checkBtn;
            if (!check) return;
            const newCheckArr = [...checkIdxArr];
            const index = newCheckArr.findIndex(item => item === +check);
            if (index !== -1) {
                newCheckArr.splice(index, 1);
            } else {
                newCheckArr.push(+check);
            }
            setCheckIdxArr(newCheckArr);
        }
        if (plusBtn) {
            const { dataset: { plus } } = plusBtn;
            if (!plus) return;
            const newResult = [...data.result[0]];
            const newCheckArr = { ...data.result[0][+plus], product_amount: data.result[0][+plus].product_amount + 1 };
            newResult[+plus] = newCheckArr;
            mutate(prev => ({ ...prev!, result: [[...newResult], [...prev!.result[1]]] }), false);

        }
        if (minusBtn) {
            const { dataset: { minus } } = minusBtn;
            if (!minus) return;
            if (data.result[0][+minus].product_amount === 1) return;
            const newResult = [...data.result[0]];
            const newCheckArr = { ...data.result[0][+minus], product_amount: data.result[0][+minus].product_amount - 1 };
            newResult[+minus] = newCheckArr;
            mutate(prev => ({ ...prev!, result: [newResult, prev!.result[1]] }), false);
        }
    }





    return (
        <div className="px-28 pt-10">
            <h1 className="text-3xl text-center">장바구니</h1>
            <div className="grid grid-cols-[7fr_3fr]">
                <div>
                    <div className="flex items-center  text-sm font-semibold text-gray-600 pt-16 pb-3">
                        <div className="flex cursor-pointer items-center" onClick={onAllCheckClick} >
                            <button className={cls(isAllInCheckArr() ? "bg-purple-800" : "", "mr-2 border-2 rounded-full p-1")}>
                                <svg xmlns="http://www.w3.org/2000/svg" className={cls(isAllInCheckArr() ? "text-white" : "", "h-5 w-5")} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                            </button>
                            <div className="select-none" >
                                전체선택
                                {checkIdxArr.length}/{data?.result[0].length}
                            </div>
                        </div>
                        <span className="mx-5">|</span>
                        <div>선택삭제</div>
                    </div>
                    {
                        data?.result[0].filter(item => item.type !== "냉장").length ?
                            <div>
                                <div className="flex justify-between items-center border-t-2 border-black py-3">
                                    <h2 className="text-lg">🧊<span className="font-semibold">냉동상품</span></h2>
                                    <button onClick={onArrowToggleClick("freezer")}>
                                        {kindBtns.freezer ?
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                                            </svg>
                                            :
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                            </svg>
                                        }
                                    </button>
                                </div>
                                {kindBtns.freezer ?
                                    <div onClick={onFreezerOrFridgeBoxClick}>
                                        {data?.result[0].filter(item => item.type !== "냉장").map((item, index) => <CartItem key={index} index={index} info={item} checkIdxArr={checkIdxArr} />)}
                                    </div>
                                    : null
                                }
                            </div> : null
                    }
                    {
                        data?.result[0].filter(item => item.type === "냉장").length ?
                            <div>
                                <div className="flex justify-between items-center border-t-2 border-black py-3">
                                    <h2 className="text-lg">💧 <span className="font-semibold">냉장상품</span></h2>
                                    <button onClick={onArrowToggleClick("fridge")}>
                                        {kindBtns.fridge ?
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                                            </svg>
                                            :
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                            </svg>
                                        }
                                    </button>
                                </div>
                                {kindBtns.fridge ?
                                    <div onClick={onFreezerOrFridgeBoxClick}>
                                        {data?.result[0].filter(item => item.type === "냉장").map((item, index) => <CartItem key={index} index={index} info={item} checkIdxArr={checkIdxArr} />)}
                                    </div>
                                    : null
                                }
                            </div> : null
                    }
                    <div className="flex items-center  border-t-2  text-sm font-semibold text-gray-600 pt-5 pb-3">
                        <div className="flex cursor-pointer items-center" onClick={onAllCheckClick} >
                            <button className={cls(isAllInCheckArr() ? "bg-purple-800" : "", "mr-2 border-2 rounded-full p-1")}>
                                <svg xmlns="http://www.w3.org/2000/svg" className={cls(isAllInCheckArr() ? "text-white" : "", "h-5 w-5")} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                            </button>
                            <div className="select-none" >
                                전체선택
                                {checkIdxArr.length}/{data?.result[0].length}
                            </div>
                        </div>
                        <span className="mx-5">|</span>
                        <div>선택삭제</div>
                    </div>
                </div>
                <div className=" mt-24 ml-6">
                    <div className="p-5 border-2">
                        <div className="flex">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span className="ml-2 mb-3">배송지</span>
                        </div>
                        <div>
                            {getFindLikeAddress()}
                            <div className="mt-2 text-sm text-purple-800">샛별배송</div>
                        </div>
                        <button className="border-[1px] rounded-sm text-sm mt-2 py-1 border-purple-800 text-purple-800 w-full">배송지 변경</button>
                    </div>
                    <div className="p-5 bg-gray-100 text-lg">
                        <div className="flex justify-between py-2"><span>상품금액</span><span>{getAllPrice().originPrice}원</span></div>
                        <div className="flex justify-between py-2"><span>상품할인금액</span><span>{getAllPrice().discountAmount}원</span></div>
                        <div className="flex justify-between py-2"><span>배송비</span><span>0원</span></div>
                        <div className="flex justify-between border-t-2 py-5"><span>결제예정금액</span><span>{getAllPrice().discountPrice}원</span></div>
                    </div>
                    <button className="bg-gray-300 mt-5 w-full p-5 rounded-md text-white">
                        상품을 선택해주세요
                    </button>
                    <ul className="pl-5 w-full  text-xs text-gray-600 mt-5 space-y-2 list-disc">
                        <li>쿠폰/적립금은 주문서에서 사용 가능합니다</li>
                        <li>[배송중비중] 이전까지 주문 취소 가능합니다.</li>
                        <li className="">[마이컬리-주문내역 상세페이지]에서 직접 취소하실 수 있습니다.</li>
                    </ul>
                </div>

            </div>
        </div>
    )

}

export default Cart;