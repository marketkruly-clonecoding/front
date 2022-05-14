import MyInfo from '@components/MyPage/MyInfo';
import MyNav from '@components/MyPage/MyNav';
import { NextPage } from 'next';

const MyPage: NextPage = () => {

    return (
        <div>
            <MyInfo />
            <div className="bg-white px-28 flex">
                <MyNav />
                <div className="w-full pl-8 ">
                    <header className="flex pt-10 pb-6 justify-between w-full border-b-2 border-black">
                        <div className="flex items-center">
                            <h1 className="text-xl font-semibold">주문 내역</h1>
                            <h3 className="text-xs font-semibold ml-3 text-gray-600">지난 3년간의 주문 내역 조회가 가능합니다.</h3>
                        </div>
                        <select className="pl-4 pr-14 text-sm flex py-3  border-2 outline-none">
                            <option className=" border-gray-200" value="전체기간">전체기간</option>
                            <option value="2022년">2022년</option>
                            <option value="2021년">2021년</option>
                            <option value="2020년">2020년</option>
                        </select>
                    </header>
                    <ul className="min-h-[125px] border-b-2">
                        <div className="min-h-[125px] w-full h-full text-xs text-gray-400 flex justify-center items-center">
                            주문내역이 없습니다.
                        </div>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default MyPage;