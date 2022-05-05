import { cls } from '@libs/cls';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Logo from "../../public/images/마켓컬리.png"
import Category from './Category';

const Navigation = () => {

    const [category, setCategory] = useState(false);

    const onCategoryEnter = () => {
        setCategory(true);
    }

    const onCategoryMouseLeave = () => {
        setCategory(false);
    }


    return (
        <>
            <div className="flex h-[100px]  justify-between items-start px-32 pt-3">
                <div className=" text-xs p-1 px-2 border-2  rounded-2xl"><span className="text-purple-800 font-semibold">샛별,택배</span> 배송안내</div>
                <div className="relative w-32 h-32 ">
                    <Image layout="fill" objectFit='contain' src={Logo} />
                </div>
                <div className="text-xs space-x-3">
                    <span className="cursor-pointer">회원가입</span>
                    <span>|</span>
                    <span className="cursor-pointer">로그인</span>
                    <span>|</span>
                    <span className="cursor-pointer">고객센터</span>
                </div>
            </div>
            <ul className="w-full sticky top-0 bg-white z-10 flex items-center px-32 space-x-10 shadow-lg">
                <li onMouseEnter={onCategoryEnter} onMouseLeave={onCategoryMouseLeave} className="flex relative   py-4  cursor-pointer hover:text-purple-800">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                    <span className="ml-2">전체 카테고리</span>
                    {category ? <Category onCategoryEnter={onCategoryEnter} onCategoryMouseLeave={onCategoryMouseLeave} /> : null}
                </li>
                <li className="cursor-pointer hover:text-purple-800">신상품</li>
                <li className="cursor-pointer hover:text-purple-800">베스트</li>
                <li className="cursor-pointer hover:text-purple-800">알뜰쇼핑</li>
                <li className="cursor-pointer hover:text-purple-800">특가/혜택</li>
                <li className="cursor-pointer flex  p-2 px-4 rounded-2xl bg-gray-100  ">
                    <input className="outline-none text-xs mr-2 w-[170px] bg-gray-100" placeholder="검색어를 입력해주세요" />
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </li>
                <li className=" cursor-pointer  flex justify-between space-x-5 ">
                    <svg xmlns="http://www.w3.org/2000/svg" className="hover:text-purple-800 h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" className=" hover:text-purple-800 h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" className="hover:text-purple-800 h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                </li>
            </ul>

        </>
    )
}

export default Navigation;