import React, { useEffect, useState ,useInterval} from "react";

function App() {
  const [datos, setDatos] = useState({});
  const [date, setDate] = useState(new Date());
  const consultarAPI = async () => {
    const api = await fetch("https://covid19.mathdro.id/api/countries/COL/confirmed");
    const resultado = await api.json();
    setDatos(resultado[0]);
  };

  useEffect(() => {
    consultarAPI();
    setInterval( () => tick(), 1000 );
  }, []);

  function tick() {
    setDate(new Date());
   }
  
  return (
    <div className="container">
      <div className="App">
        <nav className="navbar navbar-light bg-light">
          <a className="navbar-brand" href="#">
            Covid 19 - Colombia
          </a>
        </nav>
        <div className="d-flex flex-column text-center mt-5">
          <h1 className="display-3">Colombia</h1>
          <h1 className="mt-4">Confirmados</h1>
  <h3>{datos.confirmed}</h3>
  <h1 className="mt-4">Fecha de actulizacion</h1>
  <h3>{new Date(datos.lastUpdate).toLocaleString()}</h3>
  <h5 className="mt-4">Fecha actual</h5>
  <p>{date.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
