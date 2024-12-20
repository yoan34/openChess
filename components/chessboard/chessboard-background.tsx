import { useChessboardProps } from '@/src/context/props-context/hooks'
import React from 'react'
import { View, StyleSheet, Text } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row'
  }
})

type BackgroundProps = {
  letters: boolean
  numbers: boolean
}

interface BaseProps extends BackgroundProps {
  white: boolean
  isFlipped: boolean
}

interface RowProps extends BaseProps {
  row: number
}

interface SquareProps extends RowProps {
  col: number
}

const Square = React.memo(
  ({ white, row, col, letters, numbers, isFlipped }: SquareProps) => {
    const { colors } = useChessboardProps()
    const backgroundColor = white ? colors.black : colors.white
    const color = white ? colors.white : colors.black
    const textStyle = { fontWeight: '500' as const, fontSize: 10, color }
    const newLocal = col === 0
    const displayedRow = isFlipped ? row + 1 : 8 - row
    const displayedCol = isFlipped ? String.fromCharCode(104 - col) : String.fromCharCode(97 + col)

    return (
      <View
        style={{
          flex: 1,
          backgroundColor,
          padding: 4,
          justifyContent: 'space-between'
        }}
      >
        {numbers && (
          <Text style={[textStyle, { opacity: newLocal ? 1 : 0 }]}>
            {'' + displayedRow}
          </Text>
        )}
        {row === 7 && letters && (
          <Text style={[textStyle, { alignSelf: 'flex-end' }]}>
            {displayedCol}
          </Text>
        )}
      </View>
    )
  }
)

const Row = React.memo(({ white, row, isFlipped, ...rest }: RowProps) => {
  const offset = white ? 0 : 1
  return (
    <View style={styles.container}>
      {new Array(8).fill(0).map((_, i) => (
        <Square
          {...rest}
          row={row}
          col={i}
          isFlipped={isFlipped}
          key={i}
          white={(i + offset) % 2 === 1}
        />
      ))}
    </View>
  )
})

const Background: React.FC<{ isFlipped: boolean }> = React.memo(({ isFlipped }) => {
  const { withLetters, withNumbers } = useChessboardProps()
  const rows = new Array(8).fill(0)

  return (
    <View style={{ flex: 1 }}>
      {rows.map((_, i) => (
        <Row
          key={i}
          white={i % 2 === 0}
          row={i}
          letters={withLetters}
          numbers={withNumbers}
          isFlipped={isFlipped}
        />
      ))}
    </View>
  )
})

export default Background
