import Button from '@components/Button';
import MyInfo from '@components/MyPage/MyInfo';
import MyNav from '@components/MyPage/MyNav';
import SideBar from '@components/SideBar';
import { NextPage } from 'next';

const MyLikePage: NextPage = () => {

    return (
        <div>
            <MyInfo />
            <SideBar position="35vh" initScrollPosition={200} />
            <div className="bg-white px-28 flex">
                <MyNav />
                <div className="w-full pl-8 ">
                    <header className="flex pt-10 pb-11 justify-between w-full border-b-2 border-black">
                        <div className="flex items-center">
                            <h1 className="text-xl font-semibold">찜한 상품(0)</h1>
                            <h3 className="text-xs font-semibold ml-3 text-gray-600">찜한 상품은 최대 200개까지 저장됩니다.</h3>
                        </div>
                    </header>
                    <ul className="">
                        <div className=" w-full  text-xs text-gray-400 p-48 flex flex-col justify-center items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                            <h1 className="mt-4 mb-2 text-base text-gray-400">찜한 상품이 없습니다.</h1>
                            <button className="px-8 rounded-sm text-white py-3 bg-purple-800 ">베스트 상품 보기</button>
                        </div>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default MyLikePage;