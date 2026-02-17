import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { travels } from "../data/selects";
import "../App.css";

import logo from "../assets/logo.png";
import Button from "../components/button/Button";

function Home() {
  const navigate = useNavigate();
  const [travel, setTravel] = useState("");

  const handleSelect = () => {
    if (!travel) {
      alert("Escolha uma viagem primeiro!");
      return;
    }
    navigate(`/card/${travel}`);
  };

  return (
    <div className="page">
      <img src={logo} className="logo" alt="Sharon Turismo logo" />
      <div className="text">
        <p>Bem-vindo à Sharon Turismo</p>
        <p>Selecione um dos nossos destinos abaixo...</p>
      </div>
      <div className="foot">
        <select
          className="select"
          value={travel}
          onChange={(e) => setTravel(e.target.value)}
        >
          <option value="" disabled>
            Escolha a viagem...
          </option>
          {travels.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </select>
        <Button text="Selecionar" onClick={handleSelect} />
      </div>
    </div>
  );
}

export default Home;
