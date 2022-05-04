import category, { categoryIdKey } from '@libs/category';
import { cls } from '@libs/cls';
import Image from 'next/image';
import React, { useState } from 'react';


interface ICategory {
    onCategoryEnter: () => void;
    onCategoryMouseLeave: () => void;
}

const Category = ({ onCategoryEnter, onCategoryMouseLeave }: ICategory) => {

    const [categoryInfo, setCategoryInfo] = useState<string[] | null>(null);
    const [selectKey, setSelectKey] = useState<string | null>(null);

    const onMouseMove = (e: React.MouseEvent) => {

        const { dataset: { id } } = e.target as HTMLElement;
        if (id) {
            setCategoryInfo(category[id]);
            setSelectKey(id);
        }
    }


    return (
        <div onMouseEnter={onCategoryEnter} onMouseLeave={onCategoryMouseLeave} className="flex absolute left-0 top-14    border-2 ">
            <ul onMouseMove={onMouseMove} className="w-52  h-[70vh] overflow-auto text-sm font-semibold text-gray-500">
                {Object.keys(category).map(key =>
                    <li key={key} data-id={key} className={cls("flex  p-2 hover:bg-gray-100 hover:text-purple-800 cursor-pointer", key === selectKey ? "bg-gray-100 text-purple-800" : "bg-white text-gray-500")}>
                        <div className="relative w-6 h-6 mr-2">
                            <Image layout='fill' objectFit='contain' src={`/images/카테고리/${key}.PNG`} />
                        </div>
                        <span>{categoryIdKey[key]}</span>
                    </li>)
                }
            </ul>
            {categoryInfo ?
                <ul className="w-52 bg-gray-100  h-[70vh] text-sm font-semibold text-gray-500">
                    {
                        categoryInfo.map(info =>
                            <li className="p-2 hover:text-purple-800 hover:underline cursor-pointer">
                                {info}
                            </li>
                        )
                    }
                </ul>
                :
                null}
        </div>
    )


}

export default Category;