import Chessboard from '@/components/chessboard'
import ThemedText from '@/components/ThemedText'
import EStyleSheet from '@/constants/Theme'
import { StatusBar } from 'expo-status-bar'
import React, { useState, useEffect } from 'react'
import { View, Pressable, StyleSheet, Dimensions } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Svg, { Line } from 'react-native-svg'

const { width } = Dimensions.get('window') // Largeur de l'écran
const squareSize = width / 8 // Taille d'une case

type ArrowCoordinates = {
  x1: number
  y1: number
  x2: number
  y2: number
}

const getCoordinatesFromSquare = (square: string) => {
  const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'] // Colonnes a-h
  const file = square[0] // Lettre de la colonne
  const rank = parseInt(square[1], 10) // Chiffre de la rangée (1-8)

  const x = files.indexOf(file) * squareSize // Position x
  const y = (8 - rank) * squareSize // Position y (inversée pour l'axe Y)

  return { x, y }
}

const calculateArrowCoordinates = (fromSquare:string, toSquare: string) => {
  const from = getCoordinatesFromSquare(fromSquare)
  const to = getCoordinatesFromSquare(toSquare)

  return {
    x1: from.x + squareSize / 2, // Centrer la flèche dans la case
    y1: from.y + squareSize / 2,
    x2: to.x + squareSize / 2,
    y2: to.y + squareSize / 2
  }
}

function Play () {
  const [arrowList, setArrowList] = useState([
    { from: 'e2', to: 'e4' },
    { from: 'g1', to: 'f3' },
    { from: 'b8', to: 'c6' }
  ])
  console.log(setArrowList)
  const [showArrows, setShowArrows] = useState(false)
  const [arrowCoordinatesList, setArrowCoordinatesList] = useState<ArrowCoordinates[]>([])
  useEffect(() => {
    const newArrowCoordinates = arrowList.map(({ from, to }) => calculateArrowCoordinates(from, to))
    setArrowCoordinatesList(newArrowCoordinates)
  }, [arrowList])

  const toggleArrows = () => {
    setShowArrows(!showArrows)
  }
  return (
    <SafeAreaView style={styles.body}>
      <StatusBar style="dark"/>
      <View style={styles.container}>
        <ThemedText variant="bigTitleTextStyle">DASHBOARD</ThemedText>
        <View style={styles.chessboardContainer}>
          <Chessboard colors={{ black: '#80728C', white: '#BFB8C5' }} startPosition='black'/>

          {showArrows && (
            <Svg style={StyleSheet.absoluteFill}>
              {arrowCoordinatesList.map((coords, index) => (
                <Line
                  key={index}
                  x1={coords.x1}
                  y1={coords.y1}
                  x2={coords.x2}
                  y2={coords.y2}
                  stroke="red"
                  strokeWidth="4"
                />
              ))}
            </Svg>
          )}
        </View>

        <Pressable onPress={toggleArrows} style={styles.toggleButton}>
          <ThemedText>{showArrows ? 'Hide Arrows' : 'Show Arrows'}</ThemedText>
        </Pressable>

      </View>
    </SafeAreaView>
  )
}

const styles = EStyleSheet.create({
  body: {
    flex: 1,
    width: '100%'
  },
  container: {
    flex: 1
  },
  chessboardContainer: {
    position: 'relative'
  },
  toggleButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#80728C',
    borderRadius: 5
  }
})

export default Play