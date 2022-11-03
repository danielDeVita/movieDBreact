import { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios'
import swAlert from '@sweetalert/with-react';



const Listado = (props) => {
    let token = sessionStorage.getItem("token");

    const [movieList, setMovieList] = useState([]);

    useEffect(() => {

        const endPoint = "https://api.themoviedb.org/3/discover/movie?api_key=bc5a79b54a86f210558aa28465ab7430&language=en-US"
        axios.get(endPoint)
            .then(response => {
                const apiData = response.data;
                setMovieList(apiData.results)
            })
            .catch(error => {
                swAlert(<h2>Problemas en la base de datos</h2>)
            })
    }, [setMovieList]);

    return (
        <>
            {!token && <Redirect to="/" />}

            <div className="row">
                {
                    movieList.map((oneMovie, idx) => {
                        return (
                            <div className="col-3" key={idx}>
                                <div className="card my-4">
                                    <img src={`http://image.tmdb.org/t/p/w500/${oneMovie.poster_path}`} className="card-img-top" alt="..." />
                                    <button
                                        className="favourite-btn"
                                        onClick={props.addOrRemoveFromFavs}
                                        data-movie-id={oneMovie.id}
                                    > 🖤
                                    </button>
                                    <div className="card-body">
                                        <h5 className="card-title">{oneMovie.title.substring(0, 30)}...</h5>
                                        <p className="card-text">{oneMovie.overview.substring(0, 100)}...</p>
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

export default Listado;