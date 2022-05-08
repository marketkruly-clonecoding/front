
interface IAlarm {
    message: string;
}

const Alarm = ({ message }: IAlarm) => {
    return (
        <div className="fixed top-0 z-30 flex justify-center items-center w-full h-full bg-[rgba(15,15,15,0.5)]">
            <div className="flex flex-col w-[500px] h-[275px] bg-white">
                <div className="p-4  h-2/3 flex flex-col">
                    <header className="pb-3 w-full border-b-[1px] border-gray-300 flex justify-between items-center">
                        <span className="text-sm text-purple-800 font-semibold">알림메세지</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="text-gray-400 h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </header>
                    <p className="flex-1 flex justify-center items-center text-xs">{message}</p>
                </div>
                <div className="flex justify-center items-center bg-gray-100  flex-1">
                    <button className="w-1/3 bg-purple-800 p-3 text-white">확인</button>
                </div>
            </div>
        </div>)
}

export default Alarm;