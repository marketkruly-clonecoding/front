import Button from '@components/Button';
import useMutate from '@libs/useMutate';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Navigation from '../components/Nav/Navigation';


interface ILoginForm {
    id: string;
    pwd: string;
}

const Login = () => {


    const [mutate, { data, error, loading }] = useMutate("http://prod.hiimpedro.site:9000/app/users/login");
    const { register, handleSubmit } = useForm<ILoginForm>();

    const onValid = (data: ILoginForm) => {
        if (loading) return;
        mutate(data);
    };

    const onInValid = (e: any) => {
        alert("아이디 또는 비밀번호 오류입니다.");
    }
    return (
        <div className="w-full  h-[100vh]">
            <div className="w-full p-10 pb-48 flex justify-center items-center ">
                <form onSubmit={handleSubmit(onValid, onInValid)} className="flex p-8 flex-col w-[400px] space-y-2 ">
                    <h1 className="text-center font-semibold text-xl pb-5">로그인</h1>
                    <input {...register("id", { required: { value: true, message: "아이디를 입력해주세요" } })} className="border-2 p-3 w-[340px] rounded-sm" placeholder="아이디를 입력해주세요" type="text" />
                    <input {...register("pwd", { required: { value: true, message: "비밀번호를 입력해주세요" } })} className="border-2 p-3 w-[340px] rounded-sm" placeholder="비밀번호를 입력해주세요 " type="password" />
                    <div className="w-[340px] text-gray-800 flex justify-end  space-x-2 text-xs font-semibold pb-6">
                        <span>아이디 찾기</span>
                        <span>|</span>
                        <span>비밀먼호 찾기</span>
                    </div>
                    <Button type="submit" backcolor='purple' text="로그인" size="middle" />
                    <Button backcolor='white' text="회원가입" size="middle" />
                </form>
            </div>
        </div>
    )
}

export default Login;