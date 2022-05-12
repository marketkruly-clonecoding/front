import ImageItem from './ImageItem';

const ImagesBox = () => {

    return (
        <div>
            <header className="py-4 flex justify-between text-xs">
                <div>총 46개</div>
                <ul className="flex space-x-2 text-gray-400">
                    <li>추천순</li>
                    <span> | </span>
                    <li>신상품순</li>
                    <span> | </span>
                    <li>판매량순</li>
                    <span> | </span>
                    <li>혜택순</li>
                    <span> | </span>
                    <li>낮은가격순</li>
                    <span> | </span>
                    <li>높은가격순</li>
                </ul>
            </header>
            <main className=" ">
                <ul className="grid gap-10 grid-cols-3">
                    {[1, 2, 3, 4, 5, 6].map(item => <ImageItem />)}
                </ul>
                <div className="flex  justify-center mt-24">
                    <button className="border-2 p-2 w-9 h-9 flex justify-center items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                        </svg>
                    </button>
                    <button className="border-2 p-2 w-9 h-9 flex justify-center items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <ul className="flex">
                        {[1, 2, 3, 4, 5, 6].map((number, index) => <li className=" 
                         cursor-pointer flex justify-center items-center text-sm border-2 p-2 w-9 h-9">
                            {index + 1}
                        </li>)}
                    </ul>
                    <button className="border-2 p-2 w-9 h-9   flex justify-center items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                    <button className="border-2 p-2 w-9 h-9  flex justify-center items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path stroke-linecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </main>
        </div>
    )
}

export default ImagesBox;