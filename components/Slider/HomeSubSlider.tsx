import { cls } from '@libs/cls';
import { useRef, useState } from 'react';


interface IHomeSubSlider {
    title: string;
    subTitle?: string;
    datas: any[];
}

const HomeSubSlider = ({ title, subTitle, datas }: IHomeSubSlider) => {

    const [number, setNumber] = useState(1);
    const sliderEndNumber = useRef(Math.floor(datas.length / 4));

    const onLeftClick = () => {
        setNumber(prev => prev - 1);
    }

    const onRightClick = () => {
        setNumber(prev => prev + 1);
    }


    return (
        <div className="relative w-full flex flex-col items-center  py-20">
            <h1 className="text-2xl font-semibold">{title}</h1>
            {subTitle && <h5 className="text-gray-400 mt-2 mb-7">{subTitle}</h5>}
            <div className=" w-[1053px]  overflow-hidden">
                <ul style={{
                    transform: `translateX(${number === sliderEndNumber.current + 1 ?
                        -1 * (number - 2) * (1053 + 19) - 269
                        :
                        -1 * (number - 1) * (1053 + 19)
                        }px)`
                }} className="flex transition ease-in-out duration-300">
                    {
                        datas.map(item =>
                            <li className="pr-[18px] space-y-2">
                                <div className="w-[250px] h-[318px] bg-gray-400" />
                                <div>[네떼] 부드러운 샐러드 65g</div>
                                <div>1,700원</div>
                            </li>
                        )
                    }
                    <li className="pr-[18px] space-y-2  p-20 pt-28">
                        <button className="bg-white border-2 p-5 rounded-full hover:bg-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" className=" h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                        <div>전체보기</div>
                    </li>
                </ul>
            </div>
            <button onClick={onLeftClick} className={cls(number === 1 ? "hidden" : "", "absolute top-1/2 left-[75px] bg-white border-2 p-3 shadow-lg rounded-full")} >
                <svg xmlns="http://www.w3.org/2000/svg" className=" h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
            </button>
            <button onClick={onRightClick} className={cls(number === sliderEndNumber.current + 1 ? "hidden" : "", "absolute top-1/2 right-[75px] bg-white border-2 p-3 shadow-lg rounded-full")}>
                <svg xmlns="http://www.w3.org/2000/svg" className=" h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
            </button>
        </div >
    )


}

export default HomeSubSlider;