import { HighlightedSquare } from '@/components/chessboard/highlighted-squares/highlighted-square'
import { useSquareRefs } from '@/src/context/board-refs-context/hooks'
import { useChessEngine } from '@/src/context/chess-engine-context/hooks'
import { useChessboardProps } from '@/src/context/props-context/hooks'
import { useReversePiecePosition } from '@/src/notation'
import React, { useMemo } from 'react'
import { StyleSheet, View } from 'react-native'

const HighlightedSquares: React.FC<{ isFlipped: boolean }> = React.memo(({ isFlipped }) => {
  const chess = useChessEngine()
  const board = useMemo(() => chess.board(), [chess])
  const { pieceSize } = useChessboardProps()
  console.log('HightLightedSquares')
  const { toPosition, toTranslation } = useReversePiecePosition()
  const refs = useSquareRefs()

  return (
    <View
      style={{
        ...StyleSheet.absoluteFillObject
      }}
    >
      {board.map((row, y) => {
        const adjustedY = isFlipped ? 7 - y : y
        return row.map((_, x) => {
          const adjustedX = isFlipped ? 7 - x : x
          const square = toPosition({ x: adjustedX * pieceSize, y: adjustedY * pieceSize })
          const translation = toTranslation(square)

          return (
            <HighlightedSquare
              key={`${adjustedX}-${adjustedY}`}
              ref={refs?.current?.[square]}
              style={[
                styles.highlightedSquare,
                {
                  width: pieceSize,
                  transform: [
                    { translateX: translation.x },
                    { translateY: translation.y }
                  ]
                }
              ]}
            />
          )
        })
      }
      )}
    </View>
  )
})

const styles = StyleSheet.create({
  highlightedSquare: {
    position: 'absolute',
    aspectRatio: 1
  }
})

export { HighlightedSquares }
