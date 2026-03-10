import { useLocation } from "react-router-dom";
import html2pdf from "html2pdf.js";
import "./Contract.css";

import { travels } from "../data/travels";
import img from "../assets/contract-logo.png";
import Button from "../components/button/Button";

function Contract() {
  const location = useLocation();
  const data = location.state;
  const travelData = travels.find((t) => t.id === data.id);

  if (!data) {
    return <p>Nenhum dado recebido.</p>;
  }

  const { client, companions, travel, price, payment } = data;

  const name = client.name;
  const cpf = client.cpf;
  const birthdate = client.birth;
  const telefone = client.phone;

  const street = client.address.street;
  const number = client.address.number;
  const complement = client.address.comp;
  const neighborhood = client.address.neighborhood;
  const city = client.address.city;
  const uf = client.address.state;
  const zip = client.address.zip;

  const inclusions = travelData?.list || [];
  const travelName = travelData?.travel;
  const departureDate = travelData?.departure;
  const returnDate = travelData?.return;
  const companionsList = companions || [];

  const today = new Date();
  const day = today.getDate();
  const month = today.toLocaleString("pt-BR", { month: "long" });
  const year = today.getFullYear();

  const handleSendContract = async () => {
    const element = document.getElementById("contract-content");

    const pdfBlob = await html2pdf().from(element).outputPdf("blob");

    const formData = new FormData();
    formData.append("file", pdfBlob, `contrato-${name}.pdf`);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    const message = `Olá ${name}, segue seu contrato da viagem para ${travelName}: ${data.link}`;

    const phone = telefone.replace(/\D/g, "");

    const url = `https://wa.me/55${phone}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank");
  };

  return (
    <div className="contract">
      <div className="contract-body">
        <div id="contract-content" className="contract-body">
          <img
            className="contract-img mt-10"
            src={img}
            alt="logo Sharon Turismo"
          />
          <p className="contract-title mt-10">CONTRATO DE VIAGEM</p>
          <p className="contract-paragraph mt-10">
            O presente contrato de prestação de serviços de turismo,
            representado neste ato pela Sharon Agência de Viagens e Turismo,
            CNPJ: 43.525.498/0001-19, representada por Marcia Aparecida Batista
            Luchini sito à Avenida Nove de Julho nº 794, na cidade de Assis/SP,
            celular (18) 99691-1524, a seguir denominada CONTRATADA, e de outro
            lado, na qualidade de CONTRATANTE, e assim, a seguir simplesmente
            denominado, comparece a pessoa de
          </p>
          <div className="mt-10">
            <p className="contract-text">
              CONTRATANTE: {name}, portador(a) do CPF: {cpf}, nascido(a):{" "}
              {birthdate}, com endereço: {street}, {number}{" "}
              {complement && `, ${complement}`}, {neighborhood}, CEP: {zip},{" "}
              {city}/ {uf}, Telefone: {telefone}.
            </p>

            {companions.length > 0 &&
              companions.map((c, index) => (
                <p key={index} className="contract-text">
                  ACOMPANHANTE: {c.name}, portador(a) do CPF: {c.cpf},
                  nascido(a): {c.birth}.
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
          <p className="contract-text mt-10">Destino da viagem: {travel}.</p>
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

          <p className="contract-text-center mt-10">
            CONDIÇÕES DE CANCELAMENTO
          </p>

          <div className="mt-10">
            <p className="contract-paragraph">
              A viagem será cancelada por parte da CONTRATADA, caso não atinja o
              número de passageiros correspondente a (mínimo de 25 pessoas), a
              mesma comunicará a todos os clientes com antecedência de 15
              (quinze dias), os quais serão reembolsados.
            </p>
            <p className="contract-paragraph">
              Caso o CONTRATANTE deseje cancelar a viagem, deverá comunicar a
              CONTRATADA com antecedência mínima de 30 (trinta) dias antes da
              data prevista para a viagem. Neste caso, o CONTRATANTE poderá
              transferir a viagem para outra pessoa ou optar por deixar o valor
              integral como crédito para uma próxima viagem. Caso o cancelamento
              seja realizado com menos de 15 (quinze) dias de antecedência, será
              cobrada uma taxa de 30% sobre o valor total da viagem, ficando o
              CONTRATANTE com um crédito de 70% do valor pago para utilização em
              uma próxima viagem.
            </p>
            <p className="contract-paragraph">
              A descrição da mesma será feita neste contrato, no campo abaixo:
            </p>
            <p className="contract-paragraph">
              Assim por estarem justos e contratados, assinam o presente
              contrato de viagem em duas vias de igual teor para um só fim.
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
      </div>

      <div className="contract-button">
        <Button onClick={handleSendContract} text="Enviar Contrato" />
      </div>
    </div>
  );
}

export default Contract;
