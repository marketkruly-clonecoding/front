import { NextPage } from 'next';

const Order: NextPage = () => {

    return (
        <div className="px-28 py-12  grid grid-areas-layout grid-cols-layout gird-rows-layout">
            <h1 className="grid-in-header text-center text-3xl font-medium">주문서</h1>
            <div className="grid-in-content h-full  space-y-16">
                <div>
                    <h2 className="flex border-b-[1px] border-black justify-between py-5">
                        <span className="text-lg font-semibold">주문상품</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                    </h2>
                    <ul>
                        <li className="p-10 border-b-[1px] text-center">[연세우유] 전용목장우유 900mL외 13개 상품을 주문합니다.</li>
                    </ul>
                </div>
                <div>
                    <h2 className="border-b-[1px] border-black  py-5 text-lg font-semibold">주문자 정보</h2>
                    <ul className="mt-4">
                        <li className="py-3 text-sm font-medium grid grid-cols-[2.5fr_10fr]"><div>보내는 분</div> <div>김명원</div></li>
                        <li className="py-3 text-sm font-medium grid grid-cols-[2.5fr_10fr]"><div>휴대폰</div><div>01041290790</div></li>
                        <li className="py-3 text-sm font-medium grid grid-cols-[2.5fr_10fr]"><div>이메일</div><div>auddnjs2008@naver.com</div></li>
                    </ul>
                </div>
                <div>
                    <h2 className="border-b-[1px] border-black  py-5 text-lg font-semibold">배송 정보</h2>
                    <ul className="mt-4">
                        <li className="py-3 text-sm font-medium grid grid-cols-[2.5fr_10fr]">
                            <div >배송지</div>
                            <div >
                                <div>기본 배송지</div>
                                <p>경기 안산시 상록구 해양4로 31 109동 2101호</p>
                                <div>샛별배송</div>
                            </div>
                        </li>
                        <li className="py-3 text-sm font-medium grid grid-cols-[2.5fr_10fr]">
                            <div>상세 정보</div>
                            <div className="space-y-2">
                                <div className="w-48 h-11 border-2"></div>
                                <div className="border-2  text-xs w-20 py-1 text-center">정보 등록</div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="grid-in-payway   ">
                <div>
                    <div>
                        <h2 className="border-b-[1px] border-black  py-5 text-lg font-semibold">쿠폰/적립금</h2>
                        <ul className="h-[200px] border-2"></ul>

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
                        <div className="flex justify-between"><span>주문금액</span><span> 335,340원</span></div>
                        <div className="flex justify-between text-sm text-gray-500"><span>ㄴ 상품금액</span><span>343,680원</span></div>
                        <div className="flex justify-between text-sm text-gray-500"><span>ㄴ 상품할인금액</span><span>-8,340원</span></div>
                    </li>
                    <li className="flex justify-between"><span>배송비</span><span>0원</span></li>
                    <li className="flex justify-between"><span>쿠폰할인금액</span><span>0원</span></li>
                    <li className="flex justify-between"><span>적립금 사용</span><span>0원</span></li>
                    <li className="flex justify-between border-t-2 py-5"><span>최종결제금액</span><span className="text-xl font-semibold">335,340원</span></li>
                </ul>
            </div>
        </div>
    )
}

// grid grid-cols-[3fr_1.2fr] gap-5 
export default Order;