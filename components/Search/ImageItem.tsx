

const ImageItem = () => {

    return <li className="w-[340px]">
        <div className="w-full h-[435px] bg-slate-500 mb-4" />
        <div className="space-y-3">
            <h1 className="text-xl">[올프레쉬] 컷팅과일 300g(대)</h1>
            <div className="text-lg font-semibold">7250원</div>
            <p className="text-sm text-gray-400 font-semibold">간편하게 나누는 달콤함</p>
            <ul className="flex text-xs space-x-2">
                <li className="bg-gray-200 px-2 py-1 rounded-sm text-purple-800 font-semibold">Kurly Only</li>
                <li className="bg-gray-200 px-2 py-1 text-gray-600 font-semibold rounded-sm">한정 수량</li>
            </ul>
        </div >
    </li >
}

export default ImageItem;