import type { HighlightedSquareRefType } from '@/components/chessboard/highlighted-squares/highlighted-square'
import type { ChessPieceRef } from '@/components/chessboard/piece'
import { useSetBoard } from '@/src/context/board-context/hooks'
import { useChessEngine } from '@/src/context/chess-engine-context/hooks'
import {
  ChessboardState,
  getChessboardState
} from '@/src/helpers/get-chessboard-state'
import type { Move, Square } from 'chess.js'
import React, {
  createContext,
  useCallback,
  useImperativeHandle,
  useRef
} from 'react'

const PieceRefsContext = createContext<React.MutableRefObject<Record<
  Square,
  React.MutableRefObject<ChessPieceRef>
> | null> | null>(null)

const SquareRefsContext = createContext<React.MutableRefObject<Record<
  Square,
  React.MutableRefObject<HighlightedSquareRefType>
> | null> | null>(null)

export type ChessboardRef = {
  undo: () => void
  move: (_: {
    from: Square
    to: Square
  }) => Promise<Move | undefined> | undefined
  highlight: (_: { square: Square; color?: string }) => void
  resetAllHighlightedSquares: () => void
  resetBoard: (fen?: string) => void
  getState: () => ChessboardState
}

const BoardRefsContextProviderComponent = React.forwardRef<
  ChessboardRef,
  { children?: React.ReactNode }
>(({ children }, ref) => {
  const chess = useChessEngine()
  if (!chess) {
    console.error('Chess instance is null, ensure that you are within the ChessEngineContext provider.')
    return
  }
  const board = chess.board()
  const setBoard = useSetBoard()

  // There must be a better way of doing this.
  const generateBoardRefs = useCallback(() => {
    const acc: { [key in Square]?: React.RefObject<HTMLDivElement> } = {}
    for (let x = 0; x < board.length; x++) {
      const row = board[x]
      for (let y = 0; y < row.length; y++) {
        const col = String.fromCharCode(97 + Math.round(x))
        const row = `${8 - Math.round(y)}`
        const square = `${col}${row}` as Square

        acc[square] = useRef(null)
      }
    }
    return acc
  }, [board])

  const pieceRefs: React.MutableRefObject<Record<
    Square,
    React.MutableRefObject<ChessPieceRef>
  > | null> = useRef(generateBoardRefs())

  const squareRefs: React.MutableRefObject<Record<
    Square,
    React.MutableRefObject<HighlightedSquareRefType>
  > | null> = useRef(generateBoardRefs())

  useImperativeHandle(
    ref,
    () => ({
      move: async ({ from, to }) => {
        // eslint-disable-next-line @typescript-eslint/return-await
        return pieceRefs?.current?.[from].current?.moveTo?.(to)
      },
      undo: () => {
        if (!chess) {
          console.error('Chess instance is null, ensure that you are within the ChessEngineContext provider.')
          return
        }
        chess.undo()
        if (setBoard) {
          setBoard(chess.board())
        } else {
          console.error('setBoard is null, ensure that you are within the BoardSetterContext provider.')
        }
      },
      highlight: ({ square, color }) => {
        squareRefs.current?.[square].current.highlight({
          backgroundColor: color
        })
      },
      resetAllHighlightedSquares: () => {
        for (let x = 0; x < board.length; x++) {
          const row = board[x]
          for (let y = 0; y < row.length; y++) {
            const col = String.fromCharCode(97 + Math.round(x))
            // eslint-disable-next-line no-shadow
            const row = `${8 - Math.round(y)}`
            const square = `${col}${row}` as Square
            squareRefs.current?.[square].current.reset()
          }
        }
      },
      getState: () => {
        return getChessboardState(chess)
      },
      resetBoard: (fen?: string) => {
        if (!chess) {
          console.error('Chess instance is null, ensure that you are within the ChessEngineContext provider.')
          return
        }
        chess.reset()
        if (fen) chess.load(fen)

        const newBoard = chess.board()

        if (setBoard) {
          setBoard(newBoard)
        } else {
          console.error('setBoard is null, ensure that you are within the BoardSetterContext provider.')
        }
      }
    }),
    [board, chess, setBoard]
  )

  return (
    <PieceRefsContext.Provider value={pieceRefs}>
      <SquareRefsContext.Provider value={squareRefs}>
        {children}
      </SquareRefsContext.Provider>
    </PieceRefsContext.Provider>
  )
})

const BoardRefsContextProvider = React.memo(BoardRefsContextProviderComponent)

export { PieceRefsContext, SquareRefsContext, BoardRefsContextProvider }
