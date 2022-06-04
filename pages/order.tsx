import SemiOrderInfo from '@components/order/SemiOrderInfo';
import useMutate from '@libs/useMutate';
import { RootState } from '@modules/index';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { userInfo } from 'os';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import useSWR from 'swr';
import { ICartInfoResult } from './cart';

export interface IUserInfoResult {
    code: number;
    isSuccess: boolean;
    message: string;
    result: { name: string; phone: string; email: string; }
}

export interface IOrderInfo {
    name: string;
    phone: string;
    where: string;
    where_message: string;
    frontDoor?: string;
    frontDoor_message: string;
    message: string;
}

interface IPayResult {
    isSuccess: boolean;
    code: number;
    message: string;
    result: any
}

const Order: NextPage = () => {

    const router = useRouter();

    const { user } = useSelector((state: RootState) => state.user);
    const { data, mutate } = useSWR<ICartInfoResult>(`http://prod.hiimpedro.site:9000/app/users/${user.userIdx}/Cart`);

    const { data: userData } = useSWR<IUserInfoResult>(`http://prod.hiimpedro.site:9000/app/users/${user.userIdx}/BeforePayment`);

    const [payMutate, { data: payResult, loading }] = useMutate<IPayResult>(`http://prod.hiimpedro.site:9000/app/users/${user.userIdx}/payment`);

    const checkIdxArr = useRef<number[]>(localStorage.getItem("weKurly_buyIndx") ?
        JSON.parse(localStorage.getItem("weKurly_buyIndx")!) : null);

    const [productsArrow, setProductsArrow] = useState(false);

    const [orderInfoWindow, setOrderInfoWindow] = useState(false);

    const [orderInfo, setOrderInfo] = useState<IOrderInfo | null>(null);

    const [costInfo, setCostInfo] = useState<{ originPrice: number; discountAmount: number; discountPrice: number; } | null>(null)



    const getPayItems = () => {
        if (!data) return;
        const products = data.result[0];
        const items = checkIdxArr.current.map(number => (
            {
                product_idx: products[number].product_idx, idx: products[number].idx, price: products[number].price,
                discount: products[number].discount_price, amount: products[number].product_amount
            }));
        return items;
    }


    const onPayBtnClick = () => {
        const orderList = { orderList: getPayItems() };

        if (!orderInfo) {
            alert("배송 정보의 정보등록을 해주세요");
            return;
        }

        const priceInfo = {
            product_price: costInfo?.originPrice, delivery_fee: 0,
            product_discount: costInfo?.discountPrice,
            coupon_discount: 0, use_point: 0,
            payment_fee: costInfo?.discountPrice, earn_point: 0,
            pay_method: "카드",
        }


        const peopleInfo = {
            orderer: userData?.result.name, sender: userData?.result.name,
            recevied_name: orderInfo?.name,
            recipient_phone: orderInfo?.phone,
            deliver_method: "새벽배송",
            address: data?.result[1][0].address_main + " " + data?.result[1][0].address_desc,
            pickup_location: orderInfo?.where,
            entrance_method: orderInfo?.frontDoor,
            packaging_method: "종이포장재",
            notify_time: orderInfo?.message,
            non_release: "결제수단으로환불"
        }

        const sendData = { ...orderList, ...priceInfo, ...peopleInfo };

        payMutate(sendData);



    }

    const onArrowToggleClick = () => {
        setProductsArrow(prev => !prev);
    }

    const onOrderInfoClick = () => {
        setOrderInfoWindow(true);
    }

    const getOrderInfo = () => {
        if (!orderInfo) return "";
        let result = "";
        if (orderInfo.frontDoor) {
            if (orderInfo.frontDoor_message) {
                result = `${orderInfo.frontDoor}(${orderInfo.frontDoor_message})`;
            } else {
                result = `${orderInfo.frontDoor}`;
            }
        } else {
            result = `${orderInfo.where_message}`;
        }
        return result;
    }



    const getAllPrice = () => {

        let originPrice = 0;
        let discountPrice = 0;
        if (checkIdxArr.current.length && data?.result[0].length) {
            const { result } = data;
            for (let i = 0; i < result[0].length; i++) {
                if (!checkIdxArr.current.includes(i)) continue;
                originPrice += (+result[0][i].price * result[0][i].product_amount);
                discountPrice = discountPrice + (+result[0][i].discount_price ? +result[0][i].discount_price : +result[0][i].price) * result[0][i].product_amount;
            }

        }
        return { originPrice, discountAmount: originPrice - discountPrice, discountPrice }
    }

    useEffect(() => {
        setCostInfo(getAllPrice());
    }, [])

    useEffect(() => {
        if (!payResult) return;

        if (payResult.isSuccess) {
            alert("결제가 정상적으로 이루어졌습니다.");
            router.push("/");

        } else {
            alert("결제에 오류가 발생하였습니다.");
        }


    }, [payResult])

    return (
        <div className="px-28 py-12 relative  grid grid-areas-layout grid-cols-layout gird-rows-layout">
            <Script src="https://js.tosspayments.com/v1" strategy='afterInteractive' />
            <h1 className="grid-in-header text-center text-3xl font-medium">주문서</h1>
            <div className="grid-in-content h-full  space-y-16">
                <div>
                    <h2 className="flex border-b-[1px] border-black justify-between py-5">
                        <span className="text-lg font-semibold">주문상품</span>
                        {
                            productsArrow ?
                                <svg onClick={onArrowToggleClick} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                                </svg>
                                :
                                <svg onClick={onArrowToggleClick} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                </svg>
                        }
                    </h2>
                    {
                        productsArrow ?
                            <ul>
                                {checkIdxArr.current.map((item: number, index) =>
                                    <li key={index} className="grid grid-cols-[1fr_8fr_1fr_1.5fr] py-7 items-center border-b-[1px]">
                                        <img src={data?.result[0][item].url} className="w-[60px] h-[75px]" />
                                        <div className="font-semibold space-y-2">
                                            <h3>{data?.result[0][item].name}</h3>
                                            {data?.result[0][item].product_desc ?
                                                <h5 className="text-sm text-gray-400">{data?.result[0][item].product_desc}</h5> : null}
                                        </div>
                                        <div>
                                            {data?.result[0][item].product_amount}개
                                        </div>
                                        {data?.result && (+data?.result[0][item].discount_price ?
                                            <div className="text-right justify-self-end font-semibold">
                                                <h3>{+data?.result[0][item].discount_price * data?.result[0][item].product_amount}원</h3>
                                                <h5 className="line-through text-gray-400 text-sm">{+data?.result[0][item].price * data?.result[0][item].product_amount}원</h5>
                                            </div>
                                            :
                                            <div className="text-right justify-self-end font-semibold">
                                                <h3>{+data?.result[0][item].price * data?.result[0][item].product_amount}원</h3>
                                            </div>
                                        )
                                        }
                                    </li>
                                )
                                }
                            </ul>
                            :
                            <ul>
                                <li className="p-10 border-b-[1px] text-center">
                                    <div>
                                        {`${data?.result[0][checkIdxArr.current[0]].name} 외`}
                                        <span className="text-purple-800 font-semibold">{checkIdxArr.current.length - 1}개</span>
                                        상품을 주문합니다.
                                    </div>
                                </li>
                            </ul>
                    }
                </div>
                <div>
                    <h2 className="border-b-[1px] border-black  py-5 text-lg font-semibold">주문자 정보</h2>
                    <ul className="mt-4">
                        <li className="py-3 text-sm font-medium grid grid-cols-[2.5fr_10fr]"><div>보내는 분</div> <div>{userData?.result.name}</div></li>
                        <li className="py-3 text-sm font-medium grid grid-cols-[2.5fr_10fr]"><div>휴대폰</div>
                            <div>{userData?.result.phone.substring(0, 3)}-{userData?.result.phone.substring(3, 7)}-{userData?.result.phone.substring(7)}</div>
                        </li>
                        <li className="py-3 text-sm font-medium grid grid-cols-[2.5fr_10fr]"><div>이메일</div><div>{userData?.result.email}</div></li>
                    </ul>
                </div>
                <div>
                    <h2 className="border-b-[1px] border-black  py-5 text-lg font-semibold">배송 정보</h2>
                    <ul className="mt-4">
                        <li className="py-3 text-sm font-medium grid grid-cols-[2.5fr_10fr]">
                            <div >배송지</div>
                            <div className="space-y-1">
                                {data && data.result[1][0].default_yn === "Y" ?
                                    <div className="p-1  w-24 text-center rounded-xl  bg-gray-300 text-xs">기본 배송지</div>
                                    :
                                    null
                                }
                                <p>{data && data.result[1][0].address_main + " " + data.result[1][0].address_desc}</p>
                                <div>샛별배송</div>
                            </div>
                        </li>
                        <li className="py-3 text-sm font-medium grid grid-cols-[2.5fr_10fr]">
                            <div>상세 정보</div>
                            <div className="space-y-2">
                                {orderInfo ?
                                    <div className="w-48 h-11  space-y-1">
                                        <div className="space-x-2 flex itesm-center">
                                            <span>{orderInfo.where}</span>
                                            <span>|</span>
                                            <span>{getOrderInfo()}</span>
                                        </div>
                                        <div className="space-x-2">
                                            <span>배송완료 메시지</span>
                                            <span>|</span>
                                            <span>{orderInfo.message}</span>
                                        </div>
                                    </div>
                                    : null}
                                <div onClick={onOrderInfoClick} className="border-2 cursor-pointer text-xs w-20 py-1 text-center">정보 등록</div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="grid-in-payway   ">
                <div>
                    <div>
                        <h2 className="border-b-[1px] border-black  py-5 text-lg font-semibold">쿠폰/적립금</h2>
                        <ul className="h-[200px] ">
                            <li className="py-3 text-sm font-medium grid grid-cols-[2.5fr_10fr]">
                                <div>쿠폰적용</div>
                                <div className="w-full border-[1px] bg-gray-100 p-3 px-5 flex justify-between">
                                    <span>사용가능 쿠폰0개/전체0개</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </li>
                            <li className="py-3 text-sm font-medium grid grid-cols-[2.5fr_10fr]">
                                <div>적립금 적용</div>
                                <div>사용 가능한 적립금이 없습니다.</div>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="border-b-[1px] border-black  py-5 text-lg font-semibold">결제 수단</h2>
                        <li className="py-3 text-sm font-medium grid grid-cols-[2.5fr_10fr]">
                            <div>결제수단 선택</div>
                            <div className="space-y-2">
                                <button className="w-2/3 p-4 bg-blue-500 text-white text-xl font-semibold">toss</button>
                                <div className="w-2/3">
                                    <button className="w-1/3  p-4 border-2">신용카드</button>
                                    <button className="w-1/3  p-4 border-2 border-x-0">간편결제</button>
                                    <button className="w-1/3  p-4 border-2">휴대폰</button>
                                </div>
                            </div>
                        </li>
                    </div>
                </div>
            </div>
            <div className="  grid-in-paycost ml-5 w-full h-[200px]  sticky top-14">
                <h1 className="text-lg font-semibold py-4">결제금액</h1>
                <ul className="bg-gray-100 border-[1px] p-5 space-y-5">
                    <li className="space-y-2" >
                        <div className="flex justify-between"><span>주문금액</span><span> {costInfo?.discountPrice}원</span></div>
                        <div className="flex justify-between text-sm text-gray-500"><span>ㄴ 상품금액</span><span>{costInfo?.originPrice}원</span></div>
                        <div className="flex justify-between text-sm text-gray-500"><span>ㄴ 상품할인금액</span><span>{costInfo?.discountAmount}원</span></div>
                    </li>
                    <li className="flex justify-between"><span>배송비</span><span>0원</span></li>
                    <li className="flex justify-between"><span>쿠폰할인금액</span><span>0원</span></li>
                    <li className="flex justify-between"><span>적립금 사용</span><span>0원</span></li>
                    <li className="flex justify-between border-t-2 py-5"><span>최종결제금액</span><span className="text-xl font-semibold">{costInfo?.discountPrice}원</span></li>
                </ul>
            </div>
            <button onClick={onPayBtnClick} className=" mt-28 absolute -bottom-[300px] left-1/2 -translate-x-1/2 bg-purple-800 text-white p-5 w-1/3">{costInfo?.discountPrice}원 결제하기</button>
            {orderInfoWindow ? <SemiOrderInfo userInfo={userData ? userData.result : null} orderInfo={orderInfo} setOrderInfoWindow={setOrderInfoWindow} setOrderInfo={setOrderInfo} /> : null}
        </div>
    )
}

// grid grid-cols-[3fr_1.2fr] gap-5 
export default Order;