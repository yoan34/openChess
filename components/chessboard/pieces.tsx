import Piece from '@/components/chessboard/piece'
import { useBoard } from '@/src/context/board-context/hooks'
import { usePieceRefs } from '@/src/context/board-refs-context/hooks'
import { useChessboardProps } from '@/src/context/props-context/hooks'
import { useReversePiecePosition } from '@/src/notation'
import { openingStore } from '@/stores'
import React, { useState, useEffect } from 'react'

const Pieces: React.FC<{ isFlipped: boolean }> = React.memo(({ isFlipped }) => {
  const board = useBoard()
  const refs = usePieceRefs()
  const { pieceSize } = useChessboardProps()
  console.log('Pieces')
  const { toPosition } = useReversePiecePosition()
  const [openingID, setOpeningID] = useState<string>('')

  const handleMove = (from: string, to: string) => {
    setOpeningID((prev) => `${prev}${from}${to},`)
  }
  const renderedBoard = board.map((row) => isFlipped ? [...row].reverse() : row)
  const boardToRender = isFlipped ? [...renderedBoard].reverse() : renderedBoard

  useEffect(() => {
    const fetchOpening = async () => {
      if (!openingID) return

      try {
        console.log('Current Opening ID:', openingID)
        const opening = await openingStore.fetchOpeningById(openingID)
        console.log('Opening Data:', opening?.data)
      } catch (error) {
        console.error('Error fetching opening:', error)
      }
    }
    fetchOpening()

  }, [openingID])

  return (
    <>
      {boardToRender.map((row, y) =>
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
                onPieceMove={handleMove}
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
