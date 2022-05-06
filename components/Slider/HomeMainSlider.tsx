import { cls } from '@libs/cls';
import { SliderImages } from '@libs/sliderImages';
import { useInterval } from '@libs/useInterval';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';


const HomeMainSlider = () => {

    const [number, setNumber] = useState(2);
    const [animation, setAnimation] = useState(true);
    const [delay, setDelay] = useState<number | null>(3000);
    const [seeBtn, setSeeBtn] = useState(false);

    const onMouseEnter = () => {
        setSeeBtn(true);
    }
    const onMouseLeave = () => {
        setSeeBtn(false);
    }


    const onRightClick = () => {

        setAnimation(true);
        setNumber(prev => prev + 1);

        if (number === SliderImages.length + 1) {
            setTimeout(() => { setAnimation(false); setNumber(2); }, 100);
        }
    }

    const onMouseDown = () => { setDelay(null) };
    const onMouseUp = () => { setDelay(3000) };

    useInterval(onRightClick, delay);

    const onLeftClick = () => {
        setDelay(null);
        setAnimation(true);
        setNumber(prev => prev - 1);
        if (number === 2) {
            setTimeout(() => { setAnimation(false); setNumber(SliderImages.length + 1); }, 100);
        }
    }




    return (
        <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} className="w-full relative  overflow-hidden">
            <ul style={{ transform: `translateX(${-1 * (number - 1) * 100}vw)` }} className={cls(animation ? " transition ease-in-out duration-300" : "", `w-full flex  -translate-x-[${(number - 1) * 100}vw]`)}>
                <li key={0} className="shrink-0 relative w-[100vw]  h-[370px]">
                    <Image priority placeholder='empty' layout="fill" objectFit='cover' src={SliderImages[SliderImages.length - 1]} />
                </li>
                {
                    SliderImages.map((image: string, key) =>
                        <li key={key} className="shrink-0 relative  w-[100vw]  h-[370px]">
                            <Image priority placeholder='empty' layout="fill" objectFit='cover' src={image} />
                        </li>
                    )
                }
                <li key={10} className="shrink-0 relative w-[100vw]  h-[370px]">
                    <Image priority placeholder='empty' layout="fill" objectFit='cover' src={SliderImages[0]} />
                </li>
            </ul>
            <button onClick={onLeftClick} onMouseDown={onMouseDown} onMouseUp={onMouseUp} className={cls(seeBtn ? "" : "hidden", "absolute left-10 top-[50%] translate-x-[-50%] rounded-full p-3 bg-[rgba(15,15,15,0.5)] border-2")}>
                <svg xmlns="http://www.w3.org/2000/svg" className="text-white h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
            </button>
            <button onClick={onRightClick} onMouseDown={onMouseDown} onMouseUp={onMouseUp} className={cls(seeBtn ? "" : "hidden", "absolute right-10 top-[50%] translate-x-[-50%] rounded-full p-3 bg-[rgba(15,15,15,0.5)] border-2 ")}>
                <svg xmlns="http://www.w3.org/2000/svg" className="text-white h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
            </button>
            <div className="absolute bottom-5 right-[150px] bg-[rgba(15,15,15,0.5)] rounded-xl w-12 flex justify-center items-center text-white">
                {number === 7 ? 1 : number === 1 ? SliderImages.length : number - 1}/{SliderImages.length}
            </div>
        </div >
    )


}

export default HomeMainSlider;