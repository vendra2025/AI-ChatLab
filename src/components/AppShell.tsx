import { PropsWithChildren } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useChatStore } from '../store/chatStore'
import { Badge } from './ui/badge'
import { cn } from '../lib/utils'

const links = [
  { to: '/config', label: 'Configuração' },
  { to: '/chat', label: 'Chat' },
]

export function AppShell({ children }: PropsWithChildren) {
  const location = useLocation()
  const model = useChatStore((state) => state.config.model)

  return (
    <div className="flex min-h-screen w-full flex-col bg-slate-950/95 text-slate-100">
      <header className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-2 font-semibold tracking-tight">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-cyan-500/20 text-lg text-cyan-300">AI</span>
            <span>ChatLab</span>
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            {links.map((link) => {
              const isActive = location.pathname === link.to
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={cn(
                    'inline-flex items-center gap-2 rounded-md px-3 py-2 transition',
                    isActive
                      ? 'bg-cyan-500 text-slate-950 shadow-sm'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-slate-50',
                  )}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>
          <Badge className="hidden sm:inline-flex">{model}</Badge>
        </div>
      </header>
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 px-6 py-10">{children}</main>
    </div>
  )
}
