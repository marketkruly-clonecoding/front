
import ImagesBox from "@components/Search/ImagesBox";

const CategoryDetail = () => {

    return (
        <div className="p-28 pt-6">
            <div className="w-[1048px] h-[200px] bg-gray-400" />
            <h1 className="text-3xl text-center p-9">과일,견과,쌀</h1>
            <ul className="grid grid-cols-4 border-2 justify-center items-center p-8 gap-y-3 text-sm font-semibold">
                <li className="cursor-pointer  flex justify-start items-center">전체보기</li>
                <li className="cursor-pointer  flex justify-start items-center">친환경</li>
                <li className="cursor-pointer  flex justify-start items-center">제철과일</li>
                <li className="cursor-pointer  flex justify-start items-center">국산과일</li>
                <li className="cursor-pointer  flex justify-start items-center">수입과일</li>
                <li className="cursor-pointer  flex justify-start items-center">간편과일</li>
                <li className="cursor-pointer  flex justify-start items-center">냉동,건과일</li>
                <li className="cursor-pointer  flex justify-start items-center">견과류</li>
                <li className="cursor-pointer  flex justify-start items-center">쌀,잡곡</li>
            </ul>
            <ImagesBox />
        </div>
    )

}

export default CategoryDetail;