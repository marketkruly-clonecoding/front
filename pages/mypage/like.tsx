import Button from '@components/Button';
import MyInfo from '@components/MyPage/MyInfo';
import MyNav from '@components/MyPage/MyNav';
import SideBar from '@components/SideBar';
import { cls } from '@libs/cls';
import { Product } from '@libs/types';
import { RootState } from '@modules/index';
import { NextPage } from 'next';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import useSWR from 'swr';


interface FavoriteResponse {
    code: number;
    isSuccess: boolean;
    message: string;
    result: [Product[]];
}


const MyLikePage: NextPage = () => {


    const { user } = useSelector((state: RootState) => state.user);


    const { data } = useSWR<FavoriteResponse>(user.userIdx ? `/app/users/${user.userIdx}/favorite` : "");
    console.log(data);

    return (
        <div>
            <MyInfo />
            <SideBar position="35vh" initScrollPosition={200} />
            <div className="bg-white px-28 flex">
                <MyNav />
                <div className="w-full pl-8 ">
                    <header className="flex pt-10 pb-11 justify-between w-full border-b-2 border-black">
                        <div className="flex items-center">
                            <h1 className="text-xl font-semibold">찜한 상품({data?.result[0].length})</h1>
                            <h3 className="text-xs font-semibold ml-3 text-gray-600">찜한 상품은 최대 200개까지 저장됩니다.</h3>
                        </div>
                    </header>
                    <ul className="">
                        {data?.result[0].length ?
                            data.result[0].map((item, index) =>
                                <li key={index} className="grid grid-cols-[1fr_10fr_1fr] p-5 gap-x-4">
                                    <div className="w-[60px] h-[78px] bg-gray-400" >
                                        <img src={item.url} className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <h2> {item.brand_name ? `[${item.brand_name}]` : null} {item.name}</h2>
                                        <div className="space-x-2">
                                            {item.discount ? <span className="text-orange-400 font-semibold">{item.discount}%</span> : null}
                                            {item.discount ? <span className="font-semibold">{item.discount_price}원</span> : null}
                                            <span className={cls(item.discount ? "text-sm text-gray-400 line-through" : "")}>{item.price}원</span>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <button className="border-[1px] rounded-sm text-sm py-2 w-24">삭제</button>
                                        <button className="border-[1px] rounded-sm text-sm py-2 text-purple-600 w-24 border-purple-600"> 담기</button>
                                    </div>
                                </li>)
                            :
                            <div className=" w-full  text-xs text-gray-400 p-48 flex flex-col justify-center items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                                <h1 className="mt-4 mb-2 text-base text-gray-400">찜한 상품이 없습니다.</h1>
                                <button className="px-8 rounded-sm text-white py-3 bg-purple-800 ">베스트 상품 보기</button>
                            </div>}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default MyLikePage;