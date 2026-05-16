function ConfirmModal({ title, message, onConfirm, onCancel }) {
  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h3 style={{ marginBottom: 8 }}>{title}</h3>
        <p style={{ color: '#6b7280' }}>{message}</p>
        <div className="modal-actions">
          <button className="btn btn-secondary" onClick={onCancel}>Отмена</button>
          <button className="btn btn-danger" onClick={onConfirm}>Удалить</button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmModal
