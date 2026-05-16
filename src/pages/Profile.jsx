import { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../supabase'

function Profile() {
  const { user, signOut } = useAuth()
  const [limit, setLimit] = useState(400)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    loadProfile()
  }, [user])

  const loadProfile = async () => {
    if (!user) return
    const { data } = await supabase
      .from('profiles')
      .select('daily_limit_mg')
      .eq('id', user.id)
      .single()

    if (data) {
      setLimit(data.daily_limit_mg)
    }
  }

  const handleSave = async () => {
    if (!user) return
    setSaving(true)
    const { error } = await supabase
      .from('profiles')
      .update({ daily_limit_mg: limit })
      .eq('id', user.id)

    setSaving(false)
    if (!error) {
      setMessage('Сохранено!')
      setTimeout(() => setMessage(''), 2000)
    }
  }

  return (
    <div className="container">
      <h2 style={{ marginBottom: 16 }}>Профиль</h2>

      <div className="card" style={{ marginBottom: 12 }}>
        <label style={{ display: 'block', marginBottom: 8, fontWeight: 500 }}>Email</label>
        <div style={{ color: '#6b7280' }}>{user?.email || '—'}</div>
      </div>

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

      <button
        className="btn btn-danger"
        style={{ width: '100%' }}
        onClick={signOut}
      >
        Выйти
      </button>
    </div>
  )
}

export default Profile
