import HomeMainSlider from '@components/Slider/HomeMainSlider'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div>
      <HomeMainSlider />
    </div>
  )
}

export default Home
