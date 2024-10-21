import ThemedText from '@/components/ThemedText'
import EStyleSheet from '@/constants/Theme'
import { MaterialIcons } from '@expo/vector-icons'
import AntDesign from '@expo/vector-icons/AntDesign'
import Ionicons from '@expo/vector-icons/Ionicons'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import React, { useState } from 'react'
import {
  View,
  TextInput,
  Pressable,
  type NativeSyntheticEvent,
  type TextInputFocusEventData
} from 'react-native'

interface InputProps {
  icon?: 'mail' | 'person' | 'lock' | 'none'
  label?: string
  placeholder?: string
  isPassword?: boolean
  value: string
  onChangeText: (text: string) => void
  onBlur: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void
  error: string | boolean | undefined
}

function Input ({
  icon,
  label,
  placeholder,
  value,
  onChangeText,
  onBlur,
  error,
  isPassword = false
}: InputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible)
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ThemedText variant="inputLabel">{label}</ThemedText>
      </View>
      {error && <ThemedText variant="formError">{error}</ThemedText>}
      <View style={[styles.inputContainer, error !== undefined && styles.inputContainerError]}>
        {icon === 'mail' && <Ionicons name="mail-outline" size={24} color={error ? 'red' : EStyleSheet.value('$textColorNormal')}/>}
        {icon === 'lock' &&
            <AntDesign name="lock" size={24} color={error ? 'red' : EStyleSheet.value('$textColorNormal')} style={styles.leftIcon}/>}
        {icon === 'person' &&
            <MaterialCommunityIcons name="account-circle-outline" size={24} color={error ? 'red' : EStyleSheet.value('$textColorNormal')}/>}
        <TextInput
          autoCapitalize='none'
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={error ? 'red' : EStyleSheet.value('$textColorNormal')}
          value={value}
          onChangeText={onChangeText}
          onBlur={onBlur}
          secureTextEntry={isPassword && !isPasswordVisible}
        />
        {isPassword && (
          <Pressable onPress={togglePasswordVisibility}>
            <MaterialIcons
              name={isPasswordVisible ? 'visibility' : 'visibility-off'}
              size={24}
              color={error ? 'red' : EStyleSheet.value('$textColorNormal')}
              style={styles.rightIcon}
            />
          </Pressable>
        )}
      </View>
    </View>
  )
}

const styles = EStyleSheet.create({
  container: {
    position: 'relative',
    width: '100%'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8
  },

  inputContainer: {
    position: 'relative',
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '$primaryColorBorder',
    borderRadius: 12,
    backgroundColor: '#3C1C56',
    padding: 12
  },
  inputContainerError: {
    borderColor: 'red'
  },
  input: {
    color: '$textColorNormal',
    fontSize: 14,
    flex: 1,
    paddingLeft: 8,
    fontFamily: 'UrbanistSemiBold'
  },
  leftIcon: {
    marginRight: 8
  },
  rightIcon: {
    marginLeft: 8
  }
})

export default Input