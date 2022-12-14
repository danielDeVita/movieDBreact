import { useHistory } from 'react-router-dom';
import swAlert from '@sweetalert/with-react';

const Buscador = () => {
    const history = useHistory()

    const submitHandler = e => {
        e.preventDefault()
        const keyword = e.currentTarget.keyword.value;

        if (keyword.length === 0) {
            swAlert(<h2>Escribe una palabra clave</h2>)
        } else if (keyword.length < 4) {
            swAlert(<h2>Escribe al menos 4 caracteres</h2>)
        } else {
            e.currentTarget.keyword.value = "";
            history.push(`/resultados?keyword=${keyword}`)
        }
    };

    return (
        <form className="d-flex align-items-center" onSubmit={submitHandler}>
            <label className="form-label mb-0 mx-2">
                <input className="form-control" type="text" name="keyword" placeholder="Buscar..." />
            </label>
            <button className="btn btn-success" type="submit">Buscar</button>
        </form>
    )
};

export default Buscador;