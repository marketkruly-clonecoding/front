import { RootState } from '@modules/index';
import { addRecentviewList, initRecentviewList } from '@modules/product';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';


interface ISideBar {
    position: string;
    initScrollPosition: number;
}

const SideBar = ({ position, initScrollPosition }: ISideBar) => {

    const sidebar = useRef<HTMLDivElement>(null);
    const { recentViewList } = useSelector((state: RootState) => state.product);
    const [slide, setSlide] = useState(0);
    const dispatch = useDispatch();



    const controllerSideBarPos = () => {

        if (sidebar.current) {
            if (window.scrollY <= initScrollPosition) {
                sidebar.current.style.top = position;
                return;
            }

            setTimeout(() => { sidebar.current!.style.top = `${window.scrollY + 100}px` }, 10);
        }

    }

    const onClick = (info: { url: string, id: number }) => () => {
        dispatch(addRecentviewList(info));
    }


    const onRecentViewUpClick = () => {
        if (slide === 0) return;
        setSlide(prev => prev - 70);
    }

    const onRecentViewDownClick = () => {
        if (slide === 70 * (recentViewList.length - 1)) return;
        setSlide(prev => prev + 70);
    }

    useEffect(() => {
        window.addEventListener("scroll", controllerSideBarPos);
        dispatch(initRecentviewList());

        return () => window.removeEventListener("scroll", controllerSideBarPos);
    }, [])




    return (
        <div ref={sidebar}
            style={{ top: `${position}` }}
            className={`transition-all  absolute  right-2 top-[${position}] w-[80px] space-y-2`}>
            <div className="relative w-full h-[120px] ">
                <Image layout="fill" objectFit='cover' src={"/images/사이드바.PNG"} />
            </div>
            <div className="text-xs text-center border-[1px]  bg-white">
                <div className="p-1  border-b-[1px]" >등급별 혜택</div>
                <div className="p-1  border-b-[1px]">레시피</div>
                <div className="p-1 ">베스트 후기</div>
            </div>
            <div className="w-full border-[1px] flex flex-col items-center space-y-2 bg-white">
                <svg onClick={onRecentViewUpClick} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                </svg>
                <div className="text-xs font-semibold">최근 본 상품</div>
                <div className="max-h-52 overflow-hidden ">
                    <ul style={{ transform: `translateY(${-1 * slide}px)` }} className=" transition-all space-y-2 max-h-52  bg-white">
                        {recentViewList.map(item =>
                            <li onClick={onClick(item)} key={item.id} className="relative w-[60px] h-[70px] bg-gray-500">
                                <Link href={`/product/${item.id}`}>
                                    <a className=" w-[60px] h-[70px] bg-gray-500">
                                        <Image layout="fill" objectFit='cover' src={item.url} />
                                    </a>
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
                <svg onClick={onRecentViewDownClick} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
            </div>
        </div>
    )

}

export default SideBar;