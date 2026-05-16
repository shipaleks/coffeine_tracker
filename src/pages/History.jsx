import { useEffect, useState } from 'react'
import { supabase } from '../supabase'

function History() {
  const [logs, setLogs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadHistory()
  }, [])

  const loadHistory = async () => {
    setLoading(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      setLoading(false)
      return
    }

    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    const { data } = await supabase
      .from('caffeine_logs')
      .select('*, drinks(name)')
      .eq('user_id', user.id)
      .gte('consumed_at', thirtyDaysAgo.toISOString())
      .order('consumed_at', { ascending: false })

    setLogs(data || [])
    setLoading(false)
  }

  const grouped = logs.reduce((acc, log) => {
    const date = new Date(log.consumed_at).toLocaleDateString('ru-RU')
    if (!acc[date]) acc[date] = []
    acc[date].push(log)
    return acc
  }, {})

  if (loading) {
    return (
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
        <div style={{ color: '#9ca3af' }}>Загрузка...</div>
      </div>
    )
  }

  if (logs.length === 0) {
    return (
      <div className="container">
        <h2 style={{ marginBottom: 16 }}>История</h2>
        <div className="card empty-state">За последние 30 дней записей нет.</div>
      </div>
    )
  }

  return (
    <div className="container">
      <h2 style={{ marginBottom: 16 }}>История</h2>
      {Object.entries(grouped).map(([date, dayLogs]) => {
        const dayTotal = dayLogs.reduce((sum, log) => sum + log.caffeine_mg, 0)
        return (
          <div key={date} className="history-group">
            <div className="history-group-title">
              {date} · {Math.round(dayTotal)} мг
            </div>
            <div className="card">
              {dayLogs.map((log) => (
                <div key={log.id} className="log-item">
                  <div className="log-item-info">
                    <div style={{ fontWeight: 500 }}>
                      {log.drinks?.name || 'Напиток'} · {log.servings} порц.
                    </div>
                    <div className="log-item-time">
                      {new Date(log.consumed_at).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
                      {' · '}
                      {Math.round(log.caffeine_mg)} мг
                    </div>
                    {log.notes && <div className="log-item-note">{log.notes}</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default History
