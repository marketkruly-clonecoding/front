import MyInfo from '@components/MyPage/MyInfo';
import MyNav from '@components/MyPage/MyNav';
import { NextPage } from 'next';

const MyPointPage: NextPage = () => {

    return (
        <div>
            <MyInfo />
            <div className="bg-white px-28 flex">
                <MyNav />
                <div className="w-full pl-8 ">
                    <header className="flex  flex-col pt-10 pb-10  w-full border-b-2 border-black">
                        <div className="flex items-center mb-11">
                            <h1 className="text-xl font-semibold">적립금</h1>
                            <h3 className="text-xs font-semibold ml-3 text-gray-600">보유하고 계신 적립금의 내역을 한 눈에 확인 할 수 있습니다.</h3>
                        </div>
                        <div className="flex">
                            <div className="w-1/2 border-2 flex justify-around p-8">
                                <h5>현재 적립금</h5>
                                <span className="text-purple-800 font-semibold">0원</span>
                            </div>
                            <div className="w-1/2 border-2 flex justify-around p-8">
                                <h5>소멸예정 적립금</h5>
                                <span className="text-purple-800 font-semibold">0원</span>
                            </div>
                        </div>
                    </header>
                    <ul className="">
                        <li className="grid grid-cols-[1fr_3fr_1fr_1fr] py-5 justify-items-center border-b-[1px] border-black">
                            <span>날짜</span>
                            <span className="justify-self-start">내용</span>
                            <span>유효기간</span>
                            <span>금액</span>
                        </li>
                        <li className="border-b-2 h-32 flex justify-center items-center">
                            <p className="text-gray-500 text-sm">적립금 내역이 존재하지 않습니다.</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default MyPointPage;