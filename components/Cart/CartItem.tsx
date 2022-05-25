import { cls } from '@libs/cls';
import { ICartItem } from '@libs/types';

interface ICartItemProps {
    info: ICartItem;
    checkIdxArr: number[];
    index: number;
}

const CartItem = ({ info, checkIdxArr, index }: ICartItemProps) => {

    return (

        <div className="grid grid-cols-[1fr_2fr_10fr_3fr_3fr_1fr] items-center py-6">
            <button data-check={index} className={cls(checkIdxArr.includes(index) ? " text-white bg-purple-800" : "", "text-gray-600 mr-7 border-2 rounded-full p-1")}>
                <svg xmlns="http://www.w3.org/2000/svg" className={cls(checkIdxArr.includes(index) ? "text-white" : "", "h-5 w-5")} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
            </button>
            <img src={info.url} className="w-[60px] h-[80px] bg-gray-400 object-fill" />
            <h3 className="ml-5  font-semibold">{info.name}</h3>
            <div className="border-2  mr-16   flex justify-between px-2 w-20 rounded-sm">
                <button data-minus={index}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
                    </svg>
                </button>
                <span>{info.product_amount}</span>
                <button data-plus={index}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                </button>
            </div>
            {+info.discount_price ?
                <div className="whitespace-nowrap mr-10">
                    <div>{+info.discount_price * info.product_amount}원</div>
                    <div className="line-through text-gray-500 text-sm">{+info.price * info.product_amount}원</div>
                </div>
                :
                <div className="whitespace-nowrap mr-10">{+info.price * info.product_amount}원</div>
            }
            <button className="text-sm text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>

    )

}

export default CartItem;