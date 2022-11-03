import axios from 'axios';
import { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import swAlert from '@sweetalert/with-react';

const Detalle = () => {
    let token = sessionStorage.getItem("token");

    const [movie, setMovie] = useState(null)

    let query = new URLSearchParams(window.location.search);
    let movieID = query.get("movieID");

    useEffect(() => {
        const endPoint = `https://api.themoviedb.org/3/movie/${movieID}?api_key=bc5a79b54a86f210558aa28465ab7430&language=en-US`
        axios.get(endPoint)
            .then(response => {
                const movieData = response.data
                setMovie(movieData)
            })
            .catch(error => {
                swAlert(<h2>Problemas en la base de datos</h2>)
                console.error(`Error: ${error}`)
            })
    }, [movieID])

    return (

        <>
            {!token && <Redirect to="/" />}

            {!movie && <p>Cargando...</p>}

            {movie &&
                <>
                    <h2>Title: {movie.title}</h2>
                    <div className="row">
                        <div className="col-4">
                            <img src={`http://image.tmdb.org/t/p/w500/${movie.poster_path}`} className="img-fluid" alt="Movie poster" />
                        </div>
                        <div className="col-8">
                            <h5>Release date: {movie.release_date}</h5>
                            <h5>Review:</h5>
                            <p>{movie.overview}</p>
                            <h5>Rating: {movie.vote_average}</h5>
                            <h5>Genres:</h5>
                            <ul>
                                {movie.genres.map((genre, index) => <li key={index}>{genre.name}</li>)}
                            </ul>
                        </div>
                    </div>
                </>
            }
        </>
    )
};

export default Detalle;