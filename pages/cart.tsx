
import CartItem from '@components/Cart/CartItem';

const Cart = () => {

    return (
        <div className="px-28 pt-10">
            <h1 className="text-3xl text-center">장바구니</h1>
            <div className="grid grid-cols-[7fr_3fr]">
                <div>
                    <div className="flex  text-sm font-semibold text-gray-600 pt-16 pb-3">
                        <button className="mr-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="text-gray-300 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </button>
                        <div>
                            전체선택
                            (0/5)
                        </div>
                        <span className="mx-5">|</span>
                        <div>선택삭제</div>
                    </div>
                    <CartItem />
                    <CartItem />
                    <CartItem />
                    <CartItem />
                    <div className="flex border-t-2  text-sm font-semibold text-gray-600 pt-5 pb-3">
                        <button className="mr-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="text-gray-300 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </button>
                        <div>
                            전체선택
                            (0/5)
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
                            경기 안산시 상록구 해양4로 31 (그랑시티자이) 그랑시티자이 1차 109동 2101호
                            <div className="mt-2 text-sm text-purple-800">샛별배송</div>
                        </div>
                        <button className="border-[1px] rounded-sm text-sm mt-2 py-1 border-purple-800 text-purple-800 w-full">배송지 변경</button>
                    </div>
                    <div className="p-5 bg-gray-100 text-lg">
                        <div className="flex justify-between py-2"><span>상품금액</span><span>0원</span></div>
                        <div className="flex justify-between py-2"><span>상품금액</span><span>0원</span></div>
                        <div className="flex justify-between py-2"><span>상품금액</span><span>0원</span></div>
                        <div className="flex justify-between border-t-2 py-5"><span>결제예정금액</span><span>0원</span></div>
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