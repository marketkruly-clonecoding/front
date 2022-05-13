
const CartItem = () => {

    return (
        <div>
            <div className="flex justify-between items-center border-t-2 border-black py-3">
                <h2 className="text-lg">💧 <span className="font-semibold">냉장상품</span></h2>
                <button>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                    </svg>
                </button>
            </div>
            <div className="flex items-center py-6">
                <button className="mr-7">
                    <svg xmlns="http://www.w3.org/2000/svg" className="text-gray-300 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </button>
                <div className="w-[60px] h-[80px] bg-gray-400" />
                <h3 className="ml-5 mr-52 font-semibold">친환경 당근 500g</h3>
                <div className="border-2  mr-16   flex justify-between px-2 w-20 rounded-sm">
                    <button>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
                        </svg>
                    </button>
                    <span>1</span>
                    <button>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                        </svg>
                    </button>
                </div>
                <div className="whitespace-nowrap mr-10">3,390원</div>
                <button className="text-sm text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>
    )

}

export default CartItem;