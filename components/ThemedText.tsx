import { textStyles } from '@/constants/textStyles'
import React from 'react'
import { Text, type TextProps } from 'react-native'

export type Props = TextProps & {
  variant?: keyof typeof textStyles
}

function ThemedText ({ variant, style, ...rest }: Props) {
  return <Text style={[textStyles[variant ?? 'standard'], style]} {...rest}/>
}

export default ThemedText
