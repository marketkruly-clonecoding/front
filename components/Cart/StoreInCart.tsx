import { Product } from '@libs/types';
import { closeCartWindow } from '@modules/product';
import { useDispatch } from 'react-redux';

const StoreInCart = ({ info }: { info: Product }) => {

    const dispatch = useDispatch();

    const onCloseClick = () => {
        dispatch(closeCartWindow());
    }

    return (
        <div className="absolute top-0 left-0 z-30 w-full h-full bg-[rgba(15,15,15,0.5)] flex justify-center items-center">
            <div className="w-[430px] h-[300px] rounded-md bg-white p-8 flex flex-col justify-between">
                <div className="space-y-20">
                    <div className="grid grid-cols-[4fr_1fr] ">
                        <div className="text-left text-sm space-y-2">
                            <div> {info.brand_name ? `[${info.brand_name}]` : null} {info.name}</div>
                            <div className="font-semibold">1690원</div>
                        </div>
                        <div className='flex border-2 w-20 justify-between justify-self-end items-center'>
                            <button className='p-1'>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
                                </svg>
                            </button>
                            <div className="p-1 " >1</div>
                            <button className="p-1 " >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className="grid grid-cols-[4fr_1fr]">
                        <div className="text-left text-sm">합계</div>
                        <div className="justify-self-end text-xl font-semibold">900원</div>
                    </div>
                </div>
                <div className="flex w-full space-x-1">
                    <button onClick={onCloseClick} className="w-1/2 border-[1px] rounded-sm py-5">취소</button>
                    <button className="w-1/2 bg-purple-800 text-white rounded-sm py-4">장바구니 담기</button>
                </div>
            </div>
        </div>
    )
}

export default StoreInCart;