import { Dispatch, SetStateAction, useEffect } from 'react';
import { useForm } from 'react-hook-form';


interface ISemiOrderForm {
    where: string;
    frontDoor?: string;
}

interface ISemiOrderInfo {
    setOrderInfoWindow: Dispatch<SetStateAction<boolean>>
}

const SemiOrderInfo = ({ setOrderInfoWindow }: ISemiOrderInfo) => {

    const { register, handleSubmit, watch } = useForm<ISemiOrderForm>();

    const where = watch("where");
    const frontDoor = watch("frontDoor");

    const onCloseClick = () => {
        setOrderInfoWindow(false);
    }

    return (
        <div className="fixed overflow-auto p-8 w-[40vw] h-[100vh]  top-1/2 left-1/2  -translate-x-1/2 -translate-y-1/2  bg-white shadow-xl z-30">
            <header className="flex  justify-between items-center">
                <h1 className="text-2xl font-semibold">배송정보</h1>
                <button className="flex items-center">
                    <div className="w-6 h-6 p-1  rounded-full mr-3 border-2 flex justify-center items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <span className="text-sm">주문자 정보와 동일</span>
                </button>
            </header>
            <main className="mt-6">
                <form className="space-y-5">
                    <div className="space-y-2">
                        <h2 className="">받으실 분 <span className="text-red-500">*</span></h2>
                        <input className="border-[1px]  rounded-sm p-2 border-gray-300 w-full" />
                    </div>
                    <div className="space-y-2">
                        <h2>휴대폰 <span className="text-red-500">*</span></h2>
                        <input className="border-[1px]  rounded-sm p-2 border-gray-300 w-full" />
                    </div>

                    <div>
                        <h2 className="mb-5">받으실 장소 <span className="text-red-500">*</span></h2>
                        <div className="flex flex-col">
                            <div className="flex items-center space-x-3 mb-5">
                                <input {...register("where", { required: true })} defaultChecked className="w-6 h-6" type="radio" id="문앞" name="where" value="문앞">
                                </input>
                                <label htmlFor="문앞">문 앞</label>
                            </div>

                        </div>
                        <div className="flex items-center space-x-3 mb-5">
                            <input {...register("where", { required: true })} className="w-6 h-6" type="radio" id="경비실" name="where" value="경비실"></input>
                            <label htmlFor="경비실">경비실</label>
                        </div>
                        <div className="flex items-center space-x-3 mb-5">
                            <input {...register("where", { required: true })} className="w-6 h-6" type="radio" id="택배함" name="where" value="택배함"></input>
                            <label htmlFor="택배함">택배함</label>

                        </div>
                        <div className="flex items-center space-x-3 mb-5">
                            <input {...register("where", { required: true })} className="w-6 h-6" type="radio" id="기타장소" name="where" value="기타장소"></input>
                            <label htmlFor="기타장소">기타장소</label>
                        </div>
                        <div>
                            {where === "문앞" ?
                                <div className="">
                                    <h2 className="mb-5 font-semibold">공동현관 출입방법 <span className="text-red-500">*</span></h2>
                                    <div className="flex flex-col  mb-5 space-y-5">
                                        <div className="flex items-center space-x-3 ">
                                            <input {...register("frontDoor")} className="w-6 h-6" type="radio" defaultChecked id="공동현관" name="frontDoor" value="공동현관"></input>
                                            <label htmlFor="공동현관">공동현관비밀번호</label>
                                        </div>
                                        {
                                            frontDoor === "공동현관" ?
                                                <input className="border-[1px]  rounded-sm p-2 border-gray-300 w-full" type="text" placeholder="예:#1234*" />
                                                : null
                                        }
                                    </div>
                                    <div className="flex items-center space-x-3 mb-5">
                                        <input {...register("frontDoor")} className="w-6 h-6" type="radio" id="자유 출입 가능" name="frontDoor" value="자유 출입 가능"></input>
                                        <label htmlFor="자유 출입 가능">자유 출입 가능</label>
                                    </div>
                                    <div className="mb-5 ">
                                        <div className="flex items-center space-x-3 mb-5">
                                            <input {...register("frontDoor")} className="w-6 h-6" type="radio" id="기타" name="frontDoor" value="기타"></input>
                                            <label htmlFor="기타">기타</label>
                                        </div>
                                        {frontDoor === "기타" ?
                                            <textarea className="placeholder:text-sm  w-full   resize-none  border-2 p-3" placeholder='예: 연락처로 전화, 경비실 호출(배송 시간은 별도로 지정할 수 없습니다.'></textarea>
                                            : null}
                                    </div>
                                </div>
                                : null}
                            {where === "경비실" ?
                                <div>
                                    <h3 className="mb-5 font-semibold ">경비실 특이사항</h3>
                                    <textarea className="placeholder:text-sm  w-full resize-none  border-2 p-3" placeholder="경비실 위치 등 특이사항이 있을 경우 작성해주세요"></textarea>
                                </div>
                                : null}
                            {where === "택배함" ?
                                <div className="space-y-5">
                                    <div>
                                        <h2 className="mb-5 font-semibold">택배함 정보 <span className="text-red-500">*</span></h2>
                                        <input className="border-[1px]  rounded-sm p-2 border-gray-300 w-full" type="text" placeholder="택배함 위치/택배함 번호, 비밀먼호" />
                                    </div>
                                    <div>
                                        <h2 className="mb-5 font-semibold">공동현관 출입방법 <span className='text-red-500'>*</span></h2>
                                        <div className="flex flex-col  mb-5 space-y-5">
                                            <div className="flex items-center space-x-3 ">
                                                <input {...register("frontDoor")} className="w-6 h-6" type="radio" defaultChecked id="공동현관" name="frontDoor" value="공동현관"></input>
                                                <label htmlFor="공동현관">공동현관비밀번호</label>
                                            </div>
                                            {
                                                frontDoor === "공동현관" ?
                                                    <input className="border-[1px]  rounded-sm p-2 border-gray-300 w-full" type="text" placeholder="예:#1234*" />
                                                    : null
                                            }
                                        </div>
                                        <div className="flex items-center space-x-3 mb-5">
                                            <input {...register("frontDoor")} className="w-6 h-6" type="radio" id="자유 출입 가능" name="frontDoor" value="자유 출입 가능"></input>
                                            <label htmlFor="자유 출입 가능">자유 출입 가능</label>
                                        </div>
                                        <div className="mb-5 ">
                                            <div className="flex items-center space-x-3 mb-5">
                                                <input {...register("frontDoor")} className="w-6 h-6" type="radio" id="기타" name="frontDoor" value="기타"></input>
                                                <label htmlFor="기타">기타</label>
                                            </div>
                                            {frontDoor === "기타" ?
                                                <textarea className="placeholder:text-sm  w-full   resize-none  border-2 p-3" placeholder='예: 연락처로 전화, 경비실 호출(배송 시간은 별도로 지정할 수 없습니다.'></textarea>
                                                : null}
                                        </div>
                                    </div>

                                </div>
                                : null}
                            {where === "기타장소" ?
                                <div>
                                    <h3 className="mb-5 font-semibold ">기타 장소 세부 사항 <span className="text-red-500">*</span></h3>
                                    <textarea className="placeholder:text-sm  w-full   resize-none  border-2 p-3" placeholder="예: 계단 밑,주택단지 앞 경비초소를 지나 A동 출입구 (배송 시간은 별도로 지정할 수 없습니다)"></textarea>
                                </div>
                                : null}
                        </div>
                    </div>
                    <div>
                        <h2>배송 완료 메시지 전송 <span className="text-red-500">*</span></h2>
                        <div className="flex w-full py-6">
                            <div className="w-1/2 flex items-center space-x-2">
                                <input className="w-6 h-6" type="radio" id="배송직후" name="message" value="배송직후"></input>
                                <label htmlFor="배송직후">배송직후</label>
                            </div>
                            <div className="w-1/2 flex items-center space-x-2">
                                <input className="w-6 h-6" type="radio" id="오전7시" name="message" value="오전7시"></input>
                                <label htmlFor="오전7시">오전7시</label>
                            </div>
                        </div>
                    </div>
                    <div className="w-full space-x-1">
                        <button onClick={onCloseClick} type="button" className="w-[49%] p-2 border-2 rounded-md">취소</button>
                        <button className="w-[49%] p-2  rounded-md bg-purple-800 text-white">저장</button>
                    </div>
                </form>
            </main>
        </div>
    )
}

export default SemiOrderInfo;