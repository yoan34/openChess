import Piece from '@/components/chessboard/piece'
import { useBoard } from '@/src/context/board-context/hooks'
import { usePieceRefs } from '@/src/context/board-refs-context/hooks'
import { useChessboardProps } from '@/src/context/props-context/hooks'
import { useReversePiecePosition } from '@/src/notation'
import React from 'react'

const Pieces: React.FC<{ isFlipped: boolean }> = React.memo(({ isFlipped }) => {
  const board = useBoard()
  const refs = usePieceRefs()
  const { pieceSize } = useChessboardProps()
  const { toPosition } = useReversePiecePosition()
  const renderedBoard = isFlipped ? [...board].reverse() : board

  return (
    <>
      {renderedBoard.map((row, y) =>
        row.map((piece, x) => {
          if (piece !== null) {
            const square = toPosition({
              x: x * pieceSize,
              y: y * pieceSize
            })

            return (
              <Piece
                ref={refs?.current?.[square]}
                key={`${x}-${y}`}
                id={`${piece.color}${piece.type}` as const}
                startPosition={{ x, y }}
                square={square}
                size={pieceSize}
              />
            )
          }
          return null
        })
      )}
    </>
  )
})

export { Pieces }
