import ThemedText from '@/components/ThemedText'
import EStyleSheet from '@/constants/Theme'
import React from 'react'
import { View } from 'react-native'

interface LoginHeaderProps {
  title: string
  subtitle: string
  emoji?: string
}

function LoginHeader ({ title, subtitle, emoji = '👋🏻' }: LoginHeaderProps) {
  return (
    <View style={styles.container}>
      <ThemedText variant="loginTitle">
        {title} {emoji && emoji}
      </ThemedText>
      <ThemedText variant="loginSubtitle">{subtitle}</ThemedText>
    </View>
  )
}

const styles = EStyleSheet.create({
  container: {
    width: '100%',
    gap: 8
  }
})

export default LoginHeader
