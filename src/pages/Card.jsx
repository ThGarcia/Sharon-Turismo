import { useNavigate, useParams } from "react-router-dom";
import { travels } from "../data/travels";
import "../App.css";

import Button from "../components/button/Button";

function Card() {
  const { id } = useParams();
  const travel = travels.find((t) => t.id === id);
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
  };

  const handleSelect = () => {
    navigate(`/form/${travel.id}`);
  };

  const mensagem = encodeURIComponent(
    `Estive olhando a viagem para ${travel.travel} e gostaria de mais informações.`,
  );

  return (
    <div className="page">
      <p className="card-title">{travel.travel}</p>
      <img src={travel.img} alt={travel.travel} />
      <p className="card-subtitle">{travel.subtitle}</p>
      <p className="card-title">SHARON TURISMO</p>
      <div className="card-text">
        <p>{travel.text}</p>
        <p>Saída: {travel.departure}</p>
        <p>Retorno: {travel.return}</p>
      </div>
      <p className="card-title" id="card-title-list">
        INCLUSO NA VIAGEM:
      </p>
      <div className="card-list">
        {travel.list.map((item, i) => (
          <p key={i}>📌 {item}</p>
        ))}
      </div>
      {travel.obs && (
        <div className="card-obs">
          <p>Obs.:</p>
          <p>{travel.obs}</p>
        </div>
      )}
      <p>Entre em contato para mais informações:</p>
      <div className="contatos">
        <a href="tel:+5548984972129">
          <i className="ri-phone-fill"></i> Telefone
        </a>
        <a href={`whatsapp://send?phone=5548984972129&text=${mensagem}`}>
          <i className="ri-whatsapp-line"></i> WhatsApp
        </a>
      </div>
      <p>Consulte-nos sobre mais formas de pagamentos!</p>
      <div className="card-buttons">
        <Button text="Voltar" onClick={handleBack} />
        <Button text="Quero!" onClick={handleSelect} />
      </div>
    </div>
  );
}

export default Card;
