import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DRINKS, CATEGORIES } from '../data/drinks'
import { addLog } from '../data/localStorage'

function AddLog() {
  const [selectedDrink, setSelectedDrink] = useState(null)
  const [servings, setServings] = useState(1)
  const [consumedAt, setConsumedAt] = useState('')
  const [notes, setNotes] = useState('')
  const [saving, setSaving] = useState(false)
  const [activeCategory, setActiveCategory] = useState('coffee')
  const navigate = useNavigate()

  useEffect(() => {
    const now = new Date()
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset())
    setConsumedAt(now.toISOString().slice(0, 16))
  }, [])

  const handleSave = () => {
    if (!selectedDrink) return

    setSaving(true)
    
    const caffeineMg = servings * selectedDrink.caffeine_per_serving

    addLog({
      drink_id: selectedDrink.id,
      drink_name: selectedDrink.name,
      servings,
      caffeine_mg: caffeineMg,
      consumed_at: consumedAt ? new Date(consumedAt).toISOString() : new Date().toISOString(),
      notes: notes || null,
    })

    setSaving(false)
    navigate('/')
  }

  const totalMg = selectedDrink ? Math.round(servings * selectedDrink.caffeine_per_serving) : 0
  
  const filteredDrinks = DRINKS.filter(d => d.category === activeCategory)

  return (
    <div className="container">
      <h2 style={{ marginBottom: 16 }}>Добавить запись</h2>

      {/* Category tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
        {Object.entries(CATEGORIES).map(([key, label]) => (
          <button
            key={key}
            onClick={() => {
              setActiveCategory(key)
              setSelectedDrink(null)
            }}
            style={{
              padding: '8px 16px',
              borderRadius: 20,
              border: 'none',
              background: activeCategory === key ? '#4f46e5' : '#e5e7eb',
              color: activeCategory === key ? 'white' : '#374151',
              fontSize: 14,
              cursor: 'pointer',
            }}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="card" style={{ marginBottom: 12 }}>
        <label style={{ display: 'block', marginBottom: 8, fontWeight: 500 }}>
          {CATEGORIES[activeCategory]}
        </label>
        <div className="drink-grid">
          {filteredDrinks.map((drink) => (
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
