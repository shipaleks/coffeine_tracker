import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabase'

function AddLog() {
  const [drinks, setDrinks] = useState([])
  const [selectedDrink, setSelectedDrink] = useState(null)
  const [servings, setServings] = useState(1)
  const [consumedAt, setConsumedAt] = useState('')
  const [notes, setNotes] = useState('')
  const [saving, setSaving] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    loadDrinks()
    const now = new Date()
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset())
    setConsumedAt(now.toISOString().slice(0, 16))
  }, [])

  const loadDrinks = async () => {
    const { data } = await supabase.from('drinks').select('*').order('name')
    setDrinks(data || [])
  }

  const handleSave = async () => {
    if (!selectedDrink) return

    setSaving(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      setSaving(false)
      return
    }

    const caffeineMg = servings * selectedDrink.caffeine_per_serving

    const { error } = await supabase.from('caffeine_logs').insert({
      user_id: user.id,
      drink_id: selectedDrink.id,
      servings,
      caffeine_mg: caffeineMg,
      consumed_at: consumedAt ? new Date(consumedAt).toISOString() : new Date().toISOString(),
      notes: notes || null,
    })

    setSaving(false)
    if (!error) {
      navigate('/')
    }
  }

  const totalMg = selectedDrink ? Math.round(servings * selectedDrink.caffeine_per_serving) : 0

  return (
    <div className="container">
      <h2 style={{ marginBottom: 16 }}>Добавить запись</h2>

      <div className="card" style={{ marginBottom: 12 }}>
        <label style={{ display: 'block', marginBottom: 8, fontWeight: 500 }}>Выберите напиток</label>
        <div className="drink-grid">
          {drinks.map((drink) => (
            <div
              key={drink.id}
              className={`drink-card${selectedDrink?.id === drink.id ? ' selected' : ''}`}
              onClick={() => setSelectedDrink(drink)}
            >
              <div style={{ fontWeight: 600, marginBottom: 4 }}>{drink.name}</div>
              <div style={{ fontSize: 14, color: '#6b7280' }}>{drink.caffeine_per_serving} мг/порц.</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card" style={{ marginBottom: 12 }}>
        <label style={{ display: 'block', marginBottom: 8, fontWeight: 500 }}>Количество порций</label>
        <input
          type="number"
          step="0.5"
          min="0.5"
          className="input"
          value={servings}
          onChange={(e) => setServings(parseFloat(e.target.value) || 1)}
        />
        {selectedDrink && (
          <div style={{ marginTop: 8, fontSize: 14, color: '#6b7280' }}>
            Итого: <strong>{totalMg} мг</strong> кофеина
          </div>
        )}
      </div>

      <div className="card" style={{ marginBottom: 12 }}>
        <label style={{ display: 'block', marginBottom: 8, fontWeight: 500 }}>Время потребления</label>
        <input
          type="datetime-local"
          className="input"
          value={consumedAt}
          onChange={(e) => setConsumedAt(e.target.value)}
        />
      </div>

      <div className="card" style={{ marginBottom: 12 }}>
        <label style={{ display: 'block', marginBottom: 8, fontWeight: 500 }}>Заметка (необязательно)</label>
        <input
          type="text"
          className="input"
          placeholder="Например, утренний кофе"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>

      <button
        className="btn btn-primary"
        style={{ width: '100%' }}
        disabled={!selectedDrink || saving}
        onClick={handleSave}
      >
        {saving ? 'Сохранение...' : 'Сохранить'}
      </button>
    </div>
  )
}

export default AddLog
