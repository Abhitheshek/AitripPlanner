import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router'

const LandingPage = () => {
  return (
    <div className='flex flex-col items-center text-center justify-center px-6 md:px-44 gap-6 pt-28'>
        <h1 className='md:text-6xl text-2xl  font-black '><span className='text-orange-500'>Discover Your Next Adventure with AI:</span> Personalized Itineraries at Your Fingertips</h1>
       <p className='text-gray-400 font-semibold md:text-lg text-sm'>Your personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget.</p>
       <Link to={'/create-trip'}>
       <Button>Get started , it's free</Button>
       </Link>
       
    </div>
  )
}

export default LandingPage