import { PieceRefsContext, SquareRefsContext } from '@/src/context/board-refs-context'
import { useContext } from 'react'

export const usePieceRefs = () => {
  return useContext(PieceRefsContext)
}

export const useSquareRefs = () => {
  return useContext(SquareRefsContext)
}
