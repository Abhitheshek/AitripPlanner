import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router'

const Header = () => {
  return (
    <div className='   flex items-center justify-between px-9 shadow-xl py-3'>
  <Link to={'/'}> <img src="/logoipsum-295.svg" alt="logo img" /> </Link>
     <Button  className=" bg-violet-600">sign in</Button>  
    </div>
  )
}

export default Header