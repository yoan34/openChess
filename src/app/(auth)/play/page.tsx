import { CustomChessBoard } from '@/components/chess/chessboard'

export default function Page () {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-8">Play Chess</h1>
      <CustomChessBoard/>
    </main>
  )
}