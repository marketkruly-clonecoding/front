import Alarm from '@components/Alarm';
import Button from '@components/Button';
import SearchAddress from '@components/SearchAddress';
import React, { ChangeEvent, useEffect, useState, useRef } from 'react';
import { useForm } from "react-hook-form";
import { cls } from "@libs/cls";
import useMutate from '@libs/useMutate';
import { useRouter } from 'next/router';

export interface ISignUpForm {
    id: string;
    password: string;
    passwordConfirm: string;
    name: string;
    email: string;
    phone: string;
    birth_year: string;
    birth_month: string;
    birth_day: string;
    address_main: string;
    address_sub: string;
    sex?: string;
}

interface SignUpSubmit {
    id: string;
    pwd: string;
    name: string;
    email: string;
    phone: string;
    sex?: "M" | "G",
    birth: string;
    address_main: string;
    address_desc: string;

}



const SignUp = () => {


    const { register, handleSubmit, watch, resetField, formState: { errors } } = useForm<ISignUpForm>()
    const [kind, setKind] = useState("");
    const [isAllChecked, setIsAllChecked] = useState(false);
    const [checkedItems, setCheckedItems] = useState<string[]>([]);
    const [error, setError] = useState("");

    const [idWarningInfo, setIdWarningInfo] = useState(false);
    const [pwdWarningInfo, setPwdWarningInfo] = useState(false);
    const [pwd2WarningInfo, setPwd2WarningInfo] = useState(false);

    const router = useRouter();

    const [idOverlap, setIdOverlap] = useState(false);
    const [emailOverlap, setEmailOverlap] = useState(false);
    const [phoneOverlap, setPhoneOverlap] = useState(false);

    const [mutate, { data, loading, error: dataError }] = useMutate("/app/users/join");

    const overlapCheck = (key: string, data: string) => {

        fetch("/app/users/join/check", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ [key]: data })
        }).then(result => result.json()).then(data => {

            if (data.code === 1000) {
                alert(`??????????????? ${key} ?????????.`);
                if (key === "id") {
                    setIdOverlap(true);
                } else if (key === "email") {
                    setEmailOverlap(true);
                } else if (key === "phone") {
                    setPhoneOverlap(true);
                }
            } else if (data.code === 4000) {
                alert(`?????? ???????????? ?????? ${key} ?????????.`);
                if (key === "id") {
                    setIdOverlap(false);
                } else if (key === "email") {
                    setEmailOverlap(false);
                } else if (key === "phone") {
                    setPhoneOverlap(false);
                }
            }
        });
    }


    const idregs = useRef(/^[0-9a-zA-Z]{6,}$/);
    const pwregs = useRef([/.{10,}/,
        /^(?=.*[0-9])(?=.*[a-zA-Z]).{2,}$/,
        /^(?=.*[!@#$%^&*()_+])(?=.*[a-zA-Z]).{2,}$/,
        /^(?=.*[0-9])(?=.*[!@#$%^&*()_+]).{2,}$/,
        /^(?=.*[0-9])(?=.*[!@#$%^&*()_+])(?=.*[a-zA-Z]).{3,}$/,
        /(\w)\1\1/]);


    const idWatcher = watch("id");
    const pdWatcher = watch("password");
    const pdConfirmWatcher = watch("passwordConfirm");
    const birthYearWatcher = watch("birth_year");
    const birthMonthWatcher = watch("birth_month");
    const birthDayWatcher = watch("birth_day");


    const pwSecondConditionChecker = (pwd: string) => {

        return pwregs.current[1].test(pwd) || pwregs.current[2].test(pwd) || pwregs.current[3].test(pwd)
            || pwregs.current[4].test(pwd)
    }

    const onIdFocus = () => {
        setIdWarningInfo(true);
    }

    const onPwdFocus = () => {
        setPwdWarningInfo(true);
    }

    const onPwd2Focus = () => {
        setPwd2WarningInfo(true);
    }



    const onOverlapCheckClick = (key: "id" | "email" | "phone") => () => {
        overlapCheck(key, watch(key));
    }







    const onValid = (data: ISignUpForm) => {
        if (!isValidCheckBox()) {
            setError("?????? ????????? ??????????????????");
            return;
        }
        if (!data.address_main || !data.address_sub) {
            setError("????????? ??????????????????");
            return;
        }

        const postData: SignUpSubmit = {
            id: data.id, pwd: data.password, name: data.name, email: data.email,
            phone: data.phone,
            sex: data.sex === "man" ? "M" : "G",
            birth: data.birth_year + " " + data.birth_month + " " + data.birth_day,
            address_main: data.address_main,
            address_desc: data.address_sub
        }
        if (data.sex === "no") {
            delete postData.sex;
        }

        mutate(postData);
    }

    useEffect(() => {
        if (data && data.code === 1000) {
            router.push("/login");
        }
    }, [data])


    const onInValid = (data: any) => {

        const firstErrorKey = Object.keys(data)[0];
        const firstError = data[firstErrorKey].message;
        setError(firstError);

    }

    const onSelectKind = (e: React.MouseEvent) => {
        const target = e.target as Element
        if (target.tagName === "INPUT") {
            setKind((target as HTMLInputElement).value);
        }
    }
    const allAgreeHandler = (checked: boolean) => {

        setIsAllChecked(!isAllChecked);
        if (checked) {
            setCheckedItems([...checkedItems, "use", "requiredPrivacy", "privacy", "delivery", "age"])
        } else {
            setCheckedItems([]);
        }
    }
    const onAllChange = (e: React.MouseEvent) => {
        allAgreeHandler((e.currentTarget as HTMLInputElement).checked);
    }

    const agreeHandler = (checked: boolean, value: string) => {
        if (checked) {
            setCheckedItems([...checkedItems, value]);
        } else {
            setCheckedItems(checkedItems.filter((item) => item !== value))
        }
        setIsAllChecked(false);
    }

    const onPartSelectChange = (e: React.ChangeEvent<HTMLDivElement>) => {
        const target = e.target as HTMLElement
        if (target.tagName === "INPUT" && target.className.includes("part")) {

            agreeHandler((target as HTMLInputElement).checked, (target as HTMLInputElement).value);
        }
    };

    const isValidCheckBox = () => {
        return (
            checkedItems.includes("use") &&
            checkedItems.includes("requiredPrivacy") &&
            checkedItems.includes("age")
        )
    }

    useEffect(() => {
        if (birthYearWatcher) {
            if (!/\d/.test(birthYearWatcher)) resetField("birth_year");
        }
    }, [birthYearWatcher])

    useEffect(() => {
        if (birthMonthWatcher) {
            if (!/\d/.test(birthMonthWatcher)) resetField("birth_month");
        }
    }, [birthMonthWatcher])

    useEffect(() => {
        if (birthDayWatcher) {
            if (!/\d/.test(birthDayWatcher)) resetField("birth_day");
        }
    }, [birthDayWatcher])




    return (
        <div className="w-full  h-[100vh]">
            <div className="w-full  pb-48 flex flex-col justify-center items-center ">
                <form onSubmit={handleSubmit(onValid, onInValid)} className="flex p-8 flex-col w-[700px] space-y-2 ">
                    <div className="relative border-b-2 border-black p-16">
                        <h1 className="text-center text-3xl">????????????</h1>
                        <span className="absolute bottom-2 right-0 text-xs"><span className="text-red-600">*</span>??????????????????</span>
                    </div>
                    <div className="border-b-2 border-black p-3 py-7 space-y-7 ">
                        <div className=" grid gap-x-2 items-center grid-cols-[1.3fr_3fr_1fr]">
                            <div className="p-3 pl-0 self-start">?????????<span className="text-red-600">*</span></div>
                            <div className="">
                                <input onFocus={onIdFocus} {...register("id", {
                                    required: { value: true, message: "???????????? ??????????????????" },
                                    pattern: { value: /^[0-9a-zA-Z]{6,}$/, message: "???????????? ????????? ?????? ????????????" },
                                    validate: { one: v => idOverlap || "????????? ??????????????? ???????????? ????????????." }
                                })} className="border-2 rounded-sm w-full p-3 mb-2 text-sm" placeholder="6??? ????????? ?????? ?????? ????????? ????????? ??????" />
                                <div className={cls(idWarningInfo ? "" : "hidden", "text-xs space-y-1")}>
                                    <div className={cls(idregs.current.test(idWatcher) ? "text-green-600" : "text-red-600")}>6??? ????????? ?????? ?????? ????????? ????????? ??????</div>
                                    <div className={cls(idOverlap ? "text-green-600" : "text-red-600")}>????????? ????????????</div>
                                </div>
                            </div>
                            <div className="self-start">
                                <Button onClick={onOverlapCheckClick("id")} size="small" backcolor="white" text="????????????" />
                            </div>
                        </div>
                        <div className=" grid gap-x-2 items-center grid-cols-[1.3fr_3fr_1fr]">
                            <div className="p-3 pl-0 self-start">????????????<span className="text-red-600">*</span></div>
                            <div>
                                <input onFocus={onPwdFocus} {...register("password", {
                                    required: { value: true, message: "??????????????? ??????????????????" },
                                    validate: {
                                        one: v => pwregs.current[0].test(v) || "??????????????? 10??? ??????????????? ?????????.",
                                        two: v => pwSecondConditionChecker(v) || "???????????? 2?????? ????????? ??????????????????.",
                                        three: v => !pwregs.current[5].test(v) || "???????????? 3?????? ????????? ??????????????????."
                                    }
                                })} className="border-2 rounded-sm w-full p-3 mb-2 text-sm" placeholder="??????????????? ??????????????????" />
                                <div className={cls(pwdWarningInfo ? "" : "hidden", "text-xs space-y-1")}>
                                    <div className={cls(pwregs.current[0].test(pdWatcher) ? "text-green-600" : "text-red-600")}>10??? ?????? ??????</div>
                                    <div className={cls(pwSecondConditionChecker(pdWatcher) ? "text-green-600" : "text-red-600")}>??????/??????/????????????(?????? ??????)??? ????????????,2??? ?????? ??????</div>
                                    <div className={cls(pwregs.current[5].test(pdWatcher) ? "text-red-600" : "text-green-600")}>????????? ?????? 3??? ?????? ?????? ?????? ??????</div>
                                </div>
                            </div>
                        </div>
                        <div className="grid gap-x-2 items-center grid-cols-[1.3fr_3fr_1fr]">
                            <div className="p-3 pl-0 self-start">??????????????????<span className="text-red-600">*</span></div>
                            <div>
                                <input onFocus={onPwd2Focus} {...register("passwordConfirm", {
                                    required: { value: true, message: "???????????? ????????? ??????????????????" },
                                    validate: {
                                        one: v => pdWatcher === v || "??????????????? ???????????? ????????????."
                                    }
                                })} className="border-2 rounded-sm w-full p-3 mb-2 text-sm" placeholder="??????????????? ?????? ??? ??????????????????" />
                                <div className={cls(pwd2WarningInfo ? "" : "hidden", "text-xs space-y-1")}>
                                    <div className={cls(pdWatcher === pdConfirmWatcher ? "text-green-600" : "text-red-600")}>????????? ??????????????? ??????????????????</div>
                                </div>

                            </div>
                        </div>
                        <div className=" grid gap-x-2 items-center grid-cols-[1.3fr_3fr_1fr]">
                            <div>??????<span className="text-red-600">*</span></div>
                            <input {...register("name", { required: { value: true, message: "????????? ??????????????????" } })} className="border-2 rounded-sm w-full p-3 text-sm" placeholder="????????? ??????????????????" />
                        </div>
                        <div className=" grid gap-x-2 items-center grid-cols-[1.3fr_3fr_1fr]">
                            <div>?????????<span className="text-red-600">*</span></div>
                            <input {...register("email", {
                                required: { value: true, message: "???????????? ??????????????????" },
                                pattern: { value: /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/, message: "????????? ????????? ??????????????????." },
                                validate: {
                                    one: v => emailOverlap || "???????????? ?????? ????????? ???????????? ????????????."
                                }
                            })} className="border-2 rounded-sm w-full p-3  text-sm" placeholder="???:marketkurly@kurly.com" />
                            <Button onClick={onOverlapCheckClick("email")} size="small" backcolor="white" text="????????????" />
                        </div>
                        <div className="grid  gap-x-2 items-center grid-cols-[1.3fr_3fr_1fr]">
                            <div>?????????<span className="text-red-600">*</span></div>
                            <div>
                                <input {...register("phone", {
                                    required: { value: true, message: "??????????????? ??????????????????" },
                                    pattern: { value: /^01([0|1|6|7|8|9])([0-9]{3,4})([0-9]{4})$/, message: "???????????? ????????? ???????????? ????????????." },
                                    validate: {
                                        one: v => phoneOverlap || "????????? ?????? ????????? ???????????? ????????????."
                                    }
                                })} className="border-2 rounded-sm w-full p-3 text-sm" placeholder="????????? ??????????????????" />
                            </div>
                            <Button onClick={onOverlapCheckClick("phone")} size="small" backcolor="white" text="????????????" />
                        </div>
                        <div className="grid gap-x-2 items-center grid-cols-[1.3fr_4fr]">
                            <div className="p-3 pl-0 self-start">??????<span className="text-red-600">*</span></div>
                            <SearchAddress register={register} />
                        </div>
                        <div className=" grid gap-x-2 items-center grid-cols-[1.3fr_3fr_1fr]">
                            <div>??????</div>
                            <div onClick={onSelectKind} className="flex justify-between text-md">
                                <label>
                                    <input
                                        {...register("sex", { required: true })}
                                        className="mr-2"
                                        type="radio"
                                        name="sex"
                                        value="man"
                                        readOnly
                                    ></input>
                                    ??????
                                </label>
                                <label>
                                    <input
                                        {...register("sex", { required: true })}
                                        className="mr-2"
                                        type="radio"
                                        name="sex"
                                        value="girl"
                                        readOnly
                                    ></input>
                                    ??????
                                </label>
                                <label>
                                    <input
                                        {...register("sex", { required: true })}
                                        className="mr-2"
                                        type="radio"
                                        name="sex"
                                        value="no"
                                        readOnly
                                        defaultChecked
                                    ></input>

                                    ????????????
                                </label>
                            </div>
                        </div>
                        <div className=" grid gap-x-2 items-center grid-cols-[1.3fr_3fr_1fr]">
                            <h1>????????????</h1>
                            <div className="flex items-center border-2 ">
                                <input maxLength={4} {...register("birth_year", {
                                    required: { value: true, message: "??????????????? ??????????????????" }
                                    ,
                                    pattern: {
                                        value: /(19|20)\d{2}/
                                        , message: "????????? ????????? ??????????????????"
                                    }
                                })} className="outline-none p-2 pl-9 w-28" type="text" placeholder="YYYY" />
                                <span>/</span>
                                <input maxLength={2} {...register("birth_month", {
                                    required: { value: true, message: "??????????????? ??????????????????" }
                                    ,
                                    pattern: { value: /0[1-9]|1[012]/, message: "?????? ????????? ??????????????????" }
                                })} className="outline-none p-2 pl-9 w-28" type="text" placeholder="MM" />
                                <span>/</span>
                                <input maxLength={2} {...register("birth_day", {
                                    required: { value: true, message: "??????????????? ??????????????????" }
                                    ,
                                    pattern: { value: /0[1-9]|[12][0-9]|3[01]/, message: "?????? ?????? ????????? ??????????????????" }
                                })} className="outline-none p-2 pl-9 w-28" type="text" placeholder="DD" />
                            </div>
                        </div>
                    </div>
                    <div className="border-b-[1px] py-5 grid gap-x-2 items-center grid-cols-[1fr_3fr]">
                        <h1>
                            ??????????????????<span className="text-red-600">*</span>
                        </h1>
                        <div onChange={onPartSelectChange} className="flex flex-col space-y-5">
                            <label className="flex">
                                <input
                                    onClick={onAllChange}
                                    className="mr-2 w-5 h-5 mt-3"
                                    type="checkbox"
                                    readOnly
                                    checked={isAllChecked}
                                />
                                <div className="self-start pt-2 ">
                                    <h3 className="text-lg">?????? ???????????????.</h3>
                                    <span className="text-[11px]">??????????????? ???????????? ?????? ????????? ???????????? ??? ????????????
                                        ???????????? ????????? ??? ????????????.</span>
                                </div>
                            </label>
                            <label className="flex items-center text-sm font-semibold text-gray-500">
                                <input value="use" className="part mr-2 w-5 h-5" type="checkbox"
                                    checked={checkedItems.includes("use") ? true : false}
                                    readOnly
                                />
                                ???????????? ??????<span>(??????)</span>
                            </label>
                            <label className="flex items-center text-sm font-semibold text-gray-500">
                                <input value="requiredPrivacy" className="part mr-2 w-5 h-5" type="checkbox"
                                    checked={checkedItems.includes("requiredPrivacy") ? true : false}
                                    readOnly
                                />
                                ???????????? ??????????????? ??????<span>(??????)</span>
                            </label>
                            <label className="flex items-center text-sm font-semibold text-gray-500">
                                <input value="privacy" className="part mr-2 w-5 h-5" type="checkbox"
                                    checked={checkedItems.includes("privacy") ? true : false}
                                    readOnly
                                />
                                ???????????? ??????????????? ??????<span>(??????)</span>
                            </label>
                            <label className="flex items-center text-sm font-semibold text-gray-500">
                                <input value="delivery" className="part mr-2 w-5 h-5" type="checkbox"
                                    checked={checkedItems.includes("delivery") ? true : false}
                                    readOnly
                                />
                                ????????????,???????????? ??? ??????/?????? ?????? ??????<span>(??????)</span>
                            </label>
                            <label className="flex items-center text-sm font-semibold text-gray-500">
                                <input value="age" className="part mr-2 w-5 h-5" type="checkbox"
                                    checked={checkedItems.includes("age") ? true : false}
                                    readOnly
                                />
                                ????????? ??? 14??? ???????????????.<span>(??????)</span>
                            </label>
                        </div>
                    </div>
                    <div className="text-center  pt-6">
                        <Button type="submit" size="middle" backcolor='purple' text="????????????"></Button>
                    </div>
                </form>
            </div>
            {error ? <Alarm message={error} setMessage={setError} /> : null}
        </div >
    )
}

export default SignUp;