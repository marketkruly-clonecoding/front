import MyInfo from '@components/MyPage/MyInfo';
import MyNav from '@components/MyPage/MyNav';
import { cls } from '@libs/cls';
import { NextPage } from 'next';
import { useState } from 'react';

const MyReviewPage: NextPage = () => {

    const [reviewKind, setReviewKind] = useState<"possible" | "complete">("possible");

    const onPossibleClick = () => {
        setReviewKind("possible");
    }

    const onCompleteClick = () => {
        setReviewKind("complete");
    }

    return (
        <div>
            <MyInfo />
            <div className="bg-white px-28 flex">
                <MyNav />
                <div className="w-full pl-8 ">
                    <header className="flex pt-10 pb-6 justify-between w-full mb-10 ">
                        <div className="flex flex-col items-start">
                            <h1 className="text-xl font-semibold mb-8">상품 후기</h1>
                            <h3 className="text-sm font-semibold  text-gray-400">
                                후기 작성 시 사진후기 100원, 글후기 50원을 적립해드립니다.
                            </h3>
                            <ul className="list-disc ml-4 text-sm text-gray-400">
                                <li>퍼플,더퍼플은 2배 적립(사진200원, 글 100원)</li>
                                <li>주간 베스트 후기로 선정 시 5,000원을 추가 적립</li>
                            </ul>
                            <div className="text-sm font-semibold  text-gray-400">* 후기 작성은 배송 완료일로부터 30일 이내 가능합니다.</div>
                        </div>
                    </header>
                    <div className="flex w-full">
                        <button onClick={onPossibleClick} className={cls(reviewKind === "possible" ? "text-purple-800 border-b-purple-800" : "text-gray-400", "border-2 w-1/2 p-3 ")}>작성가능 후기(0)</button>
                        <button onClick={onCompleteClick} className={cls(reviewKind === "complete" ? "text-purple-800 border-b-purple-800" : "text-gray-400", "border-2 w-1/2 p-3 ")}>작성완료 후기(0)</button>
                    </div>
                    {reviewKind === "possible" ?
                        <div className="w-full">
                            <p className="w-full text-center mt-12 text-xs text-gray-400 font-semibold"> 작성가능 후기 내역이 없습니다.</p>
                        </div>
                        :
                        <div className="w-full text-center  mt-12 text-xs text-gray-400 font-semibold">
                            <p>작성한 후기가 없습니다.</p>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default MyReviewPage;