
import StoreInCart from '@components/Cart/StoreInCart';
import ImagesBox from "@components/Search/ImagesBox";
import SideBar from '@components/SideBar';
import category, { categoryIdKey, mainCategoryApiId, subCategoryApiId } from '@libs/category';
import { cls } from '@libs/cls';
import { RootState } from '@modules/index';
import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import useSWR from 'swr';

const CategoryDetail = ({ result }: any) => {

    const router = useRouter();
    const { cartWindow } = useSelector((state: RootState) => state.product);

    if (router.isFallback) {
        return <div>로딩중</div>
    }


    return (
        <div className="p-28 pt-6">
            <div className="w-[1048px] h-[200px] bg-gray-400" />
            <h1 className="text-3xl text-center p-9">{categoryIdKey[result.category]}</h1>
            <ul className="grid grid-cols-4 border-2 justify-center items-center p-8 gap-y-3 text-sm font-semibold">
                <li className={cls(result.id === mainCategoryApiId[result.category] + "" ? "text-purple-800" : "", "cursor-pointer  flex justify-start items-center")}>
                    <Link href={`/category/${result.category}-${mainCategoryApiId[result.category]}-1`}>
                        <a>
                            전체보기
                        </a>
                    </Link>
                </li>
                {category[result.category].map((item: string, index: number) =>
                    <li key={index} className={cls(result.id === subCategoryApiId[result.category][index] + "" ? "text-purple-800" : "", "cursor-pointer  flex justify-start items-center")}>
                        <Link href={`/category/${result.category}-${subCategoryApiId[result.category][index]}-1`}>
                            <a>
                                {item}
                            </a>
                        </Link>
                    </li>
                )}
            </ul>
            <ImagesBox productsInfo={result.result} />
            <SideBar position="30vh" initScrollPosition={150} />
            {cartWindow ? <StoreInCart info={cartWindow} /> : null}
        </div>
    )

}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: true
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {

    const [category, id, page] = (params?.id + "").split("-");
    console.log(params);
    if (!category || !id) return { props: {} };

    const result = await (await fetch(`http://prod.hiimpedro.site:9000/app/products/product?Category=${encodeURIComponent(id)}&Pages=${page}`)).json();

    return {
        props: {
            result: JSON.parse(JSON.stringify({ ...result, category, id }))
        },
        revalidate: 86400
    }
}


export default CategoryDetail;