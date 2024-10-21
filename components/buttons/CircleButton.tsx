import EStyleSheet from '@/constants/Theme'
import React from 'react'
import { Pressable, ViewStyle, PressableProps } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

function CircleButton({ children, style, onPress, ...rest }: CircleButtonProps) {
  return (
    <LinearGradient style={styles.gradient} colors={[EStyleSheet.value('$secondaryLGDark'), EStyleSheet.value('$secondaryLGLight')]}>
      <Pressable onPress={onPress} style={[styles.button, style]} {...rest}>
        {children}
      </Pressable>
    </LinearGradient>

)
}

interface CircleButtonProps extends PressableProps {
  children: React.ReactNode
  style?: ViewStyle | ViewStyle[]
  onPress: () => void
}

const styles = EStyleSheet.create({
  gradient: {
    width: 56,
    height: 56,
    borderRadius: 28
  },
  button: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '$primaryShadowColor',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.24,
    shadowRadius: 16,
    elevation: 10
  }
})

export default CircleButton
