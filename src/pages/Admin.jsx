import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

import { formatBRL, maskBRL } from "../utils/masks";
import { calculateAge, getThermasPriceByAge } from "../utils/calc";
import Input from "../components/input/Input";
import Button from "../components/button/Button";

function Admin() {
  const [authorized, setAuthorized] = useState(false);
  const [pass, setPass] = useState("");
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const encoded = params.get("data");

  let decoded = null;

  try {
    if (encoded) {
      decoded = JSON.parse(atob(decodeURIComponent(encoded)));
    }
  } catch (err) {
    console.error("Erro ao decodificar:", err);
  }

  const calculatePrice = () => {
    if (!decoded) return "";

    const people = (decoded.companions?.length || 0) + 1;

    if (decoded.id === "laranjais") {
      let total = 0;

      const clientAge = calculateAge(decoded.client.birth);
      total += getThermasPriceByAge(clientAge);

      decoded.companions?.forEach((c) => {
        const age = calculateAge(c.birth);
        total += getThermasPriceByAge(age);
      });

      return total;
    }

    if (decoded.id === "jordao") {
      let base;

      if (people === 4) base = 1280;
      else if (people === 3) base = 1360;
      else base = 1480;

      return base * people;
    }

    return decoded.price * people;
  };

  const initialPrice = decoded ? calculatePrice() : "";

  const [price, setPrice] = useState(formatBRL(initialPrice));
  const [payment, setPayment] = useState("");

  const checkPassword = () => {
    if (pass === "1234") {
      setAuthorized(true);
    } else {
      alert("Senha incorreta");
    }
  };

  if (!authorized) {
    return (
      <div>
        <Input
          type="password"
          placeholder="Digite a senha..."
          value={pass}
          onChange={(v) => setPass(v)}
        />
        <button onClick={checkPassword}>Entrar</button>
      </div>
    );
  }

  return (
    <div className="page">
      <h1>Área do contrato</h1>
      <p>Viagem: {decoded.travel}</p>
      <p>Data: {decoded.data}</p>
      <p>Cliente: {decoded.client.name}</p>
      <p>CPF: {decoded.client.cpf}</p>
      <p>Data de Nascimento: {decoded.client.birth}</p>
      <p>Telefone: {decoded.client.phone}</p>
      <p>
        {decoded.client.address.street}, {decoded.client.address.number}
      </p>
      {decoded.client.address.comp && (
        <p>Comp: {decoded.client.address.comp}</p>
      )}
      <p>
        {decoded.client.address.neighborhood} - {decoded.client.address.city}/
        {decoded.client.address.state}
      </p>
      {decoded.companions.map((c, i) => (
        <p key={i}>
          {decoded.companions.length === 1
            ? "Acompanhante"
            : `Acompanhante ${i + 1}`}
          <br />
          Nome: {c.name}
          <br />
          CPF: {c.cpf}
          <br />
          Data de Nascimento: {c.birth}
        </p>
      ))}
      <label>Valor da viagem</label>
      <Input
        required
        value={price}
        inputMode="numeric"
        onChange={(v) => setPrice(maskBRL(v))}
      />
      <label>Forma de pagamento</label>
      <Input required value={payment} onChange={(v) => setPayment(v)} />
      <Button
        text="Gerar Contrato"
        onClick={() =>
          navigate("/contract", {
            state: {
              ...decoded,
              price,
              payment,
            },
          })
        }
      />
    </div>
  );
}

export default Admin;
