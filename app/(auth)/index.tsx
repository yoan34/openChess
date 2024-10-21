import FaceIDSVG from '@/assets/svg/faceID.svg'
import GoogleSVG from '@/assets/svg/google.svg'
import Button from '@/components/buttons/Button'
import DividerWithText from '@/components/DividerWithText'
import Input from '@/components/forms/Input'
import LoginHeader from '@/components/headers/LoginHeader'
import CustomModal from '@/components/sections/CustomModal'
import ThemedText from '@/components/ThemedText'
import EStyleSheet from '@/constants/Theme'
import { useCustomForm } from '@/hooks/useCustomForm'
import CurrentUserStore from '@/stores/CurrentUserStore'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import { router, Link, useLocalSearchParams } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { Formik } from 'formik'
import React, { useState } from 'react'
import { Pressable, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { SafeAreaView } from 'react-native-safe-area-context'

interface FormValues {
  email: string
  password: string
}

export type SignUpParamsType = {
  action?: 'signIn' | 'signUp'
}

function Sign () {
  const { action = 'signIn' } = useLocalSearchParams<{ action: 'signUp' | 'signIn' }>()
  const [checked, setChecked] = useState(false)
  const [onLoading, setOnLoading] = useState<boolean>(false)
  const [isModalVisible, setModalVisible] = useState(false)
  console.log(onLoading)
  const { handleCustomChange, handleCustomBlur } = useCustomForm()
  const toggleCheckbox = () => {
    setChecked(!checked)
  }
  const openModal = () => setModalVisible(true)
  const closeModal = () => {
    setModalVisible(false)
  }
  return (
    <LinearGradient
      colors={[EStyleSheet.value('$primaryLGDark'), EStyleSheet.value('$primaryLGLight')]}
      style={styles.gradient}
    >
      <SafeAreaView style={styles.body}>
        <StatusBar style="light"/>
        <View style={styles.container}>
          <LoginHeader
            title={action === 'signIn' ? 'Welcome Back' : 'Getting started'}
            subtitle={action === 'signIn' ? 'Enter your email & password to login   ' : 'Create an account to start the app'}
            emoji=''
          />
          <Formik
            initialValues={{ email: '', password: '' } satisfies FormValues}
            validate={(values: FormValues) => {
              const errors: { email?: string; password?: string; phone?: string } = {}
              if (!values.email) {
                errors.email = 'Email is required'
              } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                errors.email = 'Invalid email address'
              }

              if (!values.password) {
                errors.password = 'Password is required'
              } else if (values.password.length < 6) {
                errors.password = 'Password must be at least 6 characters long'
              }
              return errors
            }}
            onSubmit={async (values) => {
              setOnLoading(true)
              let isAuthenticated = false
              try {
                if (action === 'signIn') {
                  isAuthenticated = await CurrentUserStore.signInWithEmail({
                    email: values.email,
                    password: values.password
                  })
                  if (isAuthenticated) {
                    openModal()
                  }
                } else {
                  await CurrentUserStore.signUpWithEmail({
                    email: values.email,
                    password: values.password
                  })
                }
              } catch (e) {
                console.log(e)
              } finally {
                setOnLoading(false)
              }
            }}
          >
            {({ handleBlur, handleSubmit, setFieldValue, setErrors, values, errors, touched }) => {
              const handleEmailChange = handleCustomChange('email', setFieldValue, setErrors, errors)
              const handlePasswordChange = handleCustomChange('password', setFieldValue, setErrors, errors)

              const handleEmailBlur = handleCustomBlur('email', handleBlur)
              const handlePasswordBlur = handleCustomBlur('password', handleBlur)

              return (
                <View style={styles.containerForm}>
                  <Input
                    label="Email"
                    icon="mail"
                    placeholder="Enter your email"
                    error={touched.email && errors.email}
                    value={values.email}
                    onChangeText={handleEmailChange}
                    onBlur={handleEmailBlur}
                  />
                  <Input
                    label="Password"
                    icon="lock"
                    placeholder="Enter your password"
                    isPassword={true}
                    error={touched.password && errors.password}
                    value={values.password}
                    onChangeText={handlePasswordChange}
                    onBlur={handlePasswordBlur}
                  />
                  {action === 'signIn' && (
                    <View style={styles.forgotPassword}>
                      <Pressable onPress={toggleCheckbox} style={styles.checkboxContainer}>
                        <View style={[styles.checkbox]}>
                          {checked && <FontAwesome6 name="check" size={14} color='#FF8640'/>}
                        </View>
                        <ThemedText variant='normalTextStyle'>Remember Me</ThemedText>
                      </Pressable>
                      <Link href='/forgotPassword'>
                        <ThemedText variant='forgotPassword'>Forgot Password?</ThemedText>
                      </Link>
                    </View>
                  )}
                  <Button onPress={handleSubmit}>
                    <ThemedText variant='button'>{action === 'signIn' ? 'Sign In' : 'Sign Up'}</ThemedText>
                  </Button>
                  <DividerWithText title='or login with'/>
                  <Button onPress={async () => await CurrentUserStore.signInWithGoogle()} buttonStyle={styles.googleBtn}>
                    <GoogleSVG width={24} height={24} style={{ marginRight: 10 }}/>
                    <ThemedText variant='button'>Google</ThemedText>
                  </Button>
                  <View style={styles.containerLink}>
                    <ThemedText
                      variant="boldTextStyle">{action === 'signIn' ? 'Don\'t have an account?' : 'Have an account?'}</ThemedText>
                    <Pressable
                      onPress={() => router.setParams({ action: action === 'signIn' ? 'signUp' : 'signIn' } satisfies SignUpParamsType)}>
                      <ThemedText variant="signLink">{action === 'signIn' ? 'Create an account' : 'Sign in'}</ThemedText>
                    </Pressable>
                  </View>
                </View>
              )
            }}
          </Formik>
        </View>
        <CustomModal
          isVisible={isModalVisible}
          onClose={closeModal}
        >
          <View style={styles.faceID}>
            <View style={{ paddingVertical: 24 }}>
              <FaceIDSVG width={58} height={58}/>
            </View>
            <ThemedText variant='bigTitleTextStyle'>Configure Face ID</ThemedText>
            <ThemedText variant='normalTextStyle' style={{ textAlign: 'center' }}>
              Face ID allows you to conveniently and it keep your email secure
            </ThemedText>
          </View>
          <View style={styles.containerBtn}>
            <Button onPress={() => router.push('/(tabs)/homepagescreenEmpty')}>
              <ThemedText variant='button'>Enable Face ID</ThemedText>
            </Button>
            <Link href='/sign'>
              <ThemedText variant='skipForLater'>Skip for later</ThemedText>
            </Link>
          </View>
        </CustomModal>
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
    gap: 40,
    marginTop: 48
  },
  containerForm: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    gap: 24
  },
  gradient: {
    flex: 1
  },
  googleBtn: {
    flexDirection: 'row',
    backgroundColor: '$primaryDarkColor',
    elevation: 0
  },
  containerLink: {
    marginTop: 40,
    flexDirection: 'row',
    gap: 4
  },
  forgotPassword: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  checkbox: {
    width: 24,
    height: 24,
    backgroundColor: '#492766',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: '#FF8640'
  },
  faceID: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 44,
    gap: 8
  },
  containerBtn: {
    width: '100%',
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 24,
    marginTop: 24
  }
})

export default Sign
