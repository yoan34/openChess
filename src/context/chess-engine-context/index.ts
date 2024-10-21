import type { Chess } from 'chess.js'
import { createContext } from 'react'

const ChessEngineContext = createContext<Chess | null>(null)

export { ChessEngineContext }
