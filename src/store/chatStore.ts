import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { createMessageId } from '../lib/utils'

type Role = 'user' | 'assistant'

export type ChatMessage = {
  id: string
  role: Role
  content: string
  createdAt: string
}

export type AgentConfig = {
  apiKey: string
  model: string
  instructions: string
}

type ChatStore = {
  config: AgentConfig
  messages: ChatMessage[]
  isLoading: boolean
  error: string | null
  setConfig: (config: Partial<AgentConfig>) => void
  resetChat: () => void
  sendMessage: (content: string) => Promise<void>
}

type OpenRouterMessage = {
  role: 'system' | 'user' | 'assistant'
  content: string
}

type OpenRouterResponse = {
  choices?: Array<{
    message?: {
      role?: 'assistant' | 'tool'
      content?: string
    }
  }>
}

const DEFAULT_MODEL = 'openai/gpt-4o-mini'

export const useChatStore = create<ChatStore>()(
  persist(
    (set, get) => ({
      config: {
        apiKey: '',
        model: DEFAULT_MODEL,
        instructions: '',
      },
      messages: [],
      isLoading: false,
      error: null,
      setConfig: (config) =>
        set((state) => ({
          config: { ...state.config, ...config },
        })),
      resetChat: () => set({ messages: [] }),
      sendMessage: async (content: string) => {
        const trimmed = content.trim()
        if (!trimmed) return

        const { config, messages } = get()
        if (!config.apiKey) {
          set({ error: 'Informe sua chave da OpenRouter na tela de configuração.' })
          return
        }

        const userMessage: ChatMessage = {
          id: createMessageId(),
          role: 'user',
          content: trimmed,
          createdAt: new Date().toISOString(),
        }

        const updatedMessages = [...messages, userMessage]

        set((state) => ({
          messages: [...state.messages, userMessage],
          isLoading: true,
          error: null,
        }))

        const requestMessages: OpenRouterMessage[] = []
        const systemInstruction = config.instructions.trim()
        if (systemInstruction) {
          requestMessages.push({ role: 'system', content: systemInstruction })
        }

        requestMessages.push(
          ...updatedMessages.map((message) => ({
            role: message.role,
            content: message.content,
          })),
        )

        try {
          const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${config.apiKey}`,
              'HTTP-Referer': window.location.origin,
              'X-Title': 'AI ChatLab',
            },
            body: JSON.stringify({
              model: config.model,
              messages: requestMessages,
            }),
          })

          if (!response.ok) {
            const errorText = await response.text()
            throw new Error(errorText || 'Não foi possível obter resposta do modelo.')
          }

          const payload: OpenRouterResponse = await response.json()
          const assistantContent =
            payload.choices?.[0]?.message?.content?.trim() ??
            'Sem resposta. Verifique a configuração do modelo.'

          const assistantMessage: ChatMessage = {
            id: createMessageId(),
            role: 'assistant',
            content: assistantContent,
            createdAt: new Date().toISOString(),
          }

          set((state) => ({
            messages: [...state.messages, assistantMessage],
            isLoading: false,
          }))
        } catch (error) {
          const message =
            error instanceof Error
              ? error.message
              : 'Erro inesperado ao tentar conversar com o modelo.'

          set({ isLoading: false, error: message })
        }
      },
    }),
    {
      name: 'ai-chatlab-storage',
      partialize: (state) => ({
        config: state.config,
        messages: state.messages,
      }),
    },
  ),
)

export const models = [
  'openai/gpt-4o-mini',
  'google/gemini-flash-1.5',
  'anthropic/claude-3.5-sonnet',
  'meta-llama/llama-3.1-70b-instruct',
]
