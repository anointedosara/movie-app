import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <div className='footer'>
      <Link to='/'>
        <button>
          <i className="fa-solid fa-fire"></i>
          Trending
        </button>
      </Link>
      <Link to='/movies'>
        <button>
          <i className="fa-solid fa-clapperboard"></i>
          Movies
        </button>
      </Link>
      <Link to='/tvseries'>
        <button>
          <i className="fa-solid fa-tv"></i>
          TV-Series
        </button>
      </Link>
      <Link to='/search'>
        <button>
          <i className="fa-solid fa-magnifying-glass"></i>
          Search
        </button>
      </Link>
    </div>
  )
}

export default Footer
