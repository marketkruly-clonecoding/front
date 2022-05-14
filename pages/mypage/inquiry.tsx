import MyInfo from '@components/MyPage/MyInfo';
import MyNav from '@components/MyPage/MyNav';
import { NextPage } from 'next';

const MyInquiryPage: NextPage = () => {

    return (
        <div>
            <MyInfo />
            <div className="bg-white px-28 flex">
                <MyNav />
                <div className="w-full pl-8 ">
                    <header className="flex pt-10 pb-9 justify-between w-full border-b-2 border-black">
                        <div className="flex flex-col items-start">
                            <h1 className="text-xl font-semibold mb-8">상품문의</h1>
                            <ul className="list-disc ml-4 text-sm whitespace-nowrap text-gray-400">
                                <li>상품에 대한 문의를 남기는 공간입니다. 해당 게시판의 성격과 다른 글은 사전동의 없이 담당 게시판으로 이동될 수 있습니다.</li>
                                <li>배송관련,주문(취소/교환/환불)관련 문의 및 요청사항은 마이컬리 내 1:1문의에 남겨주세요</li>
                            </ul>
                        </div>
                    </header>
                    <ul>
                        <li className="grid grid-cols-[8fr_1fr_1.5fr] justify-items-center py-5 text-sm font-semibold border-b-[1px] border-black">
                            <div>제목</div>
                            <div>작성일</div>
                            <div>답변상태</div>
                        </li>
                        <p className="w-full text-center mt-28"> 작성한 상품 문의가 없습니다.</p>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default MyInquiryPage;