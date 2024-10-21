import ThemedText from '@/components/ThemedText'
import EStyleSheet from '@/constants/Theme'
import { ReactNativeZoomableView } from '@openspacelabs/react-native-zoomable-view'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Svg, { Circle, Line, Text } from 'react-native-svg'

const openingsGraph = [
  { id: 'e2e4', x: 50, y: 50, label: 'e2e4' },
  { id: 'e7e5', x: 150, y: 50, label: 'e7e5' },
  { id: 'g1f3', x: 250, y: 100, label: 'g1f3' },
  { id: 'b8c6', x: 350, y: 150, label: 'b8c6' },
  { id: 'f1c4', x: 450, y: 200, label: 'f1c4' },
  { id: 'f8c5', x: 550, y: 250, label: 'f8c5' },
  { id: 'c2c3', x: 600, y: 300, label: 'c2c3' },
  { id: 'g8f6', x: 400, y: 300, label: 'g8f6' },
  { id: 'd2d4', x: 200, y: 350, label: 'd2d4' },
  { id: 'e4d5', x: 50, y: 400, label: 'e4d5' },
  { id: 'd7d5', x: 150, y: 450, label: 'd7d5' },
  { id: 'd1d4', x: 250, y: 500, label: 'd1d4' },
  { id: 'e8g8', x: 350, y: 550, label: 'e8g8' },
  { id: 'a7a6', x: 450, y: 600, label: 'a7a6' },
  { id: 'c1f4', x: 500, y: 650, label: 'c1f4' },
  { id: 'h7h6', x: 300, y: 600, label: 'h7h6' },
  { id: 'g2g4', x: 150, y: 550, label: 'g2g4' },
  { id: 'b1c3', x: 50, y: 500, label: 'b1c3' },
  { id: 'f6g4', x: 350, y: 450, label: 'f6g4' },
  { id: 'h2h3', x: 450, y: 400, label: 'h2h3' },
  { id: 'a2a3', x: 550, y: 350, label: 'a2a3' },
  { id: 'c7c5', x: 600, y: 300, label: 'c7c5' },
  { id: 'd8h4', x: 500, y: 250, label: 'd8h4' },
  { id: 'c5c4', x: 400, y: 200, label: 'c5c4' },
  { id: 'f4f5', x: 300, y: 150, label: 'f4f5' },
  { id: 'g3g4', x: 200, y: 100, label: 'g3g4' },
  { id: 'd3d4', x: 100, y: 50, label: 'd3d4' },
  { id: 'h1h2', x: 50, y: 150, label: 'h1h2' },
  { id: 'a8a7', x: 100, y: 250, label: 'a8a7' },
  { id: 'g1h3', x: 200, y: 300, label: 'g1h3' },
  { id: 'h3h4', x: 300, y: 350, label: 'h3h4' },
  { id: 'a2b4', x: 400, y: 400, label: 'a2b4' },
  { id: 'f2f3', x: 500, y: 450, label: 'f2f3' },
  { id: 'e5e6', x: 600, y: 500, label: 'e5e6' },
  { id: 'b7b5', x: 650, y: 550, label: 'b7b5' },
  { id: 'c6c7', x: 700, y: 600, label: 'c6c7' },
  { id: 'g6g7', x: 750, y: 550, label: 'g6g7' },
  { id: 'f6e7', x: 700, y: 500, label: 'f6e7' },
  { id: 'c1b2', x: 650, y: 450, label: 'c1b2' },
  { id: 'h2g3', x: 600, y: 400, label: 'h2g3' },
  { id: 'd2d3', x: 550, y: 350, label: 'd2d3' },
  { id: 'e7e8', x: 500, y: 300, label: 'e7e8' },
  { id: 'f8f7', x: 450, y: 250, label: 'f8f7' },
  { id: 'b1b3', x: 400, y: 200, label: 'b1b3' },
  { id: 'a2a4', x: 350, y: 150, label: 'a2a4' },
  { id: 'e8f6', x: 300, y: 100, label: 'e8f6' },
  { id: 'g2g5', x: 250, y: 50, label: 'g2g5' },
  { id: 'f5f6', x: 200, y: 100, label: 'f5f6' },
]

const OpeningMap = () => {
  return (
    <ReactNativeZoomableView
      maxZoom={2.5}
      minZoom={0.8}
      zoomStep={0.5}
      initialZoom={1}
      bindToBorders={true}
      style={{ flex: 1 }}
    >
      <Svg height="500" width="500">
        {openingsGraph.map((node, index) => (
          <React.Fragment key={node.id}>
            <Circle cx={node.x} cy={node.y} r={20} fill="blue"/>
            <Text x={node.x} y={node.y} fontSize="10" fill="white" textAnchor="middle" dy=".3em">
              {node.label}
            </Text>
            {index > 0 && (
              <Line
                x1={openingsGraph[index - 1].x}
                y1={openingsGraph[index - 1].y}
                x2={node.x}
                y2={node.y}
                stroke="black"
                strokeWidth="2"
              />
            )}
          </React.Fragment>
        ))}
      </Svg>
    </ReactNativeZoomableView>
  )
}

function Homepage () {
  return (

    <SafeAreaView style={styles.body}>
      <StatusBar style="light"/>
      <View style={styles.container}>
        <ThemedText variant="bigTitleTextStyle">HOMEPAGE</ThemedText>
        <OpeningMap/>
      </View>
    </SafeAreaView>
  )
}

const styles = EStyleSheet.create({
  body: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 24
  },
  container: {
    flex: 1
  }
})

export default Homepage