import { useEffect, useState } from "react";
import styled from "@emotion/styled";

import Formulario from "./Components/Formulario";
import Resultado from "./Components/Resultado";
import Spinner from "./Components/Spinner";

import ImagenCriptos from "./img/imagen-criptos.png";

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  width: 90%;
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;
const Imagen = styled.img`
  max-width: 400px;
  width: 80%;
  margin: 100px auto 0 auto;
  display: block;
`;
const Heading = styled.h1`
  font-family: "Lato", sans-serif;
  color: #fff;
  text-align: center;
  font-weight: 700;
  margin-top: 80px;
  margin-bottom: 50px;
  font-size: 34px;

  &::after {
    content: "";
    width: 100px;
    height: 6px;
    background-color: #66a2fe;
    display: block;
    margin: 10px auto 0 auto;
  }
`;

function App() {
  const [Monedas, setMonedas] = useState({});
  const [Resultados, setResultado] = useState({});
  const [Cargando, setCargando] = useState(false);

  useEffect(() => {
    if (Object.keys(Monedas).length > 0) {
      const CotizarCripto = async () => {
        setCargando(true);
        setResultado({});

        const { Moneda, CriptoMoneda } = Monedas;
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${CriptoMoneda}&tsyms=${Moneda}`;

        const Respuesta = await fetch(url);
        const Resultados = await Respuesta.json();

        setResultado(Resultados.DISPLAY[CriptoMoneda][Moneda]);

        setCargando(false);
      };

      CotizarCripto();
    }
  }, [Monedas]);
  return (
    <Contenedor>
      <Imagen src={ImagenCriptos} alt="Imagenes criptomonedas"></Imagen>
      <div>
        <Heading>Cotiza Criptomonedas al Instante</Heading>
        <Formulario setMonedas={setMonedas}></Formulario>

        {Cargando && <Spinner></Spinner>}
        {Resultados.PRICE && <Resultado Resultados={Resultados} />}
      </div>
    </Contenedor>
  );
}

export default App;
