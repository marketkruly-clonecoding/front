import StoreInCart from '@components/Cart/StoreInCart';
import SideBar from '@components/SideBar'
import HomeMainSlider from '@components/Slider/HomeMainSlider'
import HomeSubSlider from '@components/Slider/HomeSubSlider'
import { Product, ProductList } from '@libs/types';
import { RootState } from '@modules/index';
import type { GetStaticProps, NextPage } from 'next'
import { useSelector } from 'react-redux';


export type semiResult = [Product, ProductList[]];

type result = [random: semiResult[], sales: semiResult[], sells: semiResult[], only: semiResult[]];

interface IHomeResponse {
  isSuccess: boolean;
  code: number;
  message: string;
  result: result;
}

interface IHome {
  home: result
}

const Home: NextPage<IHome> = ({ home }) => {

  const { cartWindow } = useSelector((state: RootState) => state.product);

  return (
    <div className="w-full h-full">
      <HomeMainSlider />
      <HomeSubSlider title="마켓컬리만의 랜덤 추천!" subTitle="한번 써보십쇼" datas={home[0]} />
      <HomeSubSlider title="오늘의 할인 콘텐츠" subTitle="오늘의 할인!! 싸다" datas={home[1]} />
      <HomeSubSlider title="판매량 높은 상품들" subTitle="판매량 대박~~" datas={home[2]} />
      <HomeSubSlider title="마켓컬리 단독 상품들" subTitle="오직 마켓컬리에서만" datas={home[3]} />
      <SideBar position="120vh" initScrollPosition={650} />
      {cartWindow ? <StoreInCart info={cartWindow} /> : null}
    </div>
  )
}

export default Home


export const getStaticProps: GetStaticProps = async ({ }) => {

  const result: IHomeResponse = await (await fetch(`http://prod.hiimpedro.site:9000/app/home`)).json();

  if (!result.isSuccess) {
    return {
      props: {}
    }
  }
  return {
    props: { home: result.result }
  }
}
