import Button from '@components/Button';
import { useEffect } from 'react';
import Navigation from '../components/Nav/Navigation';

const Login = () => {


    return (
        <div className="w-full  h-[100vh]">
            <div className="w-full p-10 pb-48 flex justify-center items-center ">
                <form className="flex p-8 flex-col w-[400px] space-y-2 ">
                    <h1 className="text-center font-semibold text-xl pb-5">로그인</h1>
                    <input className="border-2 p-3 w-[340px] rounded-sm" placeholder="아이디를 입력해주세요" type="text" />
                    <input className="border-2 p-3 w-[340px] rounded-sm" placeholder="비밀번호를 입력해주세요 " type="password" />
                    <div className="w-[340px] text-gray-800 flex justify-end  space-x-2 text-xs font-semibold pb-6">
                        <span>아이디 찾기</span>
                        <span>|</span>
                        <span>비밀먼호 찾기</span>
                    </div>
                    <Button backcolor='purple' text="로그인" size="middle" />
                    <Button backcolor='white' text="회원가입" size="middle" />
                </form>
            </div>
        </div>
    )
}

export default Login;