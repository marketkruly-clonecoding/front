import { cls } from '@libs/cls';
import useMutate from '@libs/useMutate';
import { RootState } from '@modules/index';
import { IAddressInfo, IGetAddressResult } from 'pages/mypage/deliver';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { KeyedMutator } from 'swr';


interface IAddressFixForm {
    address_desc: string;
    recevied_name: string;
    recevied_phone: string;
}


interface IAddressFix {
    fixAddressInfo: IAddressInfo | null;
    setFixAddressInfo: Dispatch<SetStateAction<IAddressInfo | null>>
    addressMutate: KeyedMutator<IGetAddressResult>
}

const AddressFix = ({ setFixAddressInfo, fixAddressInfo, addressMutate }: IAddressFix) => {

    const [defaultCheck, setDefaultCheck] = useState(false);
    const { user } = useSelector((state: RootState) => state.user);
    const { register, handleSubmit, setValue } = useForm<IAddressFixForm>();
    const [mutate, { data }] = useMutate(`http://prod.hiimpedro.site:9000/app/users/${user.userIdx}/Address/${fixAddressInfo?.address_idx}`, true);

    const onValid = (data: IAddressFixForm) => {
        const submitData = { ...data, default_yn: defaultCheck ? "Y" : "N" };
        mutate(submitData);
        setFixAddressInfo(null);
    }

    const onDefaultToggleClick = () => {
        setDefaultCheck(prev => !prev);
    }
    const onCloseClick = () => {
        setFixAddressInfo(null);
    }




    useEffect(() => {
        if (fixAddressInfo) {
            setValue("address_desc", fixAddressInfo.address_desc);
            setValue("recevied_name", fixAddressInfo.recevied_name);
            setValue("recevied_phone", fixAddressInfo.recevied_phone);
        }
    }, [])

    return (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-6 w-[500px] h-[550px] z-30 bg-white border-2 shadow-2xl">
            <button onClick={onCloseClick} className="absolute top-3 right-5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
            </button>
            <h1 className="text-xl font-semibold mb-5">배송지 수정</h1>
            <form onSubmit={handleSubmit(onValid)} className="space-y-5">
                <div className="space-y-3">
                    <div className="font-medium">{fixAddressInfo?.address_main}</div>
                    <input {...register("address_desc", { required: true })} className="w-full border-[1px] p-2 rounded-sm" placeholder="나머지 주소를 입력해주세요" />
                </div>
                <div className="space-y-3">
                    <div>받으실 분</div>
                    <input {...register("recevied_name", { required: true })} className="w-full border-[1px] p-2 rounded-sm" placeholder="이름을 입력해주세요" />
                </div>
                <div className="space-y-3">
                    <div>휴대폰</div>
                    <input {...register("recevied_phone", { required: true })} className="w-full border-[1px] p-2 rounded-sm" placeholder="번호를 입력해주세요" />
                </div>
                <button onClick={onDefaultToggleClick} className="flex items-center space-x-2" type="button">
                    <div className={cls(defaultCheck ? "bg-purple-800" : "", "border-2 rounded-full p-1 ")}>
                        <svg xmlns="http://www.w3.org/2000/svg" className={cls(defaultCheck ? "text-white" : "", "h-5 w-5")} viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <span className="text-sm">기본 배송지로 저장</span>
                </button>
                <div className="space-y-2">
                    <button className="w-full  rounded-sm p-2 bg-purple-800 text-white">저장</button>
                    <button className="w-full border-[1px] rounded-sm p-2">삭제</button>
                </div>

            </form>
        </div>
    )

}

export default AddressFix;