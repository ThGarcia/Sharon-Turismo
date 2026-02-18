import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { travels } from "../data/travels";
import { states } from "../data/selects";
import "../App.css";

import {
  validateFullName,
  validateCPF,
  validatePhone,
  validateCEP,
  normalizeHouseNumber,
  fetchAddressByCEP,
} from "../utils/validator";
import {
  maskCPF,
  maskPhone,
  maskCEP,
  capitalizeName,
  formatDate,
} from "../utils/masks";

import Input from "../components/input/Input";
import Modal from "../components/modal/Modal";
import ConfirmModal from "../components/modal/ConfirmModal";
import Button from "../components/button/Button";

function Form() {
  const { id } = useParams();
  const navigate = useNavigate();
  const travel = travels.find((t) => t.id === id);
  if (!travel) {
    navigate("/error");
    return null;
  }

  const [clientName, setClientName] = useState("");
  const [clientCpf, setClientCpf] = useState("");
  const [clientBirth, setClientBirth] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientCep, setClientCep] = useState("");
  const [clientStreet, setClientStreet] = useState("");
  const [clientNumber, setClientNumber] = useState("");
  const [clientNeighborhood, setClientNeighborhood] = useState("");
  const [clientCity, setClientCity] = useState("");
  const [ClientUf, setClientUf] = useState("");
  const [clientComp, setClientComp] = useState("");
  const [companions, setCompanions] = useState([]);
  const [preview, setPreview] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [showConfirmChange, setShowConfirmChange] = useState(false);
  const [companionToDelete, setCompanionToDelete] = useState(null);
  const people = companions.length + 1;

  const dataMessage = (data) => {
    let message =
      `Viagem: ${data.travel}\n` +
      `Data: ${data.data}\n` +
      `Viajantes: ${data.people}\n\n` +
      `Cliente:\n` +
      `Nome: ${data.client.name}\n` +
      `CPF: ${data.client.cpf}\n` +
      `Data de Nascimento: ${formatDate(data.client.birth)}\n` +
      `Telefone: ${data.client.phone}\n\n` +
      `Endereço:\n` +
      `${data.client.address.street}, ${data.client.address.number}\n` +
      (data.client.address.comp ? `${data.client.address.comp}\n` : "") +
      `${data.client.address.neighborhood} - ${data.client.address.city}/${data.client.address.state}\n` +
      `${data.client.address.zip}\n`;
    if (data.companions.length > 0) {
      message += "\n";
      data.companions.forEach((c, i) => {
        const label =
          data.companions.length === 1
            ? "Acompanhante"
            : `Acompanhante ${i + 1}`;

        message += `${label}:\nNome: ${c.name}\nCPF: ${c.cpf}\nData de Nascimento: ${c.birth}\n\n`;
      });
    }
    return message;
  };

  const filledData =
    clientName ||
    clientCpf ||
    clientBirth ||
    clientPhone ||
    clientCep ||
    clientStreet ||
    clientNumber ||
    clientNeighborhood ||
    clientCity ||
    ClientUf ||
    clientComp ||
    companions.some((c) => c.name || c.cpf || c.birth);

  const handleDelCompanion = (index) => {
    setCompanions(companions.filter((_, i) => i !== index));
  };

  const handleAddCompanion = () => {
    setCompanions([...companions, { name: "", cpf: "", birth: "" }]);
  };

  const handleCompanionChange = (index, field, value) => {
    const updated = [...companions];
    updated[index][field] = value;
    setCompanions(updated);
  };

  const handleHome = () => {
    if (!filledData) {
      navigate("/");
      return;
    }
    setShowConfirmChange(true);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!validateFullName(clientName)) {
      alert("Digite nome e sobrenome válidos.");
      return;
    }
    if (!validateCPF(clientCpf)) {
      alert("CPF inválido.");
      return;
    }
    if (!validatePhone(clientPhone)) {
      alert("Telefone inválido.");
      return;
    }
    if (clientCep && !validateCEP(clientCep)) {
      alert("CEP inválido.");
      return;
    }

    if (
      !clientName ||
      !clientCpf ||
      !clientBirth ||
      !clientPhone ||
      !clientStreet ||
      !clientNeighborhood ||
      !clientCity ||
      !ClientUf
    ) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }
    for (const companion of companions) {
      if (!companion.name || !companion.cpf || !companion.birth) {
        alert("Preencha todos os dados dos acompanhantes.");
        return;
      }
    }

    const data = {
      travel: travel.travel,
      data: travel.date,
      people,
      client: {
        name: clientName,
        cpf: clientCpf,
        birth: clientBirth,
        phone: clientPhone,
        address: {
          zip: clientCep,
          street: clientStreet,
          number: normalizeHouseNumber(clientNumber),
          neighborhood: clientNeighborhood,
          city: clientCity,
          state: ClientUf,
          comp: clientComp,
        },
      },
      companions,
    };
    setModalData(data);
    setShowModal(true);
    {
      console.log("Dados para envio:", data);
    }
  };

  const handleConfirm = () => {
    sendToWhatsapp(modalData);
    setShowModal(false);
    navigate("/");
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  const sendToWhatsapp = (data) => {
    const message = dataMessage(data);
    const url = `https://wa.me/5548984972129?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  const FormIsValid =
    validateFullName(clientName) &&
    validateCPF(clientCpf) &&
    clientBirth &&
    validatePhone(clientPhone) &&
    (!clientCep || validateCEP(clientCep)) &&
    clientStreet &&
    clientNeighborhood &&
    clientCity &&
    ClientUf &&
    companions.every(
      (c) => validateFullName(c.name) && validateCPF(c.cpf) && c.birth,
    );

  return (
    <div className="page">
      <form className="form" onSubmit={onSubmit}>
        <div className="form-header">
          <p className="form-title">Viagem Selecionada:</p>
          <p className="form-title">
            {travel.travel} - {travel.date}
          </p>
        </div>
        <div className="form-client">
          <p className="form-title">Cliente:</p>
          <Input
            label="Nome Completo"
            value={clientName}
            placeholder="Nome completo..."
            required
            validator={validateFullName}
            errorMessage="Digite nome e sobrenome válidos"
            onChange={(v) => setClientName(v)}
            transformDisplay={capitalizeName}
          />
          <Input
            label="CPF"
            value={clientCpf}
            placeholder="xxx.xxx.xxx-xx"
            required
            validator={validateCPF}
            errorMessage="CPF inválido"
            onChange={(v) => setClientCpf(maskCPF(v))}
          />
          <Input
            label="Data de Nascimento"
            type="date"
            value={clientBirth}
            required
            errorMessage="Informe a data de nascimento"
            onChange={(v) => setClientBirth(v)}
          />
          <Input
            label="Telefone para contato"
            value={clientPhone}
            placeholder="(xx) xxxxx-xxxx"
            required
            validator={validatePhone}
            errorMessage="Telefone inválido"
            onChange={(v) => setClientPhone(maskPhone(v))}
          />
        </div>

        <div className="form-address">
          <p className="form-title">Endereço:</p>
          <Input
            label="CEP"
            value={clientCep}
            placeholder="xxxxx-xxx"
            validator={validateCEP}
            errorMessage="CEP inválido"
            onChange={(v) => setClientCep(maskCEP(v))}
            onBlur={async () => {
              if (!clientCep) return;
              if (!validateCEP(clientCep)) return;
              const addr = await fetchAddressByCEP(clientCep);
              if (!addr) return;
              setClientStreet(addr.street);
              setClientNeighborhood(addr.neighborhood);
              setClientCity(addr.city);
              setClientUf(addr.state);
            }}
          />
          <Input
            label="Rua/Av"
            value={clientStreet}
            required
            errorMessage="Informe a rua"
            onChange={(v) => setClientStreet(v)}
            transformDisplay={capitalizeName}
          />
          <Input
            label="Número"
            value={clientNumber}
            onChange={(v) => setClientNumber(v)}
          />
          <Input
            label="Bairro"
            value={clientNeighborhood}
            required
            errorMessage="Informe o bairro"
            onChange={(v) => setClientNeighborhood(v)}
            transformDisplay={capitalizeName}
          />
          <Input
            label="Cidade"
            value={clientCity}
            required
            errorMessage="Informe a cidade"
            onChange={(v) => setClientCity(v)}
            transformDisplay={capitalizeName}
          />
          <div>
            <label className="form-label">Estado:</label>
            <select
              className="select"
              value={ClientUf}
              onChange={(e) => setClientUf(e.target.value)}
            >
              <option value="" disabled>
                UF
              </option>
              {states.map((uf) => (
                <option key={uf} value={uf}>
                  {uf}
                </option>
              ))}
            </select>
          </div>
          <Input
            label="Complemento"
            value={clientComp}
            onChange={(v) => setClientComp(v)}
            transformDisplay={capitalizeName}
          />
        </div>

        {companions.map((c, index) => (
          <div className="form-companion" key={index}>
            <p className="form-title">
              {companions.length === 1
                ? "Acompanhante"
                : `Acompanhante ${index + 1}`}
            </p>
            <Input
              label="Nome Completo"
              value={c.name}
              required
              validator={validateFullName}
              errorMessage="Nome inválido"
              onChange={(v) => handleCompanionChange(index, "name", v)}
              transformDisplay={capitalizeName}
            />
            <Input
              label="CPF"
              value={c.cpf}
              required
              validator={validateCPF}
              errorMessage="CPF inválido"
              onChange={(v) => handleCompanionChange(index, "cpf", maskCPF(v))}
            />
            <Input
              label="Data de Nascimento"
              type="date"
              value={c.birth}
              required
              errorMessage="Informe a data"
              onChange={(v) => handleCompanionChange(index, "birth", v)}
            />

            <Button
              text="Excluir acompanhante"
              variant="alert"
              onClick={() => {
                const c = companions[index];
                const hasData = c.name || c.cpf || c.birth;
                if (!hasData) {
                  handleDelCompanion(index);
                  return;
                }
                setCompanionToDelete(index);
              }}
            />
          </div>
        ))}
        <div className="form-button">
          <Button text="Adicionar Acompanhante" onClick={handleAddCompanion} />
          <Button text="Escolher outra viagem!" onClick={handleHome} />
          <Button text="Enviar Pedido" type="submit" disabled={!FormIsValid} />
        </div>
      </form>

      {showModal && (
        <Modal
          data={modalData}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}

      <ConfirmModal
        open={companionToDelete !== null}
        title="Excluir acompanhante?"
        message="Os dados deste acompanhante serão removidos permanentemente."
        confirmText="Excluir"
        cancelText="Cancelar"
        onConfirm={() => {
          handleDelCompanion(companionToDelete);
          setCompanionToDelete(null);
        }}
        onCancel={() => setCompanionToDelete(null)}
      />
      <ConfirmModal
        open={showConfirmChange}
        title="Escolher outra viagem?"
        message="Se continuar, todos os dados preenchidos serão perdidos."
        confirmText="Continuar"
        cancelText="Cancelar"
        onConfirm={() => {
          setShowConfirmChange(false);
          navigate("/");
        }}
        onCancel={() => setShowConfirmChange(false)}
      />
    </div>
  );
}

export default Form;
