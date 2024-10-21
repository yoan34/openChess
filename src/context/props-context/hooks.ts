import { ChessboardPropsContext } from '@/src/context/props-context'
import { useContext } from 'react'

export const useChessboardProps = () => useContext(ChessboardPropsContext)
