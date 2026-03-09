import { useState } from "react";
import "./Contract.css";

import img from "../assets/contract-logo.png";
import Button from "../components/button/Button";

const data = {
  name: "Thiago Rafael Garcia",
  cpf: "043.046.049-02",
  birthdate: "28/02/1985",
  telefone: "(48) 98497-2129",

  street: "Rua Gonçalves Ledo",
  number: "N/A",
  neighborhood: "Vila Adileta",
  zip: "19814-260",
  city: "Assis",
  uf: "SP",

  companion: {
    name: "Camila Batista Luchini",
    cpf: "310.046.711-75",
    birth: "29/08/1983",
  },

  travel: "Cidades Históricas/MG",
  departureDate: "14/04/2026",
  returnDate: "21/04/2026",
  price: "1.200,00",
  payment: "Entrada R$ 600,00 e o restante até a dta da viagem",

  inclusions: [
    "Transporte em ônibus executivo de Turismo.",
    "2 diárias de Hotel com café da manhã.",
    "Ingresso das Cataratas do Iguaçu lado brasileiro",
    "Passeio no marco das 3 fronteiras (sem ingresso)",
    "Tour de compras no Paraguai.",
    "Tour na Argentina ",
    "kit lanche na ida",
    "Guia acompanhante na viagem e guia local",
    "Parque das aves (sem ingresso) ",
  ],

  day: "10",
  month: "abril",
  year: "2026",
};

function Contract() {
  const {
    name,
    cpf,
    birthdate,
    telefone,
    street,
    number,
    neighborhood,
    zip,
    city,
    uf,
    companion,
    travel,
    departureDate,
    returnDate,
    price,
    payment,
    inclusions,
    day,
    month,
    year,
  } = data;

  const [companions, setCompanions] = useState([companion]);

  return (
    <div className="contract">
      <div className="contract-body">
        <img
          className="contract-img mt-10"
          src={img}
          alt="logo Sharon Turismo"
        />
        <p className="contract-title mt-10">CONTRATO DE VIAGEM</p>
        <p className="contract-paragraph mt-10">
          O presente contrato de prestação de serviços de turismo, representado
          neste ato pela Sharon Agência de Viagens e Turismo, CNPJ:
          43.525.498/0001-19, representada por Marcia Aparecida Batista Luchini
          sito à Avenida Nove de Julho nº 794, na cidade de Assis/SP, celular
          (18) 99691-1524, a seguir denominada CONTRATADA, e de outro lado, na
          qualidade de CONTRATANTE, e assim, a seguir simplesmente denominado,
          comparece a pessoa de
        </p>
        <div className="mt-10">
          <p className="contract-text">
            CONTRATANTE: {name}, portador(a) do CPF: {cpf}, nascido(a):{" "}
            {birthdate}, com endereço: {street}, {number}, {neighborhood}, CEP:{" "}
            {zip}, {city}/ {uf}, Telefone: {telefone}.
          </p>
          {companions.length > 0 &&
            companions.map((c, index) => (
              <p key={index} className="contract-text">
                ACOMPANHANTE: {c.name}, portador(a) do CPF: {c.cpf}, nascido(a):{" "}
                {c.birth}.
              </p>
            ))}
        </div>
        <div className="mt-10">
          <p className="contract-text">
            A CONTRATADA receberá pelo serviço prestado o valor total de R${" "}
            {price}.
          </p>
          <p className="contract-text">Forma de pagamento: {payment}.</p>
        </div>
        <p className="contract-text mt-10">Destino da viagem a: {travel}.</p>
        <div className="mt-10">
          <p className="contract-text">Incluso:</p>
          <ul className="contract-list">
            {inclusions.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        <p className="contract-text-date mt-10">
          Data da saída: {departureDate}, com data de retorno: {returnDate}.
        </p>
        <p className="contract-text-center mt-10">CONDIÇÕES DE CANCELAMENTO</p>
        <div className="mt-10">
          <p className="contract-paragraph">
            A viagem será cancelada por parte da CONTRATADA, caso não atinja o
            número de passageiros correspondente a (mínimo de 25 pessoas), a
            mesma comunicará a todos os clientes com antecedência de 15 (quinze
            dias), os quais serão reembolsados.
          </p>
          <p className="contract-paragraph">
            Caso o CONTRATANTE deseje cancelar a viagem, deverá comunicar a
            CONTRATADA com antecedência mínima de 30 (trinta) dias antes da data
            prevista para a viagem. Neste caso, o CONTRATANTE poderá transferir
            a viagem para outra pessoa ou optar por deixar o valor integral como
            crédito para uma próxima viagem. Caso o cancelamento seja realizado
            com menos de 15 (quinze) dias de antecedência, será cobrada uma taxa
            de 30% sobre o valor total da viagem, ficando o CONTRATANTE com um
            crédito de 70% do valor pago para utilização em uma próxima viagem.
          </p>
          <p className="contract-paragraph">
            A descrição da mesma será feita neste contrato, no campo abaixo:
          </p>
          <p className="contract-paragraph">
            Assim por estarem justos e contratados, assinam o presente contrato
            de viagem em duas vias de igual teor para um só fim.
          </p>
        </div>
        <p className="contract-text-center mt-10">
          Assis, {day} de {month} de {year}
        </p>
      </div>
      <div className="contract-signature mt-10">
        <p className="contract-signature-text">CONTRATANTE</p>
        <p className="contract-signature-text">SHARON TURISMO</p>
      </div>
      <div className="contract-button">
        <Button onClick={handleSendContract} text="Enviar" />
      </div>
    </div>
  );
}

export default Contract;
