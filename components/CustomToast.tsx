import EStyleSheet from '@/constants/Theme'
import React from 'react'
import Toast, { BaseToast, ErrorToast, InfoToast, type ToastProps } from 'react-native-toast-message'

const toastConfig = {
  success: (props: ToastProps) => (
    <BaseToast
      {...props}
      style={[styles.baseStyle, styles.successStyle]}
      text1Style={styles.text1Style}
      text2Style={styles.text2Style}
      text1NumberOfLines={0}
      text2NumberOfLines={0}
    />
  ),
  error: (props: ToastProps) => (
    <ErrorToast
      {...props}
      style={[styles.baseStyle, styles.errorStyle]}
      text1Style={styles.text1Style}
      text2Style={styles.text2Style}
      text1NumberOfLines={0}
      text2NumberOfLines={0}
    />
  ),
  info: (props: ToastProps) => (
    <InfoToast
      {...props}
      style={[styles.baseStyle, styles.infoStyle]}
      text1Style={styles.text1Style}
      text2Style={styles.text2Style}
      text1NumberOfLines={0}
      text2NumberOfLines={0}
    />
  )
}

const styles = EStyleSheet.create({
  baseStyle: {
    borderLeftWidth: 8
  },
  successStyle: {
    borderLeftColor: 'green'
  },
  errorStyle: {
    borderLeftColor: 'red'
  },
  infoStyle: {
    borderLeftColor: '$primaryColor'
  },
  text1Style: {
    fontSize: 16,
    fontFamily: 'UrbanistBold',
    color: '#000'
  },
  text2Style: {
    fontSize: 14,
    fontFamily: 'UrbanistRegular',
    color: '#444'
  }
})

export default function CustomToast () {
  return <Toast config={toastConfig}/>
}
