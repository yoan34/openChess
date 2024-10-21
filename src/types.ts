/* eslint-disable no-undef */

import type { Chess, Square } from 'chess.js'

type Player = ReturnType<Chess['turn']>
type Type = 'q' | 'r' | 'n' | 'b' | 'k' | 'p'
type PieceType = `${Player}${Type}`

type PiecesType = Record<PieceType, ReturnType<typeof require>>
type Vector<T = number> = {
  x: T
  y: T
}

type ChessMove = {
  from: Square
  to: Square
}

type MoveType = { from: Square; to: Square }

export type {
  Player,
  Type,
  PieceType,
  PiecesType,
  Vector,
  ChessMove,
  MoveType
}
