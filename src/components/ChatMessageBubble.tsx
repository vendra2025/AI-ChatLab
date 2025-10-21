import { ChatMessage } from '../store/chatStore'
import { cn } from '../lib/utils'
import { formatRelative } from '../lib/time'

const roles = {
  user: {
    label: 'Você',
    bubble: 'bg-cyan-500/10 border border-cyan-500/30',
    alignment: 'items-end text-right',
  },
  assistant: {
    label: 'Agente',
    bubble: 'bg-slate-800/80 border border-slate-700',
    alignment: 'items-start text-left',
  },
}

type ChatMessageBubbleProps = {
  message: ChatMessage
}

export function ChatMessageBubble({ message }: ChatMessageBubbleProps) {
  const config = roles[message.role]

  return (
    <div className={cn('flex flex-col gap-2', config.alignment)}>
      <span className="text-xs uppercase tracking-wide text-slate-500">
        {config.label} · {formatRelative(message.createdAt)}
      </span>
      <p
        className={cn(
          'max-w-3xl rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm backdrop-blur-sm animate-fade-in',
          config.bubble,
        )}
      >
        {message.content}
      </p>
    </div>
  )
}
