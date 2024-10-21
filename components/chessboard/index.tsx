import Background from '@/components/chessboard/chessboard-background'
import { HighlightedSquares } from '@/components/chessboard/highlighted-squares'
import { Pieces } from '@/components/chessboard/pieces'
import { SuggestedDots } from '@/components/chessboard/suggested-dots'
import { ChessboardContextProvider } from '@/src/context/board-context-provider'
import { useStartPosition } from "@/src/context/board-flipped/hooks"
import type { ChessboardRef } from '@/src/context/board-refs-context'
import {
  ChessboardProps,
  ChessboardPropsContextProvider
} from '@/src/context/props-context'
import { useChessboardProps } from '@/src/context/props-context/hooks'
import React, { useImperativeHandle, useRef } from 'react'
import { View, StyleSheet } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

const styles = StyleSheet.create({
  container: {
    aspectRatio: 1
  }
})

const Chessboard: React.FC<ChessboardProps> = React.memo(() => {
  const { boardSize } = useChessboardProps()
  const { startPosition } = useStartPosition()
  const isFlipped = startPosition === 'black'
  return (
    <View style={[styles.container, { width: boardSize }]}>
      <Background isFlipped={isFlipped}/>
      <Pieces isFlipped={isFlipped}/>
      <HighlightedSquares isFlipped={isFlipped}/>
      <SuggestedDots isFlipped={isFlipped}/>
    </View>
  )
})

const ChessboardContainerComponent = React.forwardRef<
  ChessboardRef,
  ChessboardProps
>((props, ref) => {
  const chessboardRef = useRef<ChessboardRef>(null)

  useImperativeHandle(
    ref,
    () => ({
      move: async (params) => await chessboardRef.current?.move?.(params),
      undo: () => chessboardRef.current?.undo(),
      highlight: (params) => chessboardRef.current?.highlight(params),
      resetAllHighlightedSquares: () =>
        chessboardRef.current?.resetAllHighlightedSquares(),
      getState: () => {
        if (chessboardRef?.current) {
          return chessboardRef.current.getState()
        } else {
          throw new Error('chessboardRef is null or undefined')
        }
      },
      resetBoard: (params) => chessboardRef.current?.resetBoard(params)
    }),
    []
  )
  console.log(props)
  return (
    <GestureHandlerRootView>
      <ChessboardPropsContextProvider {...props}>
        <ChessboardContextProvider ref={chessboardRef} fen={props.fen}>
          <Chessboard startPosition={props.startPosition}/>
        </ChessboardContextProvider>
      </ChessboardPropsContextProvider>
    </GestureHandlerRootView>
  )
})

const ChessboardContainer = React.memo(ChessboardContainerComponent)

export type { ChessboardRef }
export default ChessboardContainer
