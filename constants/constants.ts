import bb from '@/assets/chessboard/bb.png'
import bk from '@/assets/chessboard/bk.png'
import bn from '@/assets/chessboard/bn.png'
import bp from '@/assets/chessboard/bp.png'
import bq from '@/assets/chessboard/bq.png'
import br from '@/assets/chessboard/br.png'
import wb from '@/assets/chessboard/wb.png'
import wk from '@/assets/chessboard/wk.png'
import wn from '@/assets/chessboard/wn.png'
import wp from '@/assets/chessboard/wp.png'
import wq from '@/assets/chessboard/wq.png'
import wr from '@/assets/chessboard/wr.png'
import type { PiecesType } from '@/src/types'

const PIECES: PiecesType = {
  br,
  bp,
  bn,
  bb,
  bq,
  bk,
  wr,
  wn,
  wb,
  wq,
  wk,
  wp
}

const assets = Object.values(PIECES)

export { assets, PIECES }
