import React, { useEffect, useState } from "react";
import Spinner from './components/Spinner';
function App() {
  const [datos, setDatos] = useState({});
  const [date, setDate] = useState(new Date());
  const [cargando, setCargando] = useState(true);
  const consultarAPI = async () => {
    const api = await fetch("https://covid19.mathdro.id/api/countries/COL/confirmed");
    const resultado = await api.json();
    setDatos(resultado[0]);
    console.log("consultando...");
    
  };

  useEffect(() => {
    consultarAPI();
    setTimeout(() => {
      setCargando(false);
    }, 2000);
    setInterval( () => tick(), 1000 );
    setInterval( () => consultarAPI(), 60000 );
  }, []);

  function tick() {
    setDate(new Date());
   }
  
  return (
    <div className="container">
        <nav className="navbar navbar-light bg-light">
          <a className="navbar-brand" href="#">
            Covid 19 - Colombia
          </a>
        </nav>
        
          {cargando?<Spinner />:
          <div className="d-flex flex-column text-center mt-5">
          <h1 className="display-3">Colombia</h1>
          <h1 className="mt-4"><i className="fa fa-plus-square"></i> Confirmados</h1>
  <h3>{datos.confirmed}</h3>
  <h1 className="mt-4"><i className="fa fa-history"></i> Actulizacion</h1>
  <h3>{new Date(datos.lastUpdate).toLocaleString()}</h3>
  <h5 className="mt-4">Fecha actual</h5>
  <p>{date.toLocaleString()}</p>
        </div>}
    </div>
  );
}

export default App;
