function DailyLimitBar({ current, limit }) {
  const percentage = Math.min((current / limit) * 100, 100)

  let color = '#22c55e'
  if (percentage > 80) color = '#ef4444'
  else if (percentage > 50) color = '#eab308'

  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
        <span style={{ fontWeight: 600 }}>Сегодня выпито</span>
        <span style={{ fontWeight: 600 }}>{Math.round(current)} из {limit} мг</span>
      </div>
      <div className="progress-bar-bg">
        <div
          className="progress-bar-fill"
          style={{ width: `${percentage}%`, backgroundColor: color }}
        />
      </div>
      <div style={{ marginTop: 8, fontSize: 14, color: '#6b7280' }}>
        {percentage >= 100 ? 'Дневной лимит достигнут!' : `Осталось ${Math.max(0, Math.round(limit - current))} мг`}
      </div>
    </div>
  )
}

export default DailyLimitBar
