import { BoardContext, BoardSetterContext } from '@/src/context/board-context'
import {
  BoardOperationsContextProvider,
  BoardOperationsRef
} from '@/src/context/board-operations-context'
import { BoardPromotionContextProvider } from '@/src/context/board-promotion-context'
import { BoardRefsContextProvider, ChessboardRef } from '@/src/context/board-refs-context'
import { ChessEngineContext } from '@/src/context/chess-engine-context'
import { useConst } from '@/src/hooks/use-const'
import { Chess } from 'chess.js'
import React, { useImperativeHandle, useMemo, useRef, useState } from 'react'

type BoardContextProviderProps = {
  fen?: string
  children?: React.ReactNode
}

const ChessboardContextProviderComponent = React.forwardRef<
  ChessboardRef,
  BoardContextProviderProps
>(({ children, fen }, ref) => {
  const chess = useConst(() => new Chess(fen))
  const chessboardRef = useRef<ChessboardRef>(null)
  const boardOperationsRef = useRef<BoardOperationsRef>(null)

  const [board, setBoard] = useState(chess.board())

  const chessboardController: ChessboardRef = useMemo(() => {
    return {
      move: async (params) => await chessboardRef.current?.move?.(params),
      undo: async () => {
        chessboardRef.current?.undo()
        boardOperationsRef.current?.reset()
      },
      highlight: (params) => chessboardRef.current?.highlight(params),
      resetAllHighlightedSquares: () =>
        chessboardRef.current?.resetAllHighlightedSquares(),
      getState: () => {
        if (chessboardRef?.current) {
          return chessboardRef.current.getState()
        } else {
          throw new Error('chessboardRef is null or undefined.')
        }
      },
      resetBoard: (params) => {
        chessboardRef.current?.resetBoard(params)
        boardOperationsRef.current?.reset()
      }
    }
  }, [])

  useImperativeHandle(ref, () => chessboardController, [chessboardController])

  return (
    <BoardContext.Provider value={board}>
      <BoardPromotionContextProvider>
        <ChessEngineContext.Provider value={chess}>
          <BoardSetterContext.Provider value={setBoard}>
            <BoardRefsContextProvider ref={chessboardRef}>
              <BoardOperationsContextProvider
                ref={boardOperationsRef}
                controller={chessboardController}
              >
                {children}
              </BoardOperationsContextProvider>
            </BoardRefsContextProvider>
          </BoardSetterContext.Provider>
        </ChessEngineContext.Provider>
      </BoardPromotionContextProvider>
    </BoardContext.Provider>
  )
})

const ChessboardContextProvider = React.memo(
  ChessboardContextProviderComponent
)
export {
  ChessboardContextProvider,
  ChessEngineContext,
  BoardContext,
  BoardSetterContext
}
