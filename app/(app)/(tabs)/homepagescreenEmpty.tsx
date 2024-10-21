import HomepageEmptySVG from '@/assets/svg/homepageEmpty.svg'
import Button from '@/components/buttons/Button'
import ThemedText from '@/components/ThemedText'
import EStyleSheet from '@/constants/Theme'
import { router } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { SafeAreaView } from 'react-native-safe-area-context'

function HomepageScreenEmpty () {
  console.log('helo')
  return (
    <LinearGradient
      colors={[EStyleSheet.value('$primaryLGDark'), EStyleSheet.value('$primaryLGLight')]}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={styles.body}>
        <StatusBar style="light"/>
        <View style={styles.container}>
          <HomepageEmptySVG width={265} height={170}/>
          <View style={{ gap: 8 }}>
            <ThemedText variant='bigTitleTextStyle' style={{ textAlign: 'center', lineHeight: 30 }}>Let’s integrate your email account first</ThemedText>
            <ThemedText variant='normalTextStyle'>Integrate your email to be able use Postal</ThemedText>
          </View>
          <Button onPress={() => router.push('/(tabs)/homepage')}>
            <ThemedText variant='button'>Connect Email</ThemedText>
          </Button>
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
    flex: 1,
    width: '100%',
    alignItems: 'center',
    gap: 32,
    marginTop: 24,
    justifyContent: 'center',
    alignContent: 'center'
  },
  containerForm: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    gap: 24
  },
  containerInput: {
    width: '100%',
    gap: 24
  },
  backBtn: {
    width: 50,
    height: 50,
    borderRadius: 14,
    borderColor: 'rgba(255,255,255, 0.32)',
    borderWidth: 1
  }
})

export default HomepageScreenEmpty