import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router'

const LandingPage = () => {
  return (
    <div className='  flex flex-col items-center text-center h-screen pb-44 overflow-hidden  justify-center px-6 md:px-44 gap-6 md:pt-28 pt-20'>
        <h1 className='md:text-6xl text-3xl  font-black '><span className='text-violet-600'>Discover Your Next Adventure with AI:</span> Personalized Itineraries at Your Fingertips</h1>
       <p className='text-gray-400 font-semibold md:text-lg text-sm'>Your personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget.</p>
       <Link to={'/create-trip'}>
       <Button className=" bg-violet-600">Get started , it's free</Button>
       </Link>
       
    </div>
  )
}

export default LandingPage