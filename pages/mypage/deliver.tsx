import AddressFix from '@components/MyPage/AddressFix';
import AddressWindow from '@components/MyPage/AddressWindow';
import MyInfo from '@components/MyPage/MyInfo';
import MyNav from '@components/MyPage/MyNav';
import SideBar from '@components/SideBar';
import { cls } from '@libs/cls';
import execDaumPostcode from '@libs/execDaumPostcode';
import useMutate from '@libs/useMutate';
import { RootState } from '@modules/index';
import { time } from 'console';
import { NextPage } from 'next';
import Script from 'next/script';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import useSWR from 'swr';

export interface IAddressInfo {
    address_desc: string;
    address_idx: number;
    address_main: string;
    default_yn: "Y" | "N";
    is_like: "Y" | "N";
    recevied_name: string;
    recevied_phone: string;
    idx?: number;
}

export interface IGetAddressResult {
    code: number;
    isSuccess: boolean;
    message: string;
    result: IAddressInfo[];
}

const MyDeliverPage: NextPage = () => {

    const [addAddressInfo, setAddAddressInfo] = useState("");
    const [fixAddressInfo, setFixAddressInfo] = useState<IAddressInfo | null>(null);
    const [likeClickInfo, setLikeClickInfo] = useState<IAddressInfo | null>();
    const { user } = useSelector((state: RootState) => state.user);
    const { data, mutate } = useSWR<IGetAddressResult>(`http://prod.hiimpedro.site:9000/app/users/${user.userIdx}/Address`);
    const [likemutate] = useMutate(`http://prod.hiimpedro.site:9000/app/users/${user.userIdx}/Address/${likeClickInfo?.address_idx}/like`, true);


    const onAddAddressClick = () => {
        execDaumPostcode(setAddAddressInfo);
    }

    const onFixAddressOrLikeClick = (e: React.MouseEvent) => {
        const fixBtn = (e.target as Element).closest("[data-id]") as HTMLElement;
        const likeBtn = (e.target as Element).closest("[data-like]") as HTMLElement;
        if (fixBtn) {
            const { dataset: { id } } = fixBtn;
            if (!data?.result || !id) return;
            setFixAddressInfo({ ...data.result[+id], idx: +id });
        }
        if (likeBtn) {
            const { dataset: { like } } = likeBtn;
            if (!data?.result || !like) return;
            setLikeClickInfo({ ...data.result[+like], idx: +like });
        }

    }



    useEffect(() => {
        if (!data) return;
        likemutate("");

        let originArr = [...data.result];
        console.log("원래", originArr);

        originArr = originArr.map((item, idx) => {
            if (item.is_like === "Y") {
                return { ...item, is_like: "N" }
            } else if (+idx === likeClickInfo?.idx) {
                return { ...item, is_like: "Y" }
            } else {
                return item;
            }
        })

        console.log("바뀌고", originArr);

        mutate(prev => ({ ...prev!, result: originArr }), false);
    }, [likeClickInfo])

    return (
        <div>
            <Script
                src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
                strategy="beforeInteractive"
            ></Script>
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
                        <button onClick={onAddAddressClick} className="flex items-center space-x-2" >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                            </svg>
                            <div>새 배송지 추가</div>
                        </button>
                    </header>
                    <ul onClick={onFixAddressOrLikeClick} className="">
                        <li className="grid grid-cols-[1fr_5fr_1.5fr_1.5fr_1.5fr_1fr] py-5 justify-items-center border-b-[1px] border-black">
                            <span>선택</span>
                            <span>주소</span>
                            <span>받으실 분</span>
                            <span>연락처</span>
                            <span>배송유형</span>
                            <span>수정</span>
                        </li>
                        {data?.result?.map((item, index) =>
                            <li key={index} className="cursor-pointer border-b-[1px] grid grid-cols-[1fr_5fr_1.5fr_1.5fr_1.5fr_1fr] py-5 justify-items-center items-center">
                                <button data-like={index} >
                                    <svg xmlns="http://www.w3.org/2000/svg" className={cls(item.is_like === "Y" ? "text-purple-800" : "", "h-6 w-6")} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </button>
                                <div className="justify-self-start">
                                    {item.default_yn === "Y" ? <div className="text-xs rounded-xl bg-gray-100 w-20 text-center py-1 mb-2 text-gray-500 font-semibold">기본 배송지</div> : null}
                                    <div>{item.address_main + " " + item.address_desc}</div>
                                </div>
                                <div className="text-sm">{item.recevied_name && item.recevied_name}</div>
                                <div className="text-sm">
                                    {item.recevied_phone && item.recevied_phone.substring(0, 3) + "-" + item.recevied_phone.substring(3, 7) + "-" + item.recevied_phone.substring(7)}</div>
                                <div className="text-purple-800 text-sm font-semibold">샛별배송</div>
                                <button data-id={index}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                    </svg>
                                </button>
                            </li>)}
                    </ul>
                </div>
            </div>
            {addAddressInfo ? <AddressWindow addressMutate={mutate} info={addAddressInfo} setAddAddressInfo={setAddAddressInfo} /> : null}
            {fixAddressInfo ? <AddressFix addressMutate={mutate} fixAddressInfo={fixAddressInfo} setFixAddressInfo={setFixAddressInfo} /> : null}

        </div>
    )
}

export default MyDeliverPage;