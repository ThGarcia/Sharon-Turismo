import "./Modal.css";
import Button from "../button/Button";

function ConfirmModal({
  open,
  title,
  message,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  onConfirm,
  onCancel,
}) {
  if (!open) return null;

  return (
    <div className="modal-container" onClick={onCancel}>
      <div className="modal modal-small" onClick={(e) => e.stopPropagation()}>
        <p className="form-title">{title}</p>

        <p className="modal-message">{message}</p>

        <div className="modal-buttons">
          <Button text={confirmText} onClick={onConfirm} />
          <Button text={cancelText} variant="alert" onClick={onCancel} />
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
