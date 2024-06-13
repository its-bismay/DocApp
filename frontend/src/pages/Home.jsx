import React from 'react'
import Hero from "../components/Hero"
import Biography from '../components/Biography'
import MessageForm from '../components/MessageForm'

const Home = () => {
  return (
    <>
    <Hero title ={"wellcome to the DRsCorner..."} imageUrl={"/hero.png"}/>
    <Biography imageUrl={"/about.png"}/>
    <MessageForm/>
    </>
  )
}

export default Home