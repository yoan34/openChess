import ThemedText from '@/components/ThemedText'
import EStyleSheet from '@/constants/Theme'
import { currentUserStore } from '@/stores'
import { useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { Pressable, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

function Openings () {
  const router = useRouter()
  return (
    <SafeAreaView style={styles.body}>
      <StatusBar style="dark"/>
      <View style={styles.container}>
        {currentUserStore.openings && currentUserStore.openings.docs.length > 0 ? (
          currentUserStore.openings.docs.map((doc) => (
            <Pressable key={doc.id}>
              <ThemedText>{doc.data.name || 'Unnamed Opening'}</ThemedText>
            </Pressable>
          ))
        ) : (
          <Pressable onPress={() => router.push('/play')} style={{ backgroundColor: 'yellow' }}>
            <ThemedText>Not openings, let's go find some!</ThemedText>
          </Pressable>
        )}
        <ThemedText variant="bigTitleTextStyle">HOMEPAGE</ThemedText>
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

export default Openings