import { PIECES } from '@/constants/constants'
import { useChessboardProps } from '@/src/context/props-context/hooks'
import type { PieceType } from '@/src/types'
import React from 'react'
import { Image, ImageProps } from 'react-native'

type ChessPieceType = {
  id: PieceType
} & Partial<ImageProps>

const ChessPiece: React.FC<ChessPieceType> = React.memo(({ id, ...rest }) => {
  const { pieceSize, renderPiece } = useChessboardProps()

  return (
    renderPiece?.(id) ?? (
      <Image
        style={[{ width: pieceSize, height: pieceSize }, rest.style]}
        {...rest}
        source={PIECES[id]}
      />
    )
  )
})

export { ChessPiece }
