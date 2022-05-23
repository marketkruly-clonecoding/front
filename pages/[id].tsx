import Button from '@components/Button';
import ImagesBox from '@components/Search/ImagesBox';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { Product } from "@libs/types";
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import SideBar from '@components/SideBar';
import StoreInCart from '@components/Cart/StoreInCart';
import { useSelector } from 'react-redux';
import { RootState } from '@modules/index';

export interface ISearch {
    result: {
        isSuccess: boolean;
        code: number;
        message: string;
        result: any[];
    }
}


const Search: NextPage<ISearch> = ({ result }) => {

    const router = useRouter();
    const { register, handleSubmit } = useForm<{ search: string }>();
    const { cartWindowInfoInList } = useSelector((state: RootState) => state.product);

    const onValid = ({ search }: { search: string }) => {
        router.push(`/${search}`);
    }

    return (
        <div className="p-28 pt-6">
            <h1 className="text-center text-3xl font-semibold border-b-2 border-purple-800 p-10">상품검색</h1>
            <div className="border-b-[1px] border-purple-800 p-6 items-center gap-5 grid grid-cols-[1fr_4fr_1fr]">
                <div className="text-sm font-semibold">검색조건</div>
                <form onSubmit={handleSubmit(onValid)} className="w-full">
                    <input {...register("search", { required: true })} className="w-full p-3 rounded-sm border-[1.5px]" />
                </form>
                <button className="w-full h-full bg-purple-800 text-white rounded-sm">검색하기</button>
            </div>
            {router.isFallback ? "Loading..."
                : <ImagesBox productsInfo={result.result} />
            }
            <SideBar position="30vh" initScrollPosition={150} />
            {cartWindowInfoInList ? <StoreInCart info={cartWindowInfoInList} /> : null}
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

    const result = await (await fetch(`http://prod.hiimpedro.site:9000/app/products/productName?Keyword=${params?.id}`)).json();

    return {
        props: {
            result: JSON.parse(JSON.stringify(result))
        },
        revalidate: 86400
    }
}


export default Search;