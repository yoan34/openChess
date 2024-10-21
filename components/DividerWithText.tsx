import ThemedText from '@/components/ThemedText'
import EStyleSheet from '@/constants/Theme'
import React from 'react'
import { View } from 'react-native'

type Props = {
  title: string
}

function DividerWithText ({ title }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.line}/>
      <ThemedText variant="normalTextStyle">{title}</ThemedText>
      <View style={styles.line}/>
    </View>
  )
}

const styles = EStyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
    gap: 24
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '$primaryColorBorder'
  }
})

export default DividerWithText
