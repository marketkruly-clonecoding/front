import { cls } from '@libs/cls';
import { RootState } from '@modules/index';
import { login, logout } from '@modules/user';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Logo from "../../public/images/마켓컬리.png"
import Category from './Category';
import Cookies from 'universal-cookie';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import StoreAlarm from '@components/Cart/StoreAlarm';
import useSWR from 'swr';
import { ICartInfoResult } from 'pages/cart';

const cookies = new Cookies();


interface ISearchForm {
    search: string;
}

const Navigation = () => {

    const [category, setCategory] = useState(false);
    const [serviceCenter, setServiceCenter] = useState(false);
    const [myInfoContainer, setMyInfoContainer] = useState(false);

    const { register, handleSubmit, reset } = useForm<ISearchForm>();

    const { user: { user }, cartAlarmInfo } = useSelector((state: RootState) => ({ user: state.user, cartAlarmInfo: state.product.cartAlarmInfo }));
    const { data, mutate } = useSWR<ICartInfoResult>(`http://prod.hiimpedro.site:9000/app/users/${user.userIdx}/Cart`);


    const dispatch = useDispatch();
    const router = useRouter();



    const onValid = ({ search }: ISearchForm) => {
        router.push(`/${search}`);
        reset();

    }


    const onCategoryEnter = () => {
        setCategory(true);
    }

    const onCategoryMouseLeave = () => {
        setCategory(false);
    }

    const onServiceMouseEnter = () => {
        setServiceCenter(true);
    }

    const onServiceMouseLeave = () => {
        setServiceCenter(false);
    }

    const onMyInfoMouseEnter = () => {
        setMyInfoContainer(true);
    }
    const onMyInfoMouseLeave = () => {
        setMyInfoContainer(false);
    }

    const onLogOutClick = () => {
        cookies.remove("weKurly_access_token");
        localStorage.removeItem("weKurlyuser");
        dispatch(logout());
        router.push("/");
    }

    useEffect(() => {
        const userInStore = localStorage.getItem("weKurlyuser");
        if (userInStore) {
            const userInfo = JSON.parse(userInStore);
            dispatch(login(userInfo));
        }
    }, [])


    return (
        <>
            <div className="flex h-[100px]  justify-between items-start px-28 pt-3">
                <div className=" text-xs p-1 px-2 border-2  rounded-2xl"><span className="text-purple-800 font-semibold">샛별,택배</span> 배송안내</div>
                <Link href="/">
                    <a>
                        <div className="relative w-28 h-28 ">
                            <Image layout="fill" objectFit='contain' src={Logo} />
                        </div>
                    </a>
                </Link>
                <div className="text-xs space-x-3 relative">
                    {user.name ?
                        <>
                            <Link href="/mypage">
                                <a onMouseEnter={onMyInfoMouseEnter} onMouseLeave={onMyInfoMouseLeave} className="cursor-pointer  p-1">
                                    <span className="border-[1px] px-2 text-xs border-gray-600 mr-1 rounded-xl">웰컴</span>
                                    {user.name}  님
                                </a>
                            </Link>
                            {myInfoContainer ?
                                <ul onMouseEnter={onMyInfoMouseEnter} onMouseLeave={onMyInfoMouseLeave} className="border-[1px] border-gray-300 w-28 p-2 absolute right-20 top-5 z-40 bg-white space-y-2 ">
                                    <li className="cursor-pointer">
                                        <Link href="/mypage"><a>주문내역</a></Link>
                                    </li>
                                    <li className="cursor-pointer">
                                        <Link href="/mypage/gift"><a>선물내역</a></Link>
                                    </li>
                                    <li className="cursor-pointer">
                                        <Link href="/mypage/like"><a>찜한 상품</a></Link>
                                    </li>
                                    <li className="cursor-pointer">
                                        <Link href="/mypage/deliver"><a>배송지 관리</a></Link>
                                    </li>
                                    <li className="cursor-pointer">
                                        <Link href="/mypage/review"><a>상품 후기</a></Link>
                                    </li>
                                    <li className="cursor-pointer">
                                        <Link href="/mypage/inquiry"><a>상품 문의</a></Link>
                                    </li>
                                    <li className="cursor-pointer">
                                        <Link href="/mypage/point"><a>적립금</a></Link>
                                    </li>
                                    <li className="cursor-pointer">
                                        <Link href="/mypage"><a>쿠폰</a></Link>
                                    </li>
                                    <li className="cursor-pointer">
                                        <Link href="/mypage/fix"><a>개인 정보 수정</a></Link>
                                    </li>
                                    <li onClick={onLogOutClick} className="cursor-pointer">
                                        로그아웃
                                    </li>
                                </ul>
                                : null}
                        </>
                        :
                        <>
                            <Link href="/signup"><a className="cursor-pointer">회원가입</a></Link>
                            <span>|</span>
                            <Link href="/login"><a className="cursor-pointer">로그인</a></Link>
                        </>
                    }
                    <span>|</span>
                    <span onMouseEnter={onServiceMouseEnter} onMouseLeave={onServiceMouseLeave} className="cursor-pointer p-1">고객센터</span>
                    {serviceCenter ?
                        <ul onMouseEnter={onServiceMouseEnter} onMouseLeave={onServiceMouseLeave} className="border-[1px] w-28 p-2 absolute right-0 top-5 z-40 bg-white space-y-2 ">
                            <li className="cursor-pointer">공지사항</li>
                            <li className="cursor-pointer">자주하는 질문</li>
                            <li className="cursor-pointer">1:1문의</li>
                            <li className="cursor-pointer">대량주문 문의</li>
                            <li className="cursor-pointer">상품 제안</li>
                            <li className="cursor-pointer">에코포장 피드백</li>
                        </ul>
                        : null}
                </div>
            </div>
            <ul className="w-full sticky top-0 bg-white z-30 flex items-center px-28 space-x-10 shadow-lg">
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
                    <form onSubmit={handleSubmit(onValid)}>
                        <input {...register("search", { required: true })} className="outline-none text-xs mr-2 w-[170px] bg-gray-100" placeholder="검색어를 입력해주세요" />
                        <button>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>
                    </form>
                </li>
                <li className="relative cursor-pointer  flex justify-between space-x-5 ">
                    <svg xmlns="http://www.w3.org/2000/svg" className="hover:text-purple-800 h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" className=" hover:text-purple-800 h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <Link href={"/cart"}>
                        <a>
                            <svg xmlns="http://www.w3.org/2000/svg" className="hover:text-purple-800 h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            {data && data.result[0].length ?
                                <div className="absolute -top-1 z-10 -right-2 bg-purple-800 w-6 h-4 text-white rounded-xl text-xs flex justify-center items-center">{data.result[0].length}</div>
                                :
                                null
                            }
                        </a>
                    </Link>
                    {cartAlarmInfo ? <StoreAlarm info={cartAlarmInfo} /> : null}
                </li>
            </ul>

        </>
    )
}

export default Navigation;