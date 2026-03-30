export type BoltEmotion = 'neutral' | 'positive' | 'warning' | 'critical'
export type BoltStatus = 'idle' | 'listening' | 'processing' | 'speaking'

export interface BoltMessage {
  id: string
  role: 'bolt' | 'user'
  text: string
  timestamp: Date
  emotion?: BoltEmotion
  action?: BoltAction
}

export interface BoltAction {
  type: 'navigate' | 'alert' | 'highlight'
  path?: string
}

export interface BoltResponse {
  text: string
  action?: BoltAction
  emotion?: BoltEmotion
}
