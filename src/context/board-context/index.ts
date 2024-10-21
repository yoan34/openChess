import type { Player } from '@/src/types'
import type { Chess, PieceSymbol } from 'chess.js'
import React, { createContext } from 'react'

const defaultBoard: ReturnType<Chess['board']> = Array(8)
  .fill(null)
  .map(() => Array(8).fill(null))
const BoardContext = createContext<ReturnType<Chess['board']>>(defaultBoard)

const BoardSetterContext = createContext<
  React.Dispatch<
    React.SetStateAction<
      Array<Array<{ type: PieceSymbol; color: Player } | null>>
    >
  > | null
>(null)

export { BoardContext, BoardSetterContext }
