import { BoardOperationsContext } from '@/src/context/board-operations-context'
import { useContext } from 'react'

const useBoardOperations = () => {
  const context = useContext(BoardOperationsContext)

  if (!context) {
    throw new Error('useBoardOperations must be used within a BoardOperationsProvider')
  }

  return context
}

export { useBoardOperations }
