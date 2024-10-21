import UrbanistBlack from '@/assets/fonts/Urbanist-Black.ttf'
import UrbanistBold from '@/assets/fonts/Urbanist-Bold.ttf'
import UrbanistExtraBold from '@/assets/fonts/Urbanist-ExtraBold.ttf'
import UrbanistMedium from '@/assets/fonts/Urbanist-Medium.ttf'
import UrbanistRegular from '@/assets/fonts/Urbanist-Regular.ttf'
import UrbanistSemiBold from '@/assets/fonts/Urbanist-SemiBold.ttf'
import Urbanist from '@/assets/fonts/Urbanist-VariableFont_wght.ttf'
import CustomToast from '@/components/CustomToast'
import firebase from '@react-native-firebase/app'
import { useFonts } from 'expo-font'
import '@react-native-firebase/firestore'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { initFirestorter, makeCompatContext } from 'firestorter'
import { useEffect } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

try {
  console.log('init firebase')
  // @ts-expect-error 'Known error of typing in firestorter package'
  initFirestorter(makeCompatContext({ firebase }))
} catch (e) {}

export default function RootLayout () {
  console.log('RootLayout')
  const [fontsLoaded] = useFonts({
    Urbanist,
    UrbanistSemiBold,
    UrbanistRegular,
    UrbanistMedium,
    UrbanistBold,
    UrbanistBlack,
    UrbanistExtraBold
  })
  // useEffect(() => {
  //   if (firebase.apps.length !== 0) {
  //     // @ts-expect-error 'Known error of typing in firestorter package'
  //     initFirestorter(makeCompatContext({ firebase }))
  //   }
  // }, [])
  useEffect(() => {
    async function hideSplashScreen () {
      if (fontsLoaded) {
        await SplashScreen.hideAsync()
      }
    }

    void hideSplashScreen()
  }, [fontsLoaded])

  if (!fontsLoaded) {
    return null
  }

  return (
    <GestureHandlerRootView>
      <Stack screenOptions={{ headerShown: false }}/>
      <CustomToast/>
    </GestureHandlerRootView>
  )
}
