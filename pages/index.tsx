import SideBar from '@components/SideBar'
import HomeMainSlider from '@components/Slider/HomeMainSlider'
import HomeSubSlider from '@components/Slider/HomeSubSlider'
import type { NextPage } from 'next'



const Home: NextPage = () => {

  return (
    <div>
      <HomeMainSlider />
      <HomeSubSlider title="냉장고 속 단골 재료" subTitle="한번 써보십쇼" datas={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]} />
      <HomeSubSlider title="뭘 먹을지 모를때" subTitle="여길 주목해 보십쇼" datas={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]} />
      <HomeSubSlider title="오늘의 할인 콘텐츠" subTitle="세일 빅 세일!!!" datas={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]} />
      <SideBar />
    </div>
  )
}

export default Home
