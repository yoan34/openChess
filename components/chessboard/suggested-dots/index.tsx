import { PlaceholderDot } from '@/components/chessboard/suggested-dots/PlaceholderDot'
import { useBoardOperations } from '@/src/context/board-operations-context/hooks'
import { useChessEngine } from '@/src/context/chess-engine-context/hooks'
import React, { useMemo } from 'react'
import { StyleSheet, View } from 'react-native'

const SuggestedDots: React.FC<{ isFlipped: boolean }> = React.memo(({ isFlipped }) => {
  const chess = useChessEngine()
  const { moveTo, selectableSquares } = useBoardOperations()
  const board = useMemo(() => chess.board(), [chess])

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
          return (
            <PlaceholderDot
              key={`${adjustedX}-${adjustedY}`}
              x={adjustedX}
              y={adjustedY}
              selectableSquares={selectableSquares}
              moveTo={moveTo}
            />
          )
        })
        }
      )}
    </View>
  )
})

export { SuggestedDots }
