import { BoardContext, BoardSetterContext } from '@/src/context/board-context-provider'
import { useContext } from 'react'

const useBoard = () => {
  return useContext(BoardContext)
}

const useSetBoard = () => {
  return useContext(BoardSetterContext)
}

export { useBoard, useSetBoard }
