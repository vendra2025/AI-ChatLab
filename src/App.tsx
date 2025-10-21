import { Navigate, Route, Routes } from 'react-router-dom'
import { AppShell } from './components/AppShell'
import { ConfigPage } from './pages/ConfigPage'
import { ChatPage } from './pages/ChatPage'

function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/config" element={<ConfigPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="*" element={<Navigate to="/config" replace />} />
      </Routes>
    </AppShell>
  )
}

export default App
