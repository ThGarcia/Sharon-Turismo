import "./Modal.css";

import {
  maskCPF,
  maskPhone,
  maskCEP,
  formatDate,
  capitalizeName,
} from "../../utils/masks";
import Button from "../button/Button";

function Modal({ data, onConfirm, onCancel }) {
  if (!data) return null;

  return (
    <div className="modal-container" onClick={onCancel}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div>
          <p className="form-title">Confirme seus dados:</p>
          <div className="modal-data">
            <label className="modal-label">Viagem: </label>
            <p>{data.travel}</p>
          </div>
          <div className="modal-data">
            <label className="modal-label">Viajantes: </label>
            <p>{data.people}</p>
          </div>
          <div className="modal-data">
            <label className="modal-label">Data: </label>
            <p>{data.data}</p>
          </div>
        </div>
        <div>
          <p className="form-title">Cliente:</p>
          <div className="modal-data">
            <label className="modal-label">Nome: </label>
            <p>{capitalizeName(data.client.name)}</p>
          </div>
          <div className="modal-data">
            <label className="modal-label">CPF: </label>
            <p>{maskCPF(data.client.cpf)}</p>
          </div>
          <div className="modal-data">
            <label className="modal-label">Data de Nascimento: </label>
            <p>{formatDate(data.client.birth)}</p>
          </div>
          <div className="modal-data">
            <label className="modal-label">Telefone: </label>
            <p>{maskPhone(data.client.phone)}</p>
          </div>
        </div>
        <div>
          <p className="form-title">Endereço:</p>
          <p>
            {capitalizeName(data.client.address.street)},{" "}
            {data.client.address.number}
          </p>
          {data.client.address.comp && <p>{data.client.address.comp}</p>}
          <p>
            {capitalizeName(data.client.address.neighborhood)} –{" "}
            {capitalizeName(data.client.address.city)}/
            {data.client.address.state}
          </p>
          <p>{maskCEP(data.client.address.zip)}</p>
        </div>
        {data.companions.length > 0 &&
          data.companions.map((c, i) => (
            <div key={i}>
              <p className="form-title">
                <b>
                  {data.companions.length === 1
                    ? "Acompanhante"
                    : `Acompanhante ${i + 1}`}
                  :
                </b>
              </p>
              <div className="modal-data">
                <label className="modal-label">Nome: </label>
                <p>{capitalizeName(c.name)}</p>
              </div>
              <div className="modal-data">
                <label className="modal-label">CPF: </label>
                <p>{maskCPF(c.cpf)}</p>
              </div>
              <div className="modal-data">
                <label className="modal-label">Data de nascimento:</label>
                <p>{formatDate(c.birth)}</p>
              </div>
            </div>
          ))}
        <div className="modal-buttons">
          <Button text="Confirmar" onClick={onConfirm} />
          <Button text="Cancelar" variant="alert" onClick={onCancel} />
        </div>
      </div>
    </div>
  );
}

export default Modal;
