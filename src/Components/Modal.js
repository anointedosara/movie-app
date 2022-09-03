import React, { useEffect, useState } from 'react'

function Modal(props) {
    const [data, setData] = useState([])
    const [casts, setCasts] = useState([])
    const [video, setVideo] = useState();

    const getdata = async () => {
        fetch(`https://api.themoviedb.org/3/${props.type}/${props.id}?api_key=7d8950b413b70f01371c062f2f50f32d&language=en-US`)
        .then((data) => data.json())
        .then((data) => {
            setData(data)
            console.log(data)
        })
        .catch((error) => console.log(error))
    };

    const getCasts = async () => {
        fetch(`https://api.themoviedb.org/3/${props.type}/${props.id}/credits?api_key=26ba5e77849587dbd7df199727859189&language=en-US`)
        .then((data) => data.json())
        .then((data) => {
            setCasts(data)
            console.log(data)
        })
        .catch((error) => console.log(error))
    };

    const getVideo = async () => {
        fetch(`https://api.themoviedb.org/3/${props.type}/${props.id}/videos?api_key=26ba5e77849587dbd7df199727859189&language=en-US`)
        .then((data) => data.json())
        .then((data) => {
            setVideo(data.results[0]?.key)
            console.log(data)
        })
        .catch((error) => console.log(error))
    };
    

    useEffect(() => {
        getdata()
        getCasts()
        getVideo()
        window.scroll(0, 0);
    }, [props])
  return (
    <div className='modal' onClick={props?.closeModal}>
        <div className='inner-modal' onClick={(e) => e.stopPropagation()}>
            {data?.backdrop_path ? <img  className='potrait' src={`https://image.tmdb.org/t/p/w300${data?.backdrop_path}`} alt="" /> : <img  className='potrait' src="https://www.movienewz.com/img/films/poster-holder.jpg" alt="" /> }
            <div className='about'>
                <h1>{data.original_title || data.title || data.name}</h1>
                <p>{data.tagline}</p>
                <div>{data.overview}</div>
                <div className='casts'></div>
                <a target="__blank" href={`https://www.youtube.com/watch?v=${video}`}><button><i className="fa-brands fa-youtube"></i> Watch the Trailer</button></a>
            </div>
        </div>
    </div>
  )
}

export default Modal
