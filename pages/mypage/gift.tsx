import MyInfo from '@components/MyPage/MyInfo';
import MyNav from '@components/MyPage/MyNav';
import { NextPage } from 'next';

const MyGiftPage: NextPage = () => {

    return (
        <div>
            <MyInfo />
            <div className="bg-white px-28 flex">
                <MyNav />
                <div className="w-full pl-8 ">
                    <header className="flex pt-10 pb-6 justify-between w-full border-b-2 border-black">
                        <div className="flex items-center">
                            <h1 className="text-xl font-semibold">선물 내역</h1>
                            <h3 className="text-xs font-semibold ml-3 text-gray-600">지난 3년간의 주문 내역 조회가 가능합니다.</h3>
                        </div>
                        <select className="pl-4 pr-14 text-sm flex py-3  border-2 outline-none">
                            <option className=" border-gray-200" value="전체기간">전체기간</option>
                            <option value="2022년">2022년</option>
                            <option value="2021년">2021년</option>
                            <option value="2020년">2020년</option>
                        </select>
                    </header>
                    <ul className="">
                        <div className=" w-full  text-xs text-gray-400 p-48 flex flex-col justify-center items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                            </svg>
                            <h1 className="mt-4 mb-2 text-base text-black">선물 내역이 없습니다.</h1>
                            <h2>선물하기 서비스는 마켓컬리 앱에서 이용할 수 있습니다.</h2>
                        </div>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default MyGiftPage;