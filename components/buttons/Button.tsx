import EStyleSheet from '@/constants/Theme'
import { Link, type LinkProps } from 'expo-router'
import React from 'react'
import { View, Pressable, type ViewStyle } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

type BasePropsType = {
  buttonStyle?: ViewStyle
  applyPressStyle?: boolean
  children?: React.ReactNode
}

type RouteType = BasePropsType & {
  route: LinkProps<string>['href']
}

type PressType = BasePropsType & {
  onPress: () => void
}

type Props = RouteType | PressType

function Button({
   buttonStyle,
   applyPressStyle = false,
   children,
   ...rest
 }: Props) {
  const renderButton = (pressedStyle?: ViewStyle) => {
    if (buttonStyle) {
      return (
        <View style={[styles.button, buttonStyle, pressedStyle]}>
          {children}
        </View>
      )
    }

    return (
      <LinearGradient
        colors={[EStyleSheet.value('$secondaryLGDark'), EStyleSheet.value('$secondaryLGLight')]}
        style={[styles.button, pressedStyle]}
      >
        {children}
      </LinearGradient>
    )
  }

  const content = ({ pressed }: { pressed: boolean }) =>
    renderButton(applyPressStyle && pressed ? styles.buttonPressed as ViewStyle : undefined)

  if ('route' in rest) {
    return (
      <Link href={rest.route} asChild>
        <Pressable style={styles.container}>
          {content}
        </Pressable>
      </Link>
    )
  } else {
    return (
      <Pressable style={styles.container} onPress={rest.onPress}>
        {content}
      </Pressable>
    )
  }
}

const styles = EStyleSheet.create({
  container: {
    width: '100%'
  },
  button: {
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    borderRadius: 16,
    shadowColor: '$primaryShadowColor',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.24,
    shadowRadius: 16,
    elevation: 0
  },
  buttonPressed: {
    backgroundColor: '#0044CC'
  }
})

export default Button
