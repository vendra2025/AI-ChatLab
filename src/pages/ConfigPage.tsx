import { FormEvent, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Textarea } from '../components/ui/textarea'
import { models, useChatStore } from '../store/chatStore'

const instructionTemplates: Array<{ label: string; value: string }> = [
  {
    label: 'Suporte técnico',
    value:
      'Você é um agente de suporte técnico para produtos digitais. Faça diagnósticos rápidos, ofereça soluções objetivas e sugira passos de prevenção.',
  },
  {
    label: 'Vendas consultivas',
    value:
      'Você é um vendedor especialista em soluções complexas. Descubra dores do cliente e mostre como o produto resolve cada uma delas com exemplos reais.',
  },
  {
    label: 'Designer',
    value:
      'Você é um designer de identidade visual. Sugira diretrizes de estilo, combinações de cores e exemplos de aplicações consistentes com a marca.',
  },
  {
    label: 'Arquiteto de software',
    value:
      'Você é um arquiteto de software sênior. Entregue diagramas conceituais, orientações de arquitetura evolutiva e riscos técnicos relevantes.',
  },
]

export function ConfigPage() {
  const navigate = useNavigate()
  const { config, setConfig, resetChat } = useChatStore((state) => ({
    config: state.config,
    setConfig: state.setConfig,
    resetChat: state.resetChat,
  }))

  const [apiKey, setApiKey] = useState(config.apiKey)
  const [model, setModel] = useState(config.model)
  const [instructions, setInstructions] = useState(config.instructions)
  const isDirty = useMemo(
    () =>
      apiKey !== config.apiKey ||
      model !== config.model ||
      instructions !== config.instructions,
    [apiKey, config.apiKey, config.instructions, config.model, instructions, model],
  )

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setConfig({ apiKey, model, instructions })
    resetChat()
    navigate('/chat')
  }

  return (
    <section className="grid gap-6 md:grid-cols-[1fr_340px]">
      <Card className="md:order-1">
        <CardHeader>
          <CardTitle>Configurações do agente</CardTitle>
          <p className="text-sm text-slate-400">
            As informações ficam armazenadas apenas no seu navegador através do localStorage.
          </p>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="apiKey">Chave da OpenRouter</Label>
              <Input
                id="apiKey"
                name="apiKey"
                type="password"
                placeholder="sk-or-v1-..."
                value={apiKey}
                onChange={(event) => setApiKey(event.target.value)}
                required
              />
              <p className="text-xs text-slate-500">
                A chave não é enviada para nenhum servidor além da OpenRouter.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="model">Modelo</Label>
              <div className="relative">
                <select
                  id="model"
                  name="model"
                  className="h-11 w-full rounded-md border border-slate-800 bg-slate-900/80 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  value={model}
                  onChange={(event) => setModel(event.target.value)}
                >
                  {models.map((modelOption) => (
                    <option key={modelOption} value={modelOption}>
                      {modelOption}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="instructions">Instruções do agente</Label>
              <Textarea
                id="instructions"
                name="instructions"
                placeholder="Ex: Você é um especialista em..."
                value={instructions}
                onChange={(event) => setInstructions(event.target.value)}
              />
              <p className="text-xs text-slate-500">
                Experimente adaptar as instruções para cada cenário que deseja testar.
              </p>
            </div>

            <Button type="submit" className="h-11" disabled={!apiKey || !isDirty}>
              Salvar e iniciar chat
            </Button>
          </form>
        </CardContent>
      </Card>

      <aside className="space-y-4 md:order-2">
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 shadow-card">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-300">
            Dicas rápidas
          </h3>
          <p className="mt-2 text-sm text-slate-400">
            Teste diferentes personas clicando em um dos perfis abaixo. Você pode editar o texto antes de salvar.
          </p>
        </div>
        <div className="grid gap-3">
          {instructionTemplates.map((template) => (
            <button
              key={template.label}
              type="button"
              onClick={() => setInstructions(template.value)}
              className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 text-left transition hover:border-cyan-500/60 hover:bg-slate-900/80"
            >
              <p className="text-sm font-semibold text-slate-100">{template.label}</p>
              <p className="mt-1 text-xs text-slate-400">{template.value}</p>
            </button>
          ))}
        </div>
      </aside>
    </section>
  )
}
