import React, {useState} from 'react';
import Error from './Error';

const Formulario = ({setBusqueda}) => {

    const [palabra, setPalabra] = useState('')
    const [error, setError] = useState(false)
    const buscarImagenes = (e)=>{
        e.preventDefault()

        if(palabra.trim()===""){
            setError(true)
            return;
        }
        setError(false)
        setBusqueda(palabra)
    }

    return ( 
        <form
            onSubmit={buscarImagenes}
        >
            <div className="row">
                <div className="form-group col-md-8">
                    <input 
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Busca una imagen, ejemplo: fútbol o café"
                    onChange={e=> setPalabra(e.target.value)}
                    />
                </div>
                <div>
                    <input 
                    type="submit"
                    className="btn btn-lg btn-danger btn-block"
                    />
                </div>
            </div>

                {error? <Error mensaje="Agrega un término de búsqueda"/>:null}
        </form>
     );
}
 
export default Formulario;