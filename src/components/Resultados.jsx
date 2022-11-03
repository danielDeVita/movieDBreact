import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import swAlert from '@sweetalert/with-react';

const Resultados = () => {
    let query = new URLSearchParams(window.location.search);
    let keyword = query.get("keyword");

    const [movieResults, setMovieResults] = useState([]);

    useEffect(() => {
        const endPoint = `https://api.themoviedb.org/3/search/movie?api_key=bc5a79b54a86f210558aa28465ab7430&language=en-US&query=${keyword}`;

        axios.get(endPoint)
            .then(response => {
                const moviesArray = response.data.results;

                if (moviesArray.length === 0) {
                    swAlert(<h2>No se hallaron resultados</h2>)
                }

                setMovieResults(moviesArray)
            })
            .catch(error => {
                console.error(`Error: ${error}`)
            })
    }, [keyword])

    return (
        <>
            <h2>Buscaste: <em>{keyword}</em></h2>

            {movieResults.length === 0 && <h3>No se hallaron resultados.</h3>}

            <div className="row">
                {
                    movieResults.map((oneMovie, idx) => {
                        return (
                            <div className="col-4" key={idx}>
                                <div className="card my-4">
                                    <img src={`http://image.tmdb.org/t/p/w500/${oneMovie.poster_path}`} className="card-img-top" alt="..." />
                                    <div className="card-body">
                                        <h5 className="card-title">{oneMovie.title}</h5>
                                        <Link to={`/detalle?movieID=${oneMovie.id}`} className="btn btn-primary">Movie detail</Link>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
};

export default Resultados