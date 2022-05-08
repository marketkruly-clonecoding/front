import Image from 'next/image';
import { useEffect, useRef } from 'react';

const SideBar = () => {

    const sidebar = useRef<HTMLDivElement>(null);

    const controllerSideBarPos = () => {

        console.log(sidebar.current?.getBoundingClientRect());
    }


    useEffect(() => {
        window.addEventListener("scroll", controllerSideBarPos);

        return () => window.removeEventListener("scroll", controllerSideBarPos);
    }, [])


    return (
        <div ref={sidebar} className="absolute right-0  top-[120vh] w-[80px] space-y-2 z-20  ">
            <div className="relative w-full h-[120px] ">
                <Image layout="fill" objectFit='cover' src={"/images/사이드바.PNG"} />
            </div>
            <div className="text-xs text-center border-[1px]  bg-white">
                <div className="p-1  border-b-[1px]" >등급별 혜택</div>
                <div className="p-1  border-b-[1px]">레시피</div>
                <div className="p-1 ">베스트 후기</div>
            </div>
            <div className="w-full border-[1px] flex flex-col items-center space-y-2 bg-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                </svg>
                <div className="text-xs font-semibold">최근 본 상품</div>
                <ul className="space-y-2 max-h-52 overflow-hidden bg-white">
                    <li className="w-[60px] h-[70px] bg-gray-500"></li>
                    <li className="w-[60px] h-[70px] bg-gray-500"></li>
                    <li className="w-[60px] h-[70px] bg-gray-500"></li>
                </ul>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
            </div>
        </div>
    )

}

export default SideBar;