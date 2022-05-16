import MyInfo from '@components/MyPage/MyInfo';
import MyInfoFix from '@components/MyPage/MyInfoFix';
import MyNav from '@components/MyPage/MyNav';
import { NextPage } from 'next';

const MyPointPage: NextPage = () => {

    return (
        <div>
            <MyInfo />
            <div className="bg-white px-28 flex">
                <MyNav />
                <div className="w-full pl-8 ">
                    <header className="flex flex-col pt-10 pb-10 justify-between w-full border-b-2 border-black">
                        <div className="flex items-center">
                            <h1 className="text-xl font-semibold">개인 정보 수정</h1>
                        </div>
                        <div className="mt-10 space-y-2">
                            <h3 className="font-semibold text-gray-700">비밀번호 재확인</h3>
                            <h5 className="text-xs text-gray-500">회원님의 정보를 안전하게 보호하기 위해 비밀번호를 다시 한번 확인해주세요</h5>
                        </div>
                    </header>
                    <form className="flex flex-col items-center">
                        <div className="border-b-2 w-full px-32 py-5 space-y-5">
                            <div className="grid grid-cols-[1fr_3fr] items-center">
                                <span>아이디</span>
                                <input type="text" className="border-[1px] w-72 border-black rounded-sm p-2" />
                            </div>
                            <div className="grid grid-cols-[1fr_3fr] items-center">
                                <span>비밀번호<span className="text-red-600">*</span></span>
                                <input type="password" className="border-[1px] w-72 border-black rounded-sm p-2" />
                            </div>
                        </div>
                        <button className="bg-purple-800 mt-10 py-5 px-24 text-white rounded-sm">확인</button>
                    </form>
                    {/* <MyInfoFix /> */}
                </div>
            </div>
        </div>
    )
}

export default MyPointPage;