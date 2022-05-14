
const MyInfo = () => {

    return (
        <div className="bg-gray-100 pt-12 h-[400px]">
            <div className="px-28 grid grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-x-1">
                <div className="bg-white p-8">
                    <div className="flex items-center">
                        <div className="border-2 p-3 rounded-md text-sm mr-5">웰컴</div>
                        <div className="text-lg font-semibold">김명원님</div>
                    </div>
                    <div className="my-4 text-sm font-medium">
                        <div>적립 5%</div>
                        <div>최초 1회 무료배송</div>
                    </div>
                    <div className="text-xs flex space-x-2">
                        <button className="bg-gray-100 px-5 rounded-2xl py-2 whitespace-nowrap">전체등급 보기</button>
                        <button className="bg-gray-100 px-5 rounded-2xl py-2 whitespace-nowrap">다음 달 예상등급 보기</button>
                    </div>
                </div>
                <div className="bg-white p-8">
                    <button className="flex items-center">
                        <span className="text-sm">적립금</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                    <div className="mt-14 text-lg text-purple-800 font-semibold">0원</div>
                    <div className="text-xs text-gray-500 mt-3">소멸 예정 0원</div>
                </div>
                <div className="bg-white p-8">
                    <button className="flex  items-center" >
                        <span className="text-sm">쿠폰</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                    <div className="mt-14 text-lg text-purple-800 font-semibold" >0개</div>
                </div>
                <div className="bg-white p-8">
                    <button className="flex  items-center">
                        <span className="text-sm whitespace-nowrap" > 컬리 퍼플 박스</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                    <div className="mt-14 text-lg text-purple-800 font-semibold">알아보기</div>
                </div>
                <div className="bg-white p-8">
                    <button className="flex  items-center">
                        <span className="text-sm">컬리패스</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                    <div className="mt-14 text-lg text-purple-800 font-semibold">알아보기</div>
                </div>
            </div>
            <div className="px-28 mt-5">
                <div className="w-full  h-14 bg-gray-700 " />
            </div>
        </div >
    )

}

export default MyInfo;