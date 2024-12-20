import { StartPositionContext } from '@/src/context/board-flipped'
import { useContext } from 'react'

const useStartPosition = () => {
  const context = useContext(StartPositionContext)
  if (!context) {
    throw new Error('useStartPosition must be used within a StartPositionProvider')
  }
  return context
}

export { useStartPosition }
