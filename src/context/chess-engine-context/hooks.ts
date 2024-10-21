import { ChessEngineContext } from '@/src/context/chess-engine-context'
import { useContext } from 'react'

export const useChessEngine = () => {
  return useContext(ChessEngineContext)
}
