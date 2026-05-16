import { useState } from 'react'
import { deleteLog } from '../data/localStorage'

function TodayLogList({ logs, onDelete }) {
  const [confirmId, setConfirmId] = useState(null)

  const handleDelete = (id) => {
    if (confirmId !== id) {
      setConfirmId(id)
      return
    }
    deleteLog(id)
    onDelete(id)
    setConfirmId(null)
  }

  if (logs.length === 0) {
    return (
      <div className="card empty-state">
        Сегодня записей пока нет. Добавьте первую!
      </div>
    )
  }

  return (
    <div className="card">
      <h3 style={{ marginBottom: 12, fontSize: 16 }}>Сегодняшние записи</h3>
      {logs.map((log) => (
        <div key={log.id} className="log-item">
          <div className="log-item-info">
            <div style={{ fontWeight: 500 }}>
              {log.drink_name || 'Напиток'} · {log.servings} порц.
            </div>
            <div className="log-item-time">
              {new Date(log.consumed_at).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
              {' · '}
              {Math.round(log.caffeine_mg)} мг
            </div>
            {log.notes && <div className="log-item-note">{log.notes}</div>}
          </div>
          <div className="log-item-actions">
            <button
              className="delete-btn"
              onClick={() => handleDelete(log.id)}
              title={confirmId === log.id ? 'Подтвердить удаление' : 'Удалить'}
            >
              {confirmId === log.id ? '✓' : '×'}
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default TodayLogList
