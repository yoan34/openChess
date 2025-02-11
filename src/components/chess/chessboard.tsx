'use client'
import { Chessboard } from 'react-chessboard'
import { Chess, Square,  Move } from 'chess.js'
import { useState, useMemo, JSX } from 'react'

type CustomPieces = {
  [key: string]: ({ squareWidth }: { squareWidth: number }) => JSX.Element
}

type SquareStyles = {
  [square: string]: {
    background?: string
    borderRadius?: string
  }
}

export function CustomChessBoard() {
  const [game, setGame] = useState<Chess>(new Chess())
  const [moveFrom, setMoveFrom] = useState<Square | ''>('')
  const [optionSquares, setOptionSquares] = useState<SquareStyles>({})
  const [showSafeSquares, setShowSafeSquares] = useState<boolean>(false)
  const [safeSquares, setSafeSquares] = useState<SquareStyles>({})

  function safeGameMutate(modify: (game: Chess) => void): void {
    setGame((currentGame) => {
      const update = new Chess(currentGame.fen())
      modify(update)
      updateSafeSquares()
      return update
    })
  }

  function updateSafeSquares(): void {
    if (showSafeSquares) {
      setSafeSquares(findSafeSquares())
    } else {
      setSafeSquares({})
    }
  }

  function findSafeSquares(): SquareStyles {
    const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
    const ranks = ['1', '2', '3', '4', '5', '6', '7', '8']
    const allSquares = files.flatMap(file => ranks.map(rank => file + rank)) as Square[]

    const blackThreatenedSquares = new Set<Square>()
    const potentialWhiteSquares = new Set<Square>()

    allSquares.forEach(square => {
      const piece = game.get(square)
      if (piece && piece.color === 'b') {
        const moves = game.moves({ square, verbose: true })
        moves.forEach(move => blackThreatenedSquares.add(move.to as Square))
      }
    })

    allSquares.forEach(square => {
      const piece = game.get(square)
      if (piece && piece.color === 'w') {
        const moves = game.moves({ square, verbose: true })
        moves.forEach(move => {
          if (!blackThreatenedSquares.has(move.to as Square)) {
            potentialWhiteSquares.add(move.to as Square)
          }
        })
      }
    })

    const newSquares: SquareStyles = {}
    potentialWhiteSquares.forEach(square => {
      newSquares[square] = {
        background: 'rgba(0, 0, 255, 0.2)'
      }
    })

    return newSquares
  }

  function getMoveOptions(square: Square): SquareStyles | false {
    const moves = game.moves({
      square,
      verbose: true
    })
    if (moves.length === 0) {
      return false
    }

    const newSquares: SquareStyles = {}
    moves.forEach((move: Move) => {
      newSquares[move.to] = {
        background:
          game.get(move.to) && game.get(move.to)?.color !== game.get(square)?.color
            ? 'radial-gradient(circle, rgba(0,0,0,.1) 85%, transparent 85%)'
            : 'radial-gradient(circle, rgba(0,0,0,.1) 25%, transparent 25%)',
        borderRadius: '50%'
      }
    })
    newSquares[square] = {
      background: 'rgba(255, 255, 0, 0.4)'
    }
    return newSquares
  }

  function onPieceDragBegin(_piece: string, sourceSquare: Square): void {
    const squares = getMoveOptions(sourceSquare)
    if (squares) {
      setOptionSquares(squares)
    }
  }

  function onPieceDragEnd(): void {
    setOptionSquares({})
  }

  function onDrop(sourceSquare: Square, targetSquare: Square, piece: string): boolean {
    const gameCopy = new Chess(game.fen())
    const move = gameCopy.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: piece[1].toLowerCase() ?? 'q'
    })

    if (move) {
      setGame(gameCopy)
      setOptionSquares({})
      updateSafeSquares()
      return true
    }
    return false
  }

  function onSquareClick(square: Square): void {
    if (!moveFrom) {
      const squares = getMoveOptions(square)
      if (squares) {
        setMoveFrom(square)
        setOptionSquares(squares)
      }
      return
    }

    if (moveFrom === square) {
      setMoveFrom('')
      setOptionSquares({})
      return
    }

    const gameCopy = new Chess(game.fen())
    const move = gameCopy.move({
      from: moveFrom,
      to: square,
      promotion: 'q'
    })

    if (move === null) {
      const squares = getMoveOptions(square)
      if (squares) {
        setMoveFrom(square)
        setOptionSquares(squares)
      }
      return
    }

    setGame(gameCopy)
    setMoveFrom('')
    setOptionSquares({})
    updateSafeSquares()
  }

  function isDraggablePiece({ piece }: { piece: string }): boolean {
    return piece.startsWith(game.turn())
  }

  const pieces = ['wP', 'wN', 'wB', 'wR', 'wQ', 'wK', 'bP', 'bN', 'bB', 'bR', 'bQ', 'bK'] as const

  const customPieces = useMemo((): CustomPieces => {
    const pieceComponents: CustomPieces = {}
    pieces.forEach(piece => {
      pieceComponents[piece] = ({ squareWidth }: { squareWidth: number }) => (
        <div
          style={{
            width: squareWidth,
            height: squareWidth,
            backgroundImage: `url(/pieces/style1/${piece}.png)`,
            backgroundSize: '100%'
          }}
        />
      )
    })
    return pieceComponents
  }, [])

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Contrôles */}
      <div className="flex items-center space-x-2 mb-4">
        <input
          type="checkbox"
          id="safeSquares"
          checked={showSafeSquares}
          onChange={(e) => {
            setShowSafeSquares(e.target.checked)
            if (e.target.checked) {
              setSafeSquares(findSafeSquares())
            } else {
              setSafeSquares({})
            }
          }}
          className="h-4 w-4"
        />
        <label htmlFor="safeSquares" className="text-sm font-medium">
          Afficher les cases sûres pour les blancs
        </label>
      </div>

      {/* Échiquier */}
      <div className="w-96 h-96 md:w-[32rem] md:h-[32rem]">
        <Chessboard
          id="CustomBoard"
          boardOrientation="white"
          position={game.fen()}
          onPieceDrop={onDrop}
          onPieceDragBegin={onPieceDragBegin}
          onPieceDragEnd={onPieceDragEnd}
          onSquareClick={onSquareClick}
          isDraggablePiece={isDraggablePiece}
          customBoardStyle={{
            borderRadius: '4px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.5)'
          }}
          customDarkSquareStyle={{
            backgroundColor: '#779952'
          }}
          customLightSquareStyle={{
            backgroundColor: '#edeed1'
          }}
          customPieces={customPieces}
          customSquareStyles={{
            ...optionSquares,
            ...safeSquares
          }}
          showBoardNotation={true}
          animationDuration={200}
        />
      </div>

      {/* Boutons de contrôle */}
      <div className="flex space-x-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          onClick={() => {
            safeGameMutate((game) => {
              game.reset()
              setMoveFrom('')
              setOptionSquares({})
            })
          }}
        >
          Reset
        </button>

        <button
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
          onClick={() => {
            safeGameMutate((game) => {
              game.undo()
              setMoveFrom('')
              setOptionSquares({})
            })
          }}
        >
          Undo
        </button>
      </div>

      {/* Indicateur de tour */}
      <div className="text-lg font-semibold">
        Tour : {game.turn() === 'w' ? 'Blancs' : 'Noirs'}
      </div>
    </div>
  )
}