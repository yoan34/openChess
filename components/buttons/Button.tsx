import EStyleSheet from '@/constants/Theme'
import { Link, type LinkProps } from 'expo-router'
import React from 'react'
import { View, Pressable, type ViewStyle } from 'react-native'

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

function Button ({
  buttonStyle,
  applyPressStyle = false,
  children,
  ...rest
}: Props) {
  const renderButton = (pressedStyle?: ViewStyle) => {
    return (
      <View style={[styles.button, buttonStyle, pressedStyle]}>
        {children}
      </View>
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
    borderRadius: 50,
    backgroundColor: '$primaryColor'
  },
  buttonPressed: {
    backgroundColor: '#0044CC'
  }
})

export default Button
