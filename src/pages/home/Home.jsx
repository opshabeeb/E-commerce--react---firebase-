import React, { useContext } from 'react'
import Layout from '../../components/layout/Layout'
import HeroSection from '../../components/heroSection/HeroSection'
import Category from '../../components/category/Category'
import HomePageProductCard from '../../components/homePageProductCard/HomePageProductCard'
import Track from '../../components/track/Track'
import Teastimonial from '../../components/testimonial/Teastimonial'
import MyContext from '../../context/MyContext'
import Loader from '../../components/loader/Loader'


const Home = () => {
  
  return (
    <Layout>
        <HeroSection/>
        <Category/>
        <HomePageProductCard/>
        <Track/>
        <Teastimonial/>
    </Layout>
  )
}

export default Home