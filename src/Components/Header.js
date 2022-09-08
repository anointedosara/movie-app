import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <Link to='/'>
      <div className='header'>
        🎬 ENTERTAINMENT HUB 🎥
      </div>
    </Link>
  )
}

export default Header
