import { useEffect, useState } from "react";
import styled from "@emotion/styled";

import { Monedas } from "../Data/Monedas";
import Error from "./Error";

import useSelectMonedas from "../Hooks/useSelectMonedas";

const InputSubmit = styled.input`
  background-color: #9497ff;
  border: none;
  width: 100%;
  padding: 10px;
  color: #fff;
  font-weigth: 700;
  text-transform: uppercase;
  font-size: 20px;
  border-radius: 5px;
  transition: background-color 0.3s case;
  margin-top: 30px;

  &:hover {
    background-color: #7a7dfe;
    cursor: pointer;
  }
`;
const Formulario = ({ setMonedas }) => {
  const [Criptos, setCriptos] = useState([]);
  const [Errores, setErrores] = useState(false);

  const [Moneda, SelectMonedas] = useSelectMonedas("Elige tu Moneda", Monedas);
  const [CriptoMoneda, SelectCriptoMoneda] = useSelectMonedas(
    "Elige tu CriptoMoneda",
    Criptos
  );

  useEffect(() => {
    const ConsultarAPI = async () => {
      const url =
        "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD";
      const Respuesta = await fetch(url);
      const Resultado = await Respuesta.json();

      const ArrayCripto = Resultado.Data.map((Cripto) => {
        const Objeto = {
          Id: Cripto.CoinInfo.Name,
          Nombre: Cripto.CoinInfo.FullName,
        };
        return Objeto;
      });

      setCriptos(ArrayCripto);
    };
    ConsultarAPI();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if ([Moneda, CriptoMoneda].includes("")) {
      setErrores(true);

      return;
    }

    setErrores(false);
    setMonedas({ Moneda, CriptoMoneda });
  };
  return (
    <>
      {Errores && <Error>Todos los campos son obligatorios</Error>}
      <form onSubmit={handleSubmit}>
        <SelectMonedas></SelectMonedas>
        {Moneda}
        <SelectCriptoMoneda></SelectCriptoMoneda>
        <InputSubmit type="submit" value="Cotizar"></InputSubmit>
      </form>
    </>
  );
};

export default Formulario;
