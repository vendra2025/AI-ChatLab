# 🧠 AI ChatLab

Laboratório local para testar agentes baseados em LLMs usando a OpenRouter API.

## 🎯 Objetivo

Este projeto permite:

- Inserir a chave da OpenRouter e escolher o modelo LLM.
- Configurar instruções do agente (ex: especialista em vendas, design, dev).
- Interagir com o modelo via chat para simular comportamentos.
- Testar múltiplos cenários rapidamente sem backend.

## 🧱 Stack Utilizada

- **React + Vite** — Frontend rápido e moderno.
- **TailwindCSS** — Estilização ágil.
- **Zustand** — Estado global para configs (chave, modelo, instruções).
- **React Router** — Navegação entre páginas.
- **shadcn/ui** — Componentes de interface modernos.
- **localStorage** — Persistência simples sem backend.

## 📐 Estrutura de Telas

### 1. `/config`
- Campo para chave da OpenRouter.
- Dropdown para selecionar modelo (ex: `openai/gpt-4o-mini`).
- Textarea para instruções customizadas.
- Botão “Salvar e iniciar chat”.

### 2. `/chat`
- Exibe a instrução atual do agente.
- Caixa de chat para enviar mensagens.
- Mostra respostas do modelo.
- Indica qual modelo está ativo.

## 🚀 Como Rodar Localmente

```bash
git clone https://github.com/seu-usuario/ai-chatlab
cd ai-chatlab
npm install
npm run dev
````

Acesse: `http://localhost:5173`

## 🔐 OpenRouter API

* O usuário insere a chave manualmente.
* As requisições são feitas para: `https://openrouter.ai/api/v1/chat/completions`
* O header da requisição inclui:

  ```ts
  Authorization: Bearer <SUA_CHAVE>
  ```

## 💡 Possíveis Agentes para Testes

* 🤖 Suporte técnico para produtos digitais
* 💬 Vendedor especialista em soluções complexas
* 👨‍🎨 Designer de identidade visual
* 🧑‍💻 Arquiteto de software sênior
* 📝 Gerador de conteúdo otimizado

## 🛠️ To-Do

* [ ] Implementar layout com Tailwind + shadcn
* [ ] Criar store com Zustand
* [ ] Conectar API da OpenRouter
* [ ] Adicionar histórico de mensagens
* [ ] Suporte a múltiplos agentes (pré-configurados)
