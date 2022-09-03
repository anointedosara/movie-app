import React, { useEffect, useState } from 'react'
import Modal from '../Components/Modal';

function Trending() {
    const [data, setData] = useState([])
    const [modalData, setModalData] = useState({})
    const [pag, setPag] = useState([])
    const [page, setPage] = useState(1)
    const [showModal, setShowModal] = useState(false)

    const getdata = async () => {
        fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=7d8950b413b70f01371c062f2f50f32d&page=${page}`)
        .then((data) => data.json())
        .then((data) => {
            setData(data?.results)
            setPag(data?.results?.length)
            console.log(data)
        })
        .catch((error) => console.log(error))
    };

    useEffect(() => {
        getdata()
        window.scroll(0, 0);
    }, [page])

  return (
    <div className='trending'>
      <div className='title'>TRENDING TODAY</div>
      <div className='trends'>
      {data &&
          data.map((ite, i) => <div className='trend' key={i} onClick={() => {setModalData({id: ite.id, type: ite.media_type}); setShowModal(true)}}>
              {ite?.poster_path ? <img src={`https://image.tmdb.org/t/p/w300${ite?.poster_path}`} alt="" /> : <img src="https://www.movienewz.com/img/films/poster-holder.jpg" alt="" /> }
                  <p>{ite.original_title || ite.title || ite.name}</p>
                  <div className='media'>
                      <p className='type'>{ite.media_type}</p>
                      <p>{ite.release_date || ite.first_air_date}</p>
                  </div>
                  <span>{ite.vote_average}</span>
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

export default Trending
