import Button from '@components/Button';
import ImagesBox from '@components/Search/ImagesBox';
import { NextPage } from 'next';

const Search: NextPage = () => {
    return (
        <div className="p-28 pt-6">
            <h1 className="text-center text-3xl font-semibold border-b-2 border-purple-800 p-10">상품검색</h1>
            <div className="border-b-[1px] border-purple-800 p-6 items-center gap-5 grid grid-cols-[1fr_4fr_1fr]">
                <div className="text-sm font-semibold">검색조건</div>
                <input className="p-3 rounded-sm border-[1.5px]" />
                <button className="w-full h-full bg-purple-800 text-white rounded-sm">검색하기</button>
            </div>
            <ImagesBox />
        </div>
    )
}

export default Search;