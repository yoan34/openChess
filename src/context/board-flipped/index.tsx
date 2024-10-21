import React, { createContext, useCallback, useContext, useMemo, useState } from 'react'

// Définition du type pour le contexte
type StartPositionContextType = {
  startPosition: 'white' | 'black';
  setStartPosition: (position: 'white' | 'black') => void;
};

const StartPositionContext = createContext<StartPositionContextType | undefined>(undefined)

const StartPositionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [startPosition, setStartPositionState] = useState<'white' | 'black'>('white')

  const setStartPosition = useCallback((position: 'white' | 'black') => {
    setStartPositionState(position)
  }, [])

  const value = useMemo(
    () => ({
      startPosition,
      setStartPosition
    }),
    [startPosition, setStartPosition]
  )

  return (
    <StartPositionContext.Provider value={value}>
      {children}
    </StartPositionContext.Provider>
  )
}

const useStartPosition = (): StartPositionContextType => {
  const context = useContext(StartPositionContext)
  if (!context) {
    throw new Error('useStartPosition must be used within a StartPositionProvider')
  }
  return context
}

export { StartPositionContext, StartPositionProvider, useStartPosition }
