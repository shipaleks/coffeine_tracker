import { useEffect, useState } from 'react'
import { getProfile, updateProfile, clearAllData } from '../data/localStorage'

function Profile() {
  const [limit, setLimit] = useState(400)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [showResetConfirm, setShowResetConfirm] = useState(false)

  useEffect(() => {
    loadProfile()
  }, [])

  const loadProfile = () => {
    const profile = getProfile()
    setLimit(profile.daily_limit_mg || 400)
  }

  const handleSave = () => {
    setSaving(true)
    updateProfile({ daily_limit_mg: limit })
    setSaving(false)
    setMessage('Сохранено!')
    setTimeout(() => setMessage(''), 2000)
  }

  const handleResetData = () => {
    clearAllData()
    setShowResetConfirm(false)
    loadProfile()
    setMessage('Все данные очищены!')
    setTimeout(() => setMessage(''), 2000)
  }

  return (
    <div className="container">
      <h2 style={{ marginBottom: 16 }}>Профиль</h2>

      <div className="card" style={{ marginBottom: 12 }}>
        <label style={{ display: 'block', marginBottom: 8, fontWeight: 500 }}>Дневной лимит кофеина (мг)</label>
        <input
          type="number"
          className="input"
          min="1"
          value={limit}
          onChange={(e) => setLimit(parseInt(e.target.value) || 400)}
        />
        <button
          className="btn btn-primary"
          style={{ width: '100%', marginTop: 12 }}
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? 'Сохранение...' : 'Сохранить лимит'}
        </button>
        {message && (
          <div style={{ marginTop: 8, textAlign: 'center', color: '#22c55e', fontSize: 14 }}>
            {message}
          </div>
        )}
      </div>

      <div className="card" style={{ marginBottom: 12 }}>
        <h3 style={{ fontSize: 16, marginBottom: 8 }}>⚠️ Опасная зона</h3>
        <p style={{ fontSize: 14, color: '#6b7280', marginBottom: 12 }}>
          Удаление всех данных без возможности восстановления.
        </p>
        <button
          className="btn btn-danger"
          style={{ width: '100%' }}
          onClick={() => setShowResetConfirm(true)}
        >
          Удалить все данные
        </button>
      </div>

      {showResetConfirm && (
        <div className="modal-overlay" onClick={() => setShowResetConfirm(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3 style={{ marginBottom: 8 }}>Подтвердите удаление</h3>
            <p style={{ color: '#6b7280' }}>
              Все записи и настройки будут безвозвратно удалены. Продолжить?
            </p>
            <div className="modal-actions">
              <button className="btn btn-secondary" onClick={() => setShowResetConfirm(false)}>Отмена</button>
              <button className="btn btn-danger" onClick={handleResetData}>Удалить</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Profile
