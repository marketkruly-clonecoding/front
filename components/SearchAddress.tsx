import execDaumPostcode from '@libs/execDaumPostcode';
import { inputSelectAddress } from '@modules/user';
import Script from 'next/script';
import { ISignUpForm } from 'pages/signup';
import { useEffect, useState } from 'react';
import { UseFormRegister } from 'react-hook-form';
import { useDispatch } from 'react-redux';

interface ISearchAddress {
    register: UseFormRegister<ISignUpForm>;
}

const SearchAddress = ({ register }: ISearchAddress) => {
    const [address, setAddress] = useState("");
    const dispatch = useDispatch();




    return (
        <div className="w-full">
            <Script
                src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
                strategy="beforeInteractive"
            ></Script>
            {address ?
                <div className="grid gap-x-2 grid-cols-[3fr_1fr]">
                    <div className="space-y-2">
                        <input {...register("address_main", { required: true })} className="border-2 rounded-sm w-full p-3 text-sm" value={address} />
                        <input {...register("address_sub", { required: true })} className="border-2 rounded-sm w-full p-3 text-sm" placeholder="나머지 주소를 입력해주세요" />
                    </div>
                    <button onClick={() => execDaumPostcode(setAddress)} type="button" className="rounded-sm self-start  flex justify-center items-center p-2  border-2 border-purple-800 text-purple-800 w-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <span className="ml-2">재검색</span>
                    </button>

                </div>
                :
                <button onClick={() => execDaumPostcode(setAddress)} type="button" className="flex justify-center items-center p-3 border-2 border-purple-800 text-purple-800 w-3/4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <span className="ml-2">주소검색</span>
                </button>
            }

            <div className="text-xs mt-3">배송지에 따라 상품 정보가 달라질 수 있습니다.</div>
        </div>
    )

}

export default SearchAddress;