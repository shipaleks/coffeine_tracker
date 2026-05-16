import { useEffect, useState } from 'react'
import DailyLimitBar from '../components/DailyLimitBar'
import TodayLogList from '../components/TodayLogList'
import { getTodayLogs, getProfile } from '../data/localStorage'

function Dashboard() {
  const [logs, setLogs] = useState([])
  const [limit, setLimit] = useState(400)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = () => {
    setLoading(true)
    
    // Load profile
    const profile = getProfile()
    setLimit(profile.daily_limit_mg || 400)
    
    // Load today's logs
    const todayLogs = getTodayLogs()
    setLogs(todayLogs)
    
    setLoading(false)
  }

  const totalCaffeine = logs.reduce((sum, log) => sum + (log.caffeine_mg || 0), 0)

  const handleDelete = () => {
    // Reload logs after deletion
    const todayLogs = getTodayLogs()
    setLogs(todayLogs)
  }

  if (loading) {
    return (
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
        <div style={{ color: '#9ca3af' }}>Загрузка...</div>
      </div>
    )
  }

  return (
    <div className="container">
      <h2 style={{ marginBottom: 16 }}>Дашборд</h2>
      <DailyLimitBar current={totalCaffeine} limit={limit} />
      <TodayLogList logs={logs} onDelete={handleDelete} />
    </div>
  )
}

export default Dashboard
