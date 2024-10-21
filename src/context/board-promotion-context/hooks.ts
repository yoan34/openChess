import { BoardPromotionContext } from '@/src/context/board-promotion-context'
import { useContext } from 'react'

const useBoardPromotion = () => useContext(BoardPromotionContext)

export { useBoardPromotion, BoardPromotionContext }
