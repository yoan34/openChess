import { useStartPosition } from '@/src/context/board-flipped/hooks'
import { useChessboardProps } from '@/src/context/props-context/hooks'
import type { Vector } from '@/src/types'
import type { Square } from 'chess.js'
import { useCallback } from 'react'

const useReversePiecePosition = () => {
  const { pieceSize } = useChessboardProps()
  const { startPosition } = useStartPosition()
  console.log(startPosition)
  const toTranslation = useCallback(
    (to: Square) => {
      'worklet'
      const tokens = to.split('')
      const col = tokens[0]
      const row = tokens[1]
      if (!col || !row) {
        throw new Error('Invalid notation: ' + to)
      }
      const indexes = {
        x: col.charCodeAt(0) - 'a'.charCodeAt(0),
        y: parseInt(row, 10) - 1
      }
      return startPosition === 'white'
        ? {
          x: indexes.x * pieceSize,
          y: 7 * pieceSize - indexes.y * pieceSize
        }
        : {
          x: (7 - indexes.x) * pieceSize,
          y: indexes.y * pieceSize
        }
    },
    [pieceSize, startPosition]
  )

  const toPosition = useCallback(
    ({ x, y }: Vector) => {
      'worklet'
      const colIndex = Math.round(x / pieceSize)
      const rowIndex = Math.round(y / pieceSize)

      const col = startPosition === 'white'
        ? String.fromCharCode(97 + colIndex)
        : String.fromCharCode(97 + (7 - colIndex))

      const row = startPosition === 'white'
        ? `${8 - rowIndex}`
        : `${rowIndex + 1}`

      return `${col}${row}` as Square
    },
    [pieceSize, startPosition]
  )

  return { toPosition, toTranslation }
}

export { useReversePiecePosition }
