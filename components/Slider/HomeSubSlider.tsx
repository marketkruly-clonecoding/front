import ImageItem from '@components/Search/ImageItem';
import { cls } from '@libs/cls';
import Image from 'next/image';
import { semiResult } from 'pages';
import { useRef, useState } from 'react';




interface IHomeSubSlider {
    title: string;
    subTitle?: string;
    datas: semiResult[];
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
                        datas.map((item, index) =>
                            // <li key={index} className="pr-[18px] space-y-2">
                            //     <div className="relative w-[250px] h-[318px] bg-gray-400">
                            //         <Image layout="fill" objectFit='cover' src={item[0].url} />
                            //     </div>
                            //     <div>{item[0].brand_name ? `[${item[0].brand_name}]` : null}{item[0].name}</div>
                            //     {item[0].discount ?
                            //         <div>
                            //             <div className="space-x-2 text-lg">
                            //                 <span className="text-orange-400 font-semibold">{item[0].discount}%</span>
                            //                 <span className="font-semibold">{item[0].discount_price}원</span>
                            //             </div>
                            //             <div className="text-gray-400 line-through text-sm">{item[0].price}원</div>
                            //         </div>
                            //         :
                            //         <div className="font-semibold">
                            //             {item[0].price}원
                            //         </div>}
                            // </li>
                            <ImageItem key={index} data={item} isHome={true} />
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
            <button onClick={onLeftClick} className={cls(number === 1 ? "hidden" : "", "absolute top-[330px] left-[75px] bg-white border-2 p-3 shadow-lg rounded-full")} >
                <svg xmlns="http://www.w3.org/2000/svg" className=" h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
            </button>
            <button onClick={onRightClick} className={cls(number === sliderEndNumber.current + 1 ? "hidden" : "", "absolute top-[330px]  right-[75px] bg-white border-2 p-3 shadow-lg rounded-full")}>
                <svg xmlns="http://www.w3.org/2000/svg" className=" h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
            </button>
        </div >
    )


}

export default HomeSubSlider;