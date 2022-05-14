
const MyNav = () => {

    return (
        <div>
            <h1 className="text-2xl font-semibold py-10">마이컬리</h1>
            <ul className="w-52  border-2">
                <li className="hover:bg-gray-100 hover:text-purple-800  cursor-pointer  flex w-full p-4 justify-between border-b-2">
                    <span>주문 내역</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                </li>
                <li className="hover:bg-gray-100 hover:text-purple-800  cursor-pointer  flex w-full p-4 justify-between border-b-2">
                    <span>선물 내역</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                </li>
                <li className="hover:bg-gray-100 hover:text-purple-800  cursor-pointer  flex w-full p-4 justify-between border-b-2">
                    <span>찜한 상품</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                </li>
                <li className="hover:bg-gray-100 hover:text-purple-800  cursor-pointer  flex w-full p-4 justify-between border-b-2">
                    <span>배송지 관리</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                </li>
                <li className="hover:bg-gray-100 hover:text-purple-800  cursor-pointer  flex w-full p-4 justify-between border-b-2">
                    <span>상품 후기</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                </li>
                <li className="hover:bg-gray-100 hover:text-purple-800  cursor-pointer  flex w-full p-4 justify-between border-b-2">
                    <span>상품 문의</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                </li>
                <li className="hover:bg-gray-100 hover:text-purple-800  cursor-pointer  flex w-full p-4 justify-between border-b-2">
                    <span>적립금</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                </li>
                <li className="hover:bg-gray-100 hover:text-purple-800  cursor-pointer  flex w-full p-4 justify-between border-b-2">
                    <span>쿠폰</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                </li>
                <li className="hover:bg-gray-100 hover:text-purple-800  cursor-pointer  flex w-full p-4 justify-between ">
                    <span>개인 정보 수정</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                </li>
            </ul>
            <button className="mt-5 flex justify-between items-center w-52 bg-gray-100 rounded-tr-3xl rounded-br-3xl text-sm px-5 py-3">
                <div className="flex flex-col  items-start">
                    <div className="font-semibold">도움이 필요하신가요?</div>
                    <div>1:1 문의하기</div>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
            </button>
        </div>
    )
}

export default MyNav;