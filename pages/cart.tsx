
import CartItem from '@components/Cart/CartItem';
import DeliverSetting from '@components/Cart/DeliverSetting';
import { cls } from '@libs/cls';
import { AddressInCartInfo, ICartItem } from '@libs/types';
import useMutate from '@libs/useMutate';
import { RootState } from '@modules/index';
import { useRouter } from 'next/router';
import Script from 'next/script';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import useSWR from 'swr';


export interface ICartInfoResult {
    code: number;
    isSuccess: boolean;
    message: string;
    result: [CartItem: ICartItem[], Addres: AddressInCartInfo[]]
}




interface IAmount {
    is_type: 0 | 1;
    product_detail_idx: number;
    product_idx: number;
}

// 냉동 냉장 상온 

interface SeparateData {
    [key: string]: ICartItem[];
    freezer: ICartItem[];
    fridge: ICartItem[];
    normal: ICartItem[];
}
interface Separate {
    [key: string]: string;
    냉동: string;
    냉장: string;
    상온: string;
}

const SeparateType: Separate = {
    "냉동": "freezer",
    "냉장": "fridge",
    "상온": "normal"
}

type SeparateKeyType = "freezer" | "fridge" | "normal";



const Cart = () => {

    const { user } = useSelector((state: RootState) => state.user);
    const { data, mutate } = useSWR<ICartInfoResult>(user?.userIdx ? `/app/users/${user.userIdx}/Cart` : "");


    const [amount, setAmount] = useState<IAmount | null>(null);
    const [fixAmount, { loading }] = useMutate(`/app/users/${user.userIdx}/Cart/${amount?.product_idx}/count`, true);
    const [kindData, setKindData] = useState<SeparateData>({ freezer: [], fridge: [], normal: [] });

    const router = useRouter();

    const [checkIdxArr, setCheckIdxArr] = useState<string[]>([]);
    const [kindBtns, setKindBtns] = useState({ freezer: true, fridge: true, normal: true });
    const [addressFixBtn, setAddressFixBtn] = useState(false);

    const { data: test } = useSWR(`http://prod.hiimpedro.site:9000/app/products/product?Category=${encodeURIComponent("22")}&Pages=1`);
    console.log(test);
    const getFindLikeAddress = () => {
        const likeAddress = data?.result[1].find(item => item.is_like === "Y");
        if (!likeAddress) return "";

        return likeAddress.address_main + " " + likeAddress.address_desc
    }

    const getAllPrice = () => {

        let originPrice = 0;
        let discountPrice = 0;
        const { freezer, fridge, normal } = kindData;

        if (freezer.length) {
            for (let i = 0; i < freezer.length; i++) {
                if (!checkIdxArr.includes(SeparateType[freezer[i].type] + "-" + i)) continue;

                originPrice += (+freezer[i].price * freezer[i].product_amount);
                discountPrice = discountPrice + (+freezer[i].discount_price ? +freezer[i].discount_price : +freezer[i].price) * freezer[i].product_amount;
            }
        }

        if (fridge.length) {
            for (let i = 0; i < fridge.length; i++) {
                if (!checkIdxArr.includes(SeparateType[fridge[i].type] + "-" + i)) continue;

                originPrice += (+fridge[i].price * fridge[i].product_amount);
                discountPrice = discountPrice + (+fridge[i].discount_price ? +fridge[i].discount_price : +fridge[i].price) * fridge[i].product_amount;
            }

        }
        if (normal.length) {
            for (let i = 0; i < normal.length; i++) {
                if (!checkIdxArr.includes(SeparateType[normal[i].type] + "-" + i)) continue;

                originPrice += (+normal[i].price * normal[i].product_amount);
                discountPrice = discountPrice + (+normal[i].discount_price ? +normal[i].discount_price : +normal[i].price) * normal[i].product_amount;
            }
        }

        return { originPrice, discountAmount: originPrice - discountPrice, discountPrice }
    }


    const onAddressClick = () => {
        setAddressFixBtn(true);
    }

    const onArrowToggleClick = (key: "freezer" | "fridge" | "normal") => () => {

        setKindBtns(prev => ({ ...prev, [key]: !prev[key] }));
    }

    const isAllInCheckArr = () => data?.result.length && checkIdxArr.length === data?.result[0].length;

    const onAllCheckClick = () => {
        if (!data) return;
        if (!isAllInCheckArr()) {
            // setCheckIdxArr(Array.from({ length: data.result[0].length }, (v, i) => data.result[0][i].type + "-" + i));
            const allData = [
                ...kindData.freezer.map((item, index) => `freezer-${index}`),
                ...kindData.fridge.map((item, index) => `fridge-${index}`),
                ...kindData.normal.map((item, index) => `normal-${index}`),
            ];

            setCheckIdxArr(allData);
        } else {
            setCheckIdxArr([]);
        }
    }



    const onItemBoxClick = (e: React.MouseEvent) => {
        const checkBtn = (e.target as HTMLElement).closest("[data-check]") as HTMLElement;
        const plusBtn = (e.target as HTMLElement).closest("[data-plus]") as HTMLElement;
        const minusBtn = (e.target as HTMLElement).closest("[data-minus]") as HTMLElement;
        if (!data || data?.result[0].length === 0) return;

        if (checkBtn) {
            const { dataset: { check, type } } = checkBtn;
            if (!check) return;
            const newCheckArr = [...checkIdxArr];
            const index = newCheckArr.findIndex(item => item === type + "-" + check);
            if (index !== -1) {
                newCheckArr.splice(index, 1);
            } else {
                newCheckArr.push(type + "-" + check);
            }
            console.log(newCheckArr);
            setCheckIdxArr(newCheckArr);
        }
        if (plusBtn) {
            const { dataset: { plus, type } } = plusBtn;
            if (!plus || !type) return;
            const newResult = [...kindData[type!]];
            const newCheckArr = { ...kindData[type!][+plus], product_amount: kindData[type!][+plus].product_amount + 1 };
            newResult[+plus] = newCheckArr;
            setKindData(prev => ({ ...prev, [type]: newResult }));
            setAmount({
                is_type: 1,
                product_detail_idx: kindData[type!][+plus].idx !== 0 ? kindData[type!][+plus].idx : 0,
                product_idx: kindData[type!][+plus].product_idx
            });
        }
        if (minusBtn) {
            const { dataset: { minus, type } } = minusBtn;
            if (!minus || !type) return;
            if (kindData[type][+minus].product_amount === 1) return;
            const newResult = [...kindData[type]];
            const newCheckArr = { ...kindData[type][+minus], product_amount: kindData[type][+minus].product_amount - 1 };
            newResult[+minus] = newCheckArr;
            setKindData(prev => ({ ...prev, [type]: newResult }));
            setAmount({
                is_type: 0,
                product_detail_idx: kindData[type][+minus].idx !== 0 ? kindData[type][+minus].idx : 0,
                product_idx: kindData[type][+minus].product_idx
            });
        }
    }


    const onBuyClick = () => {
        const localArray: ICartItem[] = [];
        checkIdxArr.forEach(key => {
            const [type, index] = key.split("-");
            localArray.push(kindData[type][+index]);
        })
        localStorage.setItem("weKurly_buyIndx", JSON.stringify(localArray));

        router.push("/order");

    }

    useEffect(() => {
        if (!amount || loading) return;
        fixAmount({ product_detail_idx: amount.product_detail_idx, is_type: amount.is_type });
    }, [amount]);


    useEffect(() => {
        if (data && data.result[0].length) {

            const newData: SeparateData = { freezer: [], fridge: [], normal: [] };
            data.result[0].forEach(item => {
                if (item.type === "냉동") {
                    newData.freezer.push(item);
                } else if (item.type === "냉장") {
                    newData.fridge.push(item);
                } else if (item.type === "상온") {
                    newData.normal.push(item);
                }

            })
            setKindData(newData);
        }
    }, [data]);


    return (
        <div className="px-28 pt-10">
            <Script
                src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
                strategy="beforeInteractive"
            ></Script>
            <h1 className="text-3xl text-center ">장바구니</h1>
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
                        kindData.freezer.length ?
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
                                    <div onClick={onItemBoxClick}>
                                        {kindData.freezer.map((item, index) => <CartItem key={index} type="freezer" index={index} info={item} checkIdxArr={checkIdxArr} />)}
                                    </div>
                                    : null
                                }
                            </div> : null
                    }
                    {
                        kindData.fridge.length ?
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
                                    <div onClick={onItemBoxClick}>
                                        {kindData.fridge.map((item, index) => <CartItem key={index} type="fridge" index={index} info={item} checkIdxArr={checkIdxArr} />)}
                                    </div>
                                    : null
                                }
                            </div> : null
                    }
                    {
                        kindData.normal.length ?
                            <div>
                                <div className="flex justify-between items-center border-t-2 border-black py-3">
                                    <h2 className="text-lg">☀<span className="font-semibold">상온상품</span></h2>
                                    <button onClick={onArrowToggleClick("normal")}>
                                        {kindBtns.normal ?
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
                                {kindBtns.normal ?
                                    <div onClick={onItemBoxClick}>
                                        {kindData.normal.map((item, index) => <CartItem key={index} type="normal" index={index} info={item} checkIdxArr={checkIdxArr} />)}
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
                        <button onClick={onAddressClick} className="border-[1px] rounded-sm text-sm mt-2 py-1 border-purple-800 text-purple-800 w-full">배송지 변경</button>
                    </div>
                    <div className="p-5 bg-gray-100 text-lg">
                        <div className="flex justify-between py-2"><span>상품금액</span><span>{getAllPrice().originPrice}원</span></div>
                        <div className="flex justify-between py-2"><span>상품할인금액</span><span>{getAllPrice().discountAmount}원</span></div>
                        <div className="flex justify-between py-2"><span>배송비</span><span>0원</span></div>
                        <div className="flex justify-between border-t-2 py-5"><span>결제예정금액</span><span>{getAllPrice().discountPrice}원</span></div>
                    </div>
                    {checkIdxArr.length ?
                        <button onClick={onBuyClick} className="bg-purple-800 mt-5 w-full p-5 rounded-md text-white">
                            주문하기
                        </button>
                        :
                        <button className="bg-gray-300 mt-5 w-full p-5 rounded-md text-white">
                            상품을 선택해주세요
                        </button>}
                    <ul className="pl-5 w-full  text-xs text-gray-600 mt-5 space-y-2 list-disc">
                        <li>쿠폰/적립금은 주문서에서 사용 가능합니다</li>
                        <li>[배송중비중] 이전까지 주문 취소 가능합니다.</li>
                        <li className="">[마이컬리-주문내역 상세페이지]에서 직접 취소하실 수 있습니다.</li>
                    </ul>
                </div>

            </div>
            {addressFixBtn ? <DeliverSetting likeAddressMutate={mutate} setAddressFixBtn={setAddressFixBtn} /> : null}
        </div>
    )

}

export default Cart;