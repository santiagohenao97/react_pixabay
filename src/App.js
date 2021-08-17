import React, { useState, useEffect } from "react";
import Formulario from "./components/Formulario";
import ListadoImagenes from "./components/ListadoImagenes";

function App() {
  const [busqueda, setBusqueda] = useState("");
  const [imagenes, setImagenes] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);

  useEffect(() => {
    if (busqueda === "") return;

    const consultarAPI = async () => {
      const imagenesPorPagina = 30;
      const key = "22959021-07ff361f37c0750cceb1bfa51";
      const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}&page${paginaActual}`;

      const respuesta = await fetch(url);
      const resultado = await respuesta.json();

      setImagenes(resultado.hits);
      const calculartotalPaginas = Math.ceil(
        resultado.totalHits / imagenesPorPagina
      );
      setTotalPaginas(calculartotalPaginas);

      // Mover la pantalla hacia arriba
      const jumbotron = document.querySelector('.jumbotron');
      jumbotron.scrollIntoView({ behavior: 'smooth' })
    };

    consultarAPI();
  }, [busqueda, paginaActual]);

  const paginaAnterior = ()=>{
    const nuevaPaginaActual = paginaActual-1;
    if(nuevaPaginaActual ===0) return;
    setPaginaActual(nuevaPaginaActual);
  }

  const paginaSiguiente = ()=>{
    const nuevaPaginaActual = paginaActual+1;
    if(nuevaPaginaActual > totalPaginas) return;
    setPaginaActual(nuevaPaginaActual);
  }

  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">Buscador de imágenes</p>
        <Formulario setBusqueda={setBusqueda} />
      </div>
      <div className="row justify-content-center">
        <ListadoImagenes imagenes={imagenes} />

        { (paginaActual === 1) ? null : (
          <button type="button" className="btn btn-info mr-1" onClick={paginaAnterior}>
          Anterior &laquo;
          </button>
        )}

        { (paginaActual === totalPaginas) ? null : (
          <button type="button" className="btn btn-info" onClick={paginaSiguiente}>
          Siguiente &raquo;
          </button>
        )}

        
        
      </div>
    </div>
  );
}

export default App;
