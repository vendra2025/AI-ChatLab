import { FormEvent, useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChatMessageBubble } from '../components/ChatMessageBubble'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Textarea } from '../components/ui/textarea'
import { useChatStore } from '../store/chatStore'

export function ChatPage() {
  const navigate = useNavigate()
  const { config, messages, sendMessage, isLoading, error, resetChat } = useChatStore((state) => ({
    config: state.config,
    messages: state.messages,
    sendMessage: state.sendMessage,
    isLoading: state.isLoading,
    error: state.error,
    resetChat: state.resetChat,
  }))
  const [input, setInput] = useState('')
  const endRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!config.apiKey) {
      navigate('/config', { replace: true })
    }
  }, [config.apiKey, navigate])

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [messages.length, isLoading])

  const hasMessages = useMemo(() => messages.length > 0, [messages.length])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!input.trim()) return

    const payload = input
    setInput('')
    await sendMessage(payload)
  }

  return (
    <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_320px]">
      <Card className="flex min-h-[60vh] flex-col overflow-hidden">
        <CardHeader className="flex flex-col gap-1 border-b border-slate-800/80 bg-slate-900/40">
          <div className="flex items-center justify-between">
            <CardTitle>Chat ativo</CardTitle>
            <Badge variant="secondary">{config.model}</Badge>
          </div>
          <p className="text-sm text-slate-400">
            Interaja com o agente configurado. Cada mensagem é enviada diretamente para o endpoint da OpenRouter.
          </p>
        </CardHeader>
        <CardContent className="flex flex-1 flex-col gap-6 p-0">
          <div className="flex-1 space-y-6 overflow-y-auto px-6 py-6">
            {hasMessages ? (
              messages.map((message) => <ChatMessageBubble key={message.id} message={message} />)
            ) : (
              <div className="grid h-full place-items-center rounded-xl border border-dashed border-slate-800/80 px-8 py-16 text-center">
                <div className="space-y-2">
                  <p className="text-base font-medium text-slate-200">Envie uma mensagem para começar</p>
                  <p className="text-sm text-slate-500">
                    Use o campo abaixo para testar como o agente reage às instruções configuradas.
                  </p>
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>
          {error && (
            <div className="border-t border-red-500/40 bg-red-500/10 px-6 py-3 text-sm text-red-200">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="border-t border-slate-800/80 bg-slate-900/40 p-6">
            <Textarea
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Digite sua mensagem..."
              className="min-h-[100px]"
            />
            <div className="mt-4 flex items-center justify-between gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => resetChat()}
                disabled={!hasMessages || isLoading}
              >
                Limpar histórico
              </Button>
              <Button type="submit" disabled={isLoading || !input.trim()} className="min-w-[150px]">
                {isLoading ? 'Enviando...' : 'Enviar mensagem'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <aside className="flex flex-col gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Instrução atual</CardTitle>
            <p className="text-xs uppercase tracking-wide text-slate-500">Visão geral</p>
          </CardHeader>
          <CardContent>
            {config.instructions ? (
              <p className="whitespace-pre-wrap text-sm text-slate-300">{config.instructions}</p>
            ) : (
              <p className="text-sm text-slate-500">
                Nenhuma instrução definida. Volte para a tela de configuração e descreva a persona do seu agente.
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Dicas de uso</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-slate-400">
            <p>Experimente enviar cenários completos para avaliar o comportamento do agente.</p>
            <p>
              Combine perguntas objetivas com perguntas abertas para validar consistência e criatividade do modelo escolhido.
            </p>
            <p>
              Caso receba erros de autenticação, confira se a chave da OpenRouter está correta e se o modelo selecionado está
              habilitado na sua conta.
            </p>
          </CardContent>
        </Card>
      </aside>
    </div>
  )
}
