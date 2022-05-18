import MyInfo from '@components/MyPage/MyInfo';
import MyNav from '@components/MyPage/MyNav';
import SideBar from '@components/SideBar';
import { NextPage } from 'next';

const MyDeliverPage: NextPage = () => {

    return (
        <div>
            <SideBar position="35vh" initScrollPosition={200} />
            <MyInfo />
            <div className="bg-white px-28 flex">
                <MyNav />
                <div className="w-full pl-8 ">
                    <header className="flex pt-10 pb-10 justify-between w-full border-b-2 border-black">
                        <div className="flex items-center">
                            <h1 className="text-xl font-semibold">배송지 관리</h1>
                            <h3 className="text-xs font-semibold ml-3 text-gray-600">배송지에 따라 상품정보 및 배송유형이 달라질 수 있습니다.</h3>
                        </div>
                        <button className="flex items-center space-x-2" >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                            </svg>
                            <div>새 배송지 추가</div>
                        </button>
                    </header>
                    <ul className="">
                        <li className="grid grid-cols-[1fr_5fr_1.5fr_1.5fr_1.5fr_1fr] py-5 justify-items-center border-b-[1px] border-black">
                            <span>선택</span>
                            <span>주소</span>
                            <span>받으실 분</span>
                            <span>연락처</span>
                            <span>배송유형</span>
                            <span>수정</span>
                        </li>
                        <li className="border-b-[1px] grid grid-cols-[1fr_5fr_1.5fr_1.5fr_1.5fr_1fr] py-5 justify-items-center items-center">
                            <button>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </button>
                            <div>
                                <div className="text-xs rounded-xl bg-gray-100 w-20 text-center py-1 mb-2 text-gray-500 font-semibold">기본 배송지</div>
                                <div>경기 안산시 상록구 해양4로 31(그랑시티자이) 그랑시티자이 1차 109동 2101호</div>
                            </div>
                            <div></div>
                            <div></div>
                            <div className="text-purple-800 text-sm font-semibold">샛별배송</div>
                            <button>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                </svg>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default MyDeliverPage;