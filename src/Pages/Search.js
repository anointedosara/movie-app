import React, { useEffect, useState } from 'react'
import Modal from '../Components/Modal'

function Search() {
  const [search, setSearch] = useState('')
  const [line, setLine] = useState(0)
  const [data, setData] = useState([])
  const [pag, setPag] = useState([])
  const [page, setPage] = useState(1)
  const [type, setType] = useState('movie')
  const [modalData, setModalData] = useState({})
  const [showModal, setShowModal] = useState(false)
  const [style, setStyle] = useState({})

  const getData = async () => {
      fetch(`https://api.themoviedb.org/3/search/${type}?api_key=7d8950b413b70f01371c062f2f50f32d&language=en-US&query=${search}&page=${page}&include_adult=false`)
      .then((data) => data.json())
      .then((data) => {
          setData(data?.results)
          console.log(data)
          setPag(data?.results?.length)
      })
      .catch((error) => console.log(error))
  };

  const handleTv = () => {
    setLine('50%')
    setType('tv')
    setPage(1)
  }

  const handleMovie = () => {
    setLine(0)
    setType('movie')
    setPage(1)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setPage(1)
    if (search === '') {
      setData('')
    }
  }

    useEffect(() => {
        getData()
        window.scroll(0, 0);
    }, [type, page])
  
  return (
    <div className='search'>
      <div className='heading'>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder='Search' onChange={e => setSearch(e.target.value)} />
          <button type="submit" onClick={getData}><i className="fa-solid fa-magnifying-glass"></i></button>
        </form>
        <div className='topic-wrapper'>
          <div className='topics'>
            <button onClick={handleMovie}>SEARCH MOVIES</button>
            <button onClick={handleTv}>SEARCH TV SERIES</button>
          </div>
          <div className='line' style={{marginLeft: line}}></div>
          </div>
      </div>

      <div className='trends'>
      {data &&
          data?.map((ite, i) => <div className='trend' key={i} onClick={() => {setModalData({id: ite.id, type: type}); setShowModal(true);}}>
                {ite?.poster_path ? <img src={`https://image.tmdb.org/t/p/w300${ite?.poster_path}`} alt="" /> : <img src="https://www.movienewz.com/img/films/poster-holder.jpg" alt="" /> }
                <p>{ite?.original_title || ite?.title || ite?.name}</p>
                <div className='media'>
                    <p>{type === 'tv' ? 'TV Series' : 'Movie'}</p>
                    <p>{ite?.release_date || ite?.first_air_date}</p>
                </div>
                <span>{ite?.vote_average}</span>
            </div>)
          }
      </div>

      {
        data && <div className='btn'>
        {page === 1 ? <button disabled className='disabled'>Prev</button> : <button onClick={() => setPage(prevPage => prevPage - 1)}>Prev</button>}
        {pag < 20 ? <button disabled className='disabled'>Next</button> : <button onClick={() => setPage(prevPage => prevPage + 1)}>Next</button>}
      </div>
      }

      {showModal && <Modal id={modalData.id} type={modalData.type} closeModal={() => setShowModal(false)} />}
    </div>
  )
}

export default Search
