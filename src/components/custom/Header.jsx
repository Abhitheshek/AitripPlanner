import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router'

const Header = () => {
  return (
    <div className=' flex items-center justify-between px-9 shadow-md py-3'>
  <Link to={'/'}> <img src="/logo.svg" alt="logo img" /> </Link>
     <Button>sign in</Button>  
    </div>
  )
}

export default Header