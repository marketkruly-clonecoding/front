import Button from '@components/Button';
import SideBar from '@components/SideBar';
import { NextPage } from 'next';

const ProductDetail: NextPage = () => {
    return (
        <div className="px-28 pt-7">
            <div className="mb-24 grid grid-cols-[4fr_6fr] gap-16 text-sm ">
                <div className="w-[430px] h-[550px] bg-gray-700" />
                <div className="">
                    <div className="mb-5 p-4">
                        <h1 className="text-2xl font-semibold mb-2">[업체배송](과일)세지 멜론 5kg</h1>
                        <h5 className="text-sm text-gray-500 ">나주 세지에서 온 부드러운 달콤함</h5>
                    </div>
                    <div className="text-2xl font-semibold p-4">43,000원</div>
                    <div className="">
                        <div className="p-4 border-b-[1px]" >
                            <div className="grid grid-cols-[2fr_8fr] py-3 ">
                                <h5>판매단위</h5>
                                <div>1박스</div>
                            </div>
                            <div className="grid grid-cols-[2fr_8fr] py-3 ">
                                <h5>중량/용량</h5>
                                <div>5kg</div>
                            </div>
                        </div>
                        <div className="grid grid-cols-[2fr_8fr]  border-b-[1px] p-4">
                            <h5>배송구분</h5>
                            <div>택배</div>
                        </div>
                        <div className="grid grid-cols-[2fr_8fr]  border-b-[1px] p-4">
                            <h5>원산지</h5>
                            <div>국산</div>
                        </div>
                        <div className="grid grid-cols-[2fr_8fr]  border-b-[1px] p-4 ">
                            <h5>포장타입</h5>
                            <div>냉장/스트로폼</div>
                        </div>
                        <div className="grid grid-cols-[2fr_8fr] border-b-[1px] p-4">
                            <h5>유통기한</h5>
                            <p>농산물이므로 별도의 유통기한은 없으나 가급적 빠르게 드시기 바랍니다.</p>
                        </div>
                        <div className="grid grid-cols-[2fr_8fr] border-b-[1px] p-4">
                            <h5>안내사항</h5>
                            <ul>
                                <li>-상품 특성상 중량에 3%내외의 차이가 있을 수 있습니다.</li>
                                <li>-신선식품 특성상 원물마다 크기 및 형태가 일정하지 않을 수 있습니다.</li>
                            </ul>
                        </div>
                        <div className="grid grid-cols-[2fr_8fr] border-b-[1px] p-4">
                            <h1>구매수량</h1>
                            <div className='flex border-2 w-20 justify-between'>
                                <button className='p-1'>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
                                    </svg>
                                </button>
                                <div className="p-1 " >1</div>
                                <button className="p-1 " >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className="flex justify-end p-10 pr-0">
                            <div>
                                <span>총 상품금액:</span>
                                <span className="text-3xl font-semibold ml-6 mr-2">43,000</span>
                                <span className="text-lg">원</span>
                            </div>
                        </div>
                        <div className="flex space-x-2">
                            <button className="p-4 border-2 rounded-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
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
                    <li className=" text-gray-500 font-semibold w-1/4 p-5 flex justify-center bg-gray-100">후기(1)</li>
                    <li className=" text-gray-500 font-semibold w-1/4 p-5 flex justify-center bg-gray-100">문의</li>
                </ul>
            </div>
            <SideBar position="30vh" initScrollPosition={150} />
        </div>
    )
}

export default ProductDetail;