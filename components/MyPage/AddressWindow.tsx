import Button from '@components/Button';
import { cls } from '@libs/cls';
import execDaumPostcode from '@libs/execDaumPostcode';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

interface IAddressWindow {
    info: string;
    setAddAddressInfo: Dispatch<SetStateAction<string>>;
}

interface IAddressForm {
    address: string;
    addressDesc: string;
}


const AddressWindow = ({ info, setAddAddressInfo }: IAddressWindow) => {

    const { register, handleSubmit, watch, setValue } = useForm<IAddressForm>();
    const [defaultCheck, setDefaultCheck] = useState(false);


    const onValid = (data: IAddressForm) => {
        console.log(data);
    }

    const onDefaultToggleClick = () => {
        setDefaultCheck(prev => !prev);
    }

    const onReSearchAddress = () => {
        execDaumPostcode(setAddAddressInfo);
    }

    const onCloseClick = () => {
        setAddAddressInfo("");
    }

    useEffect(() => {
        setValue("address", info);
    }, [info]);


    return (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-6 w-[450px] h-[400px] z-30 bg-white border-2 shadow-2xl">
            <button onClick={onCloseClick} className="absolute top-3 right-5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
            </button>
            <h1 className="text-xl mt-5 mb-3 font-semibold text-center"><span className="text-purple-800">샛별배송</span> 지역입니다.</h1>
            <h3 className="text-center text-gray-500">매일 아침, 문 앞까지 신섬함을 전해드려요.</h3>

            <div>
                <form onSubmit={handleSubmit(onValid)} className="flex flex-col space-y-3 mt-10">
                    <div className="grid grid-cols-[3fr_1fr] gap-x-2">
                        <input {...register("address", { required: true })} className="p-2 rounded-sm border-2" type="text" />
                        <button onClick={onReSearchAddress} className="rounded-sm border-2 border-purple-800 text-purple-800">재검색</button>
                    </div>
                    <input {...register("addressDesc", { required: true })} className="w-full border-2 p-2 rounded-sm" type="text" />
                    <button onClick={onDefaultToggleClick} className="flex items-center space-x-2" type="button">
                        <div className={cls(defaultCheck ? "bg-purple-800" : "", "border-2 rounded-full p-1 ")}>
                            <svg xmlns="http://www.w3.org/2000/svg" className={cls(defaultCheck ? "text-white" : "", "h-5 w-5")} viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <span className="text-sm">기본 배송지로 저장</span>
                    </button>
                    <button className="w-full bg-purple-800 text-white p-3 rounded-sm">저장</button>
                </form>
            </div>
        </div>
    )

}

export default AddressWindow;