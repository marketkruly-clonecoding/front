import AddressFix from '@components/MyPage/AddressFix';
import { cls } from '@libs/cls';
import useMutate from '@libs/useMutate';
import { RootState } from '@modules/index';
import { ICartInfoResult } from 'pages/cart';
import { IAddressInfo, IGetAddressResult } from 'pages/mypage/deliver';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import useSWR, { KeyedMutator } from 'swr';

interface IDeliverSetting {
    setAddressFixBtn:
    React.Dispatch<React.SetStateAction<boolean>>;
    likeAddressMutate: KeyedMutator<ICartInfoResult>
}

const DeliverSetting = ({ setAddressFixBtn, likeAddressMutate }: IDeliverSetting) => {

    const { user } = useSelector((state: RootState) => state.user);
    const { data, mutate } = useSWR<IGetAddressResult>(`http://prod.hiimpedro.site:9000/app/users/${user.userIdx}/Address`);
    const [likeClickInfo, setLikeClickInfo] = useState<IAddressInfo | null>(null);
    const [fixAddressInfo, setFixAddressInfo] = useState<IAddressInfo | null>(null);
    const [likemutate] = useMutate(`http://prod.hiimpedro.site:9000/app/users/${user.userIdx}/Address/${likeClickInfo?.address_idx}/like`, true);



    const onFixOrLikeClick = (e: React.MouseEvent) => {
        const likeBtn = (e.target as Element).closest("[data-like]") as HTMLElement;
        const fixBtn = (e.target as Element).closest("[data-id]") as HTMLElement;

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
        if (!data || !likeClickInfo) return;
        likemutate("");

        let originArr = [...data.result];

        originArr = originArr.map((item, idx) => {
            if (item.is_like === "Y") {
                return { ...item, is_like: "N" }
            } else if (+idx === likeClickInfo?.idx) {
                return { ...item, is_like: "Y" }
            } else {
                return item;
            }
        })

        mutate(prev => ({ ...prev!, result: originArr }), false);
        const { address_main, address_desc, default_yn, recevied_name, recevied_phone } = likeClickInfo
        const newdata = { address_main, address_desc, default_yn, recevied_name, recevied_phone, is_like: "Y" };

        likeAddressMutate(prev => ({ ...prev!, result: [[...prev!.result[0]], [newdata]] }), false);
        setAddressFixBtn(false);
    }, [likeClickInfo])


    return (

        fixAddressInfo ?
            <AddressFix fixAddressInfo={fixAddressInfo} setFixAddressInfo={setFixAddressInfo} addressListMutate={mutate} addressMutate={likeAddressMutate} />
            :
            <div className="fixed  top-1/2 left-1/2  -translate-x-1/2 -translate-y-1/2  bg-white shadow-xl z-30">
                <button onClick={() => setAddressFixBtn(false)} className="absolute top-3 right-5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </button>
                <div className=" p-10">
                    <header className="flex space-x-3 items-center">
                        <h1 className="text-3xl" >배송지</h1>
                        <h3 className="text-sm text-gray-600">배송지에 따라 상품정보 및 배송유형이 달라질 수 있습니다.</h3>
                    </header>
                    <main className="mt-5">
                        <ul onClick={onFixOrLikeClick} className="h-[50vh] overflow-auto">
                            <li className="grid grid-cols-[1.5fr_8fr_1.5fr] justify-items-center p-3 border-t-2 border-b-[1px] border-black">
                                <div>선택</div>
                                <div>배송 정보</div>
                                <div>수정</div>
                            </li>
                            {data?.result.map((item, index) =>
                                <li className="grid grid-cols-[1.5fr_8fr_1.5fr] justify-items-center py-5 border-b-[1px]">
                                    <button data-like={index} className={cls(item.is_like === "Y" ? "bg-purple-800" : "", "mr-2 border-2 rounded-full h-8 w-8 p-1")}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className={cls(item.is_like === "Y" ? "text-white" : "", "h-5 w-5")} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </button>
                                    <div className="justify-self-start space-y-2">
                                        <div>{item.address_main + " " + item.address_desc} </div>
                                        {item.recevied_name ?
                                            <div className="space-x-2 text-sm text-gray-600">
                                                <span>{item.recevied_name}</span>
                                                <span>|</span>
                                                <span>{item.recevied_phone.substring(0, 3) + "-" + item.recevied_phone.substring(3, 7) +
                                                    "-" + item.recevied_phone.substring(7)}</span>
                                            </div>
                                            :
                                            null}
                                    </div>
                                    <button data-id={index}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                        </svg>
                                    </button>
                                </li>)}
                        </ul>
                    </main>
                </div>
                <button className="border-t-[1px] w-full  p-5">+ 새 배송지 추가</button>
            </div>

    )
}

export default DeliverSetting;