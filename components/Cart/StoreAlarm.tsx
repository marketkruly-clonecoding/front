import { Product, ProductDetail } from '@libs/types';
import { closeCartAlarm } from '@modules/product';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

interface IStoreAlarm {
    info: Product | ProductDetail;
}

const StoreAlarm = ({ info }: IStoreAlarm) => {

    const dispatch = useDispatch();

    useEffect(() => {
        setTimeout(() => {
            dispatch(closeCartAlarm());
        }, 1500);
    }, [])


    return <div className="absolute top-12 right-0 w-[350px] border-2 z-20 bg-white flex p-5 space-x-6">
        <img src={info.url} className=" w-12 h-16 bg-gray-400  " />
        <div className="space-y-2 flex flex-col justify-center">
            <h1>{info.brand_name ? `[${info.brand_name}]` : null} {info.name}</h1>
            <p>장바구니에 상품을 담았습니다.</p>
        </div>
    </div>
}

export default StoreAlarm;