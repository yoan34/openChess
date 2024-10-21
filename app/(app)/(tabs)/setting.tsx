import ThemedText from '@/components/ThemedText'
import EStyleSheet from '@/constants/Theme'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { SafeAreaView } from 'react-native-safe-area-context'

function Setting () {
  return (
    <LinearGradient
      colors={[EStyleSheet.value('$primaryLGDark'), EStyleSheet.value('$primaryLGLight')]}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={styles.body}>
        <StatusBar style="light"/>
        <View style={styles.container}>
          <ThemedText variant='bigTitleTextStyle'>SETTING</ThemedText>
        </View>
      </SafeAreaView>
    </LinearGradient>
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

export default Setting