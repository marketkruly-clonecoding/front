import Button from '@components/Button';
import { cls } from '@libs/cls';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

const MyInfoFix = () => {

    const { register, watch } = useForm();


    const [pwdWarningInfo, setPwdWarningInfo] = useState(false);
    const [pwd2WarningInfo, setPwd2WarningInfo] = useState(false);


    const pdWatcher = watch("password");
    const curPdWatcher = watch("curPassword");
    const pdConfirmWatcher = watch("passwordConfirm");



    const pwregs = useRef([/.{10,}/,
        /^(?=.*[0-9])(?=.*[a-zA-Z]).{2,}$/,
        /^(?=.*[!@#$%^&*()_+])(?=.*[a-zA-Z]).{2,}$/,
        /^(?=.*[0-9])(?=.*[!@#$%^&*()_+]).{2,}$/,
        /^(?=.*[0-9])(?=.*[!@#$%^&*()_+])(?=.*[a-zA-Z]).{3,}$/,
        /(\w)\1\1/]);


    const onNewPdFocus = () => {
        setPwdWarningInfo(true);
    }

    const onNewPdConfirmFocus = () => {
        setPwd2WarningInfo(true);
    }



    const pwSecondConditionChecker = (pwd: string) => {

        return pwregs.current[1].test(pwd) || pwregs.current[2].test(pwd) || pwregs.current[3].test(pwd)
            || pwregs.current[4].test(pwd)
    }

    return (
        <form className="flex p-8 flex-col w-[700px] space-y-2 ">

            <div className="border-b-2 border-black p-3 py-7 space-y-7 ">
                <div className=" grid gap-x-2 items-center grid-cols-[1.3fr_3fr_1fr]">
                    <div className="p-3 pl-0 self-start">아이디</div>
                    <div className="">
                        <input className="border-2 rounded-sm w-full p-3 mb-2 text-sm" />
                    </div>
                </div>
                <div className=" grid gap-x-2 items-center grid-cols-[1.3fr_3fr_1fr]">
                    <div className="p-3 pl-0 self-start">현재 비밀번호</div>
                    <div className="">
                        <input {...register("curPassword", { required: { value: true, message: "현재 비밀번호를 입력해주세요" } })} className="border-2 rounded-sm w-full p-3 mb-2 text-sm" />
                    </div>
                </div>
                <div className=" grid gap-x-2 items-center grid-cols-[1.3fr_3fr_1fr]">
                    <div className="p-3 pl-0 self-start">새 비밀번호<span className="text-red-600">*</span></div>
                    <div>
                        <input onFocus={onNewPdFocus}  {...register("password", {
                            required: { value: true, message: "새 비밀번호를 입력해주세요" },
                            validate: {
                                one: v => curPdWatcher === v || "현재 비밀번호와 일치합니다.",
                                two: v => pwregs.current[0].test(v) || "비밀번호는 10자 이상이어야 합니다.",
                                three: v => pwSecondConditionChecker(v) || "비밀번호 2번째 조건이 부적합합니다.",
                                four: v => !pwregs.current[5].test(v) || "비밀번호 3번째 조건이 부적합합니다."
                            }
                        })} className="border-2 rounded-sm w-full p-3 mb-2 text-sm" placeholder="비밀번호를 입력해주세요" />
                        <div className={cls(pwdWarningInfo ? "" : "hidden", "text-xs space-y-1")}>
                            <div className={cls(curPdWatcher !== pdWatcher ? "text-green-600" : "text-red-600")}>현재 비밀번호와 다르게 입력</div>
                            <div className={cls(pwregs.current[0].test(pdWatcher) ? "text-green-600" : "text-red-600")}>10자 이상 입력</div>
                            <div className={cls(pwSecondConditionChecker(pdWatcher) ? "text-green-600" : "text-red-600")}>영문/숫자/특수문자(공백 제외)만 허용하며,2개 이상 조합</div>
                            <div className={cls(pwregs.current[5].test(pdWatcher) ? "text-red-600" : "text-green-600")}>동일한 숫자 3개 이상 연속 사용 불가</div>
                        </div>
                    </div>
                </div>
                <div className="grid gap-x-2 items-center grid-cols-[1.3fr_3fr_1fr]">
                    <div className="p-3 pl-0 self-start">새 비밀번호확인<span className="text-red-600">*</span></div>
                    <div>
                        <input onFocus={onNewPdConfirmFocus} {...register("passwordConfirm", {
                            required: { value: true, message: "비밀번호 확인을 입력해주세요" },
                            validate: {
                                one: v => pdWatcher === v || "비밀번호가 일치하지 않습니다."
                            }
                        })} className="border-2 rounded-sm w-full p-3 mb-2 text-sm" placeholder="비밀번호를 한번 더 입력해주세요" />
                        <div className={cls(pwd2WarningInfo ? "" : "hidden", "text-xs space-y-1")}>
                            <div className={cls(pdWatcher === pdConfirmWatcher ? "text-green-600" : "text-red-600")}>동일한 비밀번호를 입력해주세요</div>
                        </div>

                    </div>
                </div>

                <div className=" grid gap-x-2 items-center grid-cols-[1.3fr_3fr_1fr]">
                    <div>이름</div>
                    <input {...register("name", { required: { value: true, message: "이름을 입력해주세요" } })} className="border-2 rounded-sm w-full p-3 text-sm" placeholder="이름을 입력해주세요" />
                </div>
                <div className=" grid gap-x-2 items-center grid-cols-[1.3fr_3fr_1fr]">
                    <div>이메일</div>
                    <input {...register("email", { required: { value: true, message: "이메일을 입력해주세요" }, pattern: { value: /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/, message: "이메일 형식이 부적절합니다." } })} className="border-2 rounded-sm w-full p-3  text-sm" placeholder="예:marketkurly@kurly.com" />
                    <Button size="small" backcolor="white" text="중복확인" />
                </div>
                <div className="grid  gap-x-2 items-center grid-cols-[1.3fr_3fr_1fr]">
                    <div>휴대폰</div>
                    <div>
                        <input {...register("phone", { required: { value: true, message: "휴대전화를 입력해주세요" }, pattern: { value: /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/, message: "전화번호 형식이 적절하지 않습니다." } })} className="border-2 rounded-sm w-full p-3 text-sm" placeholder="숫자만 입력해주세요" />
                    </div>
                    <Button size="small" backcolor="white" text="중복확인" />
                </div>
                <div className=" grid gap-x-2 items-center grid-cols-[1.3fr_3fr_1fr]">
                    <div>성별</div>
                    <div className="flex justify-between text-md">
                        <label>
                            <input
                                {...register("sex", { required: true })}
                                className="mr-2"
                                type="radio"
                                name="sex"
                                value="man"
                            ></input>
                            남자
                        </label>
                        <label>
                            <input
                                {...register("sex", { required: true })}
                                className="mr-2"
                                type="radio"
                                name="sex"
                                value="girl"
                            ></input>
                            여자
                        </label>
                        <label>
                            <input
                                {...register("sex", { required: true })}
                                className="mr-2"
                                type="radio"
                                name="sex"
                                value="no"
                            ></input>

                            선택안함
                        </label>
                    </div>
                </div>
                <div className=" grid gap-x-2 items-center grid-cols-[1.3fr_3fr_1fr]">
                    <h1>생년원일</h1>
                    <div className="flex items-center border-2 ">
                        <input maxLength={4} {...register("birth_year", {
                            required: { value: true, message: "생년원일을 입력해주세요" }
                            ,
                            pattern: {
                                value: /(19|20)\d{2}/
                                , message: "연도를 정확히 입력해주세요"
                            }
                        })} className="outline-none p-2 pl-9 w-28" type="text" placeholder="YYYY" />
                        <span>/</span>
                        <input maxLength={2} {...register("birth_month", {
                            required: { value: true, message: "생년월일을 입력해주세요" }
                            ,
                            pattern: { value: /0[1-9]|1[012]/, message: "달을 정확히 입력해주세요" }
                        })} className="outline-none p-2 pl-9 w-28" type="text" placeholder="MM" />
                        <span>/</span>
                        <input maxLength={2} {...register("birth_day", {
                            required: { value: true, message: "생년월일을 입력해주세요" }
                            ,
                            pattern: { value: /0[1-9]|[12][0-9]|3[01]/, message: "날짜 일을 정확히 입력해주세요" }
                        })} className="outline-none p-2 pl-9 w-28" type="text" placeholder="DD" />
                    </div>
                </div>
            </div>

            <div className="text-center  pt-6 space-x-2">
                <button className="border-2 w-32 px-7 py-3 border-purple-800 text-purple-800 rounded-sm">탈퇴하기</button>
                <button className="w-32 px-2 py-3.5  bg-purple-800 text-white rounded-sm">회원정보수정</button>
            </div>
        </form>
    )

}

export default MyInfoFix;