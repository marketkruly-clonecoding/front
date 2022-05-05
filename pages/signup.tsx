import Button from '@components/Button';

const SignUp = () => {
    return (
        <div className="w-full  h-[100vh]">
            <div className="w-full  pb-48 flex flex-col justify-center items-center ">
                <form className="flex p-8 flex-col w-[700px] space-y-2 ">
                    <div className="relative border-b-2 border-black p-16">
                        <h1 className="text-center text-3xl">회원가입</h1>
                        <span className="absolute bottom-2 right-0 text-xs"><span className="text-red-600">*</span>필수입력사항</span>
                    </div>
                    <div className="border-b-2 border-black p-3 py-7 space-y-7 ">
                        <div className=" grid gap-x-2 items-center grid-cols-[1.3fr_3fr_1fr]">
                            <div className="p-3 pl-0 self-start">아이디<span className="text-red-600">*</span></div>
                            <div className="">
                                <input className="border-2 rounded-sm w-full p-3 mb-2 text-sm" placeholder="6자 이상의 영문 혹은 영문과 숫자를 조합" />
                                <div className="text-xs space-y-1">
                                    <div>6자 이상의 영문 혹은 영문과 숫자를 조합</div>
                                    <div>아이디 중복확인</div>
                                </div>
                            </div>
                            <div className="self-start">
                                <Button size="small" backcolor="white" text="중복확인" />
                            </div>
                        </div>
                        <div className=" grid gap-x-2 items-center grid-cols-[1.3fr_3fr_1fr]">
                            <div className="p-3 pl-0 self-start">비밀번호<span className="text-red-600">*</span></div>
                            <div>
                                <input className="border-2 rounded-sm w-full p-3 mb-2 text-sm" placeholder="비밀번호를 입력해주세요" />
                                <div className="text-xs space-y-1">
                                    <div>10자 이상 입력</div>
                                    <div>영문/숫자/특수문자(공백 제외)만 허용하며,2개 이상 조합</div>
                                    <div>동일한 숫자 3개 이상 연속 사용 불가</div>
                                </div>
                            </div>
                        </div>
                        <div className="grid gap-x-2 items-center grid-cols-[1.3fr_3fr_1fr]">
                            <div className="p-3 pl-0 self-start">비밀번호확인<span className="text-red-600">*</span></div>
                            <div>
                                <input className="border-2 rounded-sm w-full p-3 mb-2 text-sm" placeholder="비밀번호를 한번 더 입력해주세요" />
                                <div className="text-xs space-y-1">
                                    <div>동일한 비밀번호를 입력해주세요</div>
                                </div>

                            </div>
                        </div>
                        <div className=" grid gap-x-2 items-center grid-cols-[1.3fr_3fr_1fr]">
                            <div>이름<span className="text-red-600">*</span></div>
                            <input className="border-2 rounded-sm w-full p-3 text-sm" placeholder="이름을 입력해주세요" />
                        </div>
                        <div className=" grid gap-x-2 items-center grid-cols-[1.3fr_3fr_1fr]">
                            <div>이메일<span className="text-red-600">*</span></div>
                            <input className="border-2 rounded-sm w-full p-3  text-sm" placeholder="예:marketkurly@kurly.com" />
                            <Button size="small" backcolor="white" text="중복확인" />
                        </div>
                        <div className="grid  gap-x-2 items-center grid-cols-[1.3fr_3fr_1fr]">
                            <div>휴대폰<span className="text-red-600">*</span></div>
                            <div>
                                <input className="border-2 rounded-sm w-full p-3 text-sm" placeholder="숫자만 입력해주세요" />
                            </div>
                            <Button size="small" backcolor="white" text="중복확인" />
                        </div>
                        <div className="grid gap-x-2 items-center grid-cols-[1.3fr_3fr_1fr]">
                            <div className="p-3 pl-0 self-start">주소<span className="text-red-600">*</span></div>
                            <div>
                                <button type="button" className="flex justify-center items-center p-3 border-2 border-purple-800 text-purple-800 w-full">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                    <span className="ml-2">주소검색</span>
                                </button>

                                <div className="text-xs mt-3">배송지에 따라 상품 정보가 달라질 수 있습니다.</div>
                            </div>
                        </div>
                        <div className=" grid gap-x-2 items-center grid-cols-[1.3fr_3fr_1fr]">
                            <div>성별</div>
                            <div className="flex justify-between text-md">
                                <label>
                                    <input
                                        className="mr-2"
                                        type="radio"
                                        name="gender"
                                        value="man"
                                    ></input>
                                    남자
                                </label>
                                <label>
                                    <input
                                        className="mr-2"
                                        type="radio"
                                        name="gender"
                                        value="girl"
                                    ></input>
                                    여자
                                </label>
                                <label>
                                    <input
                                        className="mr-2"
                                        type="radio"
                                        name="gender"
                                        value="no"
                                    ></input>
                                    선택안함
                                </label>
                            </div>
                        </div>
                        <div className=" grid gap-x-2 items-center grid-cols-[1.3fr_3fr_1fr]">
                            <h1>생년원일</h1>
                            <div className="flex items-center border-2 ">
                                <input className="outline-none p-2 pl-9 w-28" type="text" placeholder="YYYY" />
                                <span>/</span>
                                <input className="outline-none p-2 pl-9 w-28" type="text" placeholder="MM" />
                                <span>/</span>
                                <input className="outline-none p-2 pl-9 w-28" type="text" placeholder="DD" />
                            </div>
                        </div>
                    </div>
                    <div className="border-b-[1px] py-5 grid gap-x-2 items-center grid-cols-[1fr_3fr]">
                        <h1>
                            이용약관동의<span className="text-red-600">*</span>
                        </h1>
                        <div className="flex flex-col space-y-5">
                            <label className="flex  ">
                                <input
                                    className="mr-2 w-5 h-5 mt-3"
                                    type="checkbox"
                                />
                                <div className="self-start pt-2 ">
                                    <h3 className="text-lg">전체 동의합니다.</h3>
                                    <span className="text-[11px]">선택항목에 동의하지 않은 경우도 회원가입 및 일반적인
                                        서비스를 이용할 수 있습니다.</span>
                                </div>
                            </label>
                            <label className="flex items-center text-sm font-semibold text-gray-500">
                                <input className="mr-2 w-5 h-5" type="checkbox" />
                                이용약관 동의<span>(필수)</span>
                            </label>
                            <label className="flex items-center text-sm font-semibold text-gray-500">
                                <input className="mr-2 w-5 h-5" type="checkbox" />
                                개인정보 수집•이용 동의<span>(필수)</span>
                            </label>
                            <label className="flex items-center text-sm font-semibold text-gray-500">
                                <input className="mr-2 w-5 h-5" type="checkbox" />
                                개인정보 수집•이용 동의<span>(선택)</span>
                            </label>
                            <label className="flex items-center text-sm font-semibold text-gray-500">
                                <input className="mr-2 w-5 h-5" type="checkbox" />
                                무료배송,할인쿠폰 등 혜택/정보 수신 동의<span>(선택)</span>
                            </label>
                            <label className="flex items-center text-sm font-semibold text-gray-500">
                                <input className="mr-2 w-5 h-5" type="checkbox" />
                                본인은 만 14세 이상입니다.<span>(필수)</span>
                            </label>
                        </div>
                    </div>
                    <div className="text-center  pt-6">
                        <Button type="submit" size="middle" backcolor='purple' text="가입하기"></Button>
                    </div>
                </form>
            </div>
        </div >
    )
}

export default SignUp;