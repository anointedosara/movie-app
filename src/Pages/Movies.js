import React, { useEffect, useState } from 'react'
import Modal from '../Components/Modal'

function Movies() {
    const [data, setData] = useState([])
    const [genres, setGenres] = useState([])
    const [pag, setPag] = useState([])
    const [genre, setGenre] = useState("")
    const [page, setPage] = useState(1)
    const [modalData, setModalData] = useState({})
    const [showModal, setShowModal] = useState(false)
    const [style, setStyle] = useState({})

    const getGenre = async () => {
        fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=7d8950b413b70f01371c062f2f50f32d&page=${page}&language=en-US`)
        .then((data) => data.json())
        .then((data) => {
            setGenres(data?.genres)
            console.log(data, "genres")
        })
        .catch((error) => console.log(error))
    };

    const getGenreMovies = async () => {
      fetch(`https://api.themoviedb.org/3/discover/movie?api_key=7d8950b413b70f01371c062f2f50f32d&language=en-US&sort_by=popularity
      .desc&include_adult=false&include_video=false&page=${page}&with_genres=${genre}`)
      .then((Data) => Data.json())
      .then((Data) => {
          setData(Data?.results)
          console.log(Data?.results, "results")
          setPag(data?.results?.length)
      })
      .catch((error) => console.log(error))
  };

  useEffect(() => {
    getGenreMovies()
    setPage(1)
  }, [genre])

    useEffect(() => {
        getGenreMovies()
        getGenre()
        window.scroll(0, 0);
    }, [page])
  return (
    <div className='movies' style={showModal === true ? style : {}}>
      <div className='title'>DISCOVER MOVIES</div>
      <div className='genres'>
        {
         genres?.length ? genres?.map((ite, i) => <div key={i} onClick={() => setGenre(ite?.name)}>{ite.name}</div>) : null
        }
      </div>
      <div className='trends'>
      {data &&
          data.map((ite, i) => (
            <div className='trend' key={i} onClick={() => {setModalData({id: ite.id, type: 'movie'}); setShowModal(true); setStyle({position: 'fixed'})}}>
                {ite?.poster_path ? <img src={`https://image.tmdb.org/t/p/w300${ite?.poster_path}`} alt="" /> : <img src="https://www.movienewz.com/img/films/poster-holder.jpg" alt="" /> }
                <p>{ite.original_title || ite.title || ite.name}</p>
                <div className='media'>
                    <p className='type'>Movies</p>
                    <p>{ite.release_date || ite.first_air_date}</p>
                </div>
                <span>{ite.vote_average}</span>
            </div>)
          )}
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

export default Movies
