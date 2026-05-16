import { useEffect, useState } from 'react'
import { supabase } from '../supabase'
import DailyLimitBar from '../components/DailyLimitBar'
import TodayLogList from '../components/TodayLogList'

function Dashboard() {
  const [logs, setLogs] = useState([])
  const [limit, setLimit] = useState(400)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setLoading(true)

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      setLoading(false)
      return
    }

    const todayStart = new Date()
    todayStart.setHours(0, 0, 0, 0)

    const { data: profile } = await supabase
      .from('profiles')
      .select('daily_limit_mg')
      .eq('id', user.id)
      .single()

    if (profile) {
      setLimit(profile.daily_limit_mg)
    } else {
      await supabase.from('profiles').insert({ id: user.id, daily_limit_mg: 400 })
    }

    const { data: logsData } = await supabase
      .from('caffeine_logs')
      .select('*, drinks(name)')
      .eq('user_id', user.id)
      .gte('consumed_at', todayStart.toISOString())
      .order('consumed_at', { ascending: false })

    setLogs(logsData || [])
    setLoading(false)
  }

  const totalCaffeine = logs.reduce((sum, log) => sum + log.caffeine_mg, 0)

  const handleDelete = (id) => {
    setLogs((prev) => prev.filter((l) => l.id !== id))
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
