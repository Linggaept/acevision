// types/chat.ts
export interface ChatMessage {
  id: string
  type: 'sent' | 'received' | 'system'
  text: string
  username: string
  timestamp: Date
}

export interface PieSocketMessage {
  message: string
  username: string
  timestamp: string
  userId?: string
  avatar?: string
}

export interface UserForm {
  name: string
  channel: string
}

export interface ConnectionStatus {
  isConnected: boolean
  isConnecting: boolean
  hasError: boolean
  errorMessage?: string
}

export interface PieSocketConfig {
  apiKey: string | undefined
  baseUrl: string | undefined
  reconnectAttempts: number
  reconnectDelay: number
}