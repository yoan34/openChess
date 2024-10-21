import Button from '@/components/buttons/Button'
import Input from '@/components/forms/Input'
import LoginHeader from '@/components/headers/LoginHeader'
import ThemedText from '@/components/ThemedText'
import EStyleSheet from '@/constants/Theme'
import CurrentUserStore from '@/stores/CurrentUserStore'
import Feather from '@expo/vector-icons/Feather'
import { useFocusEffect, useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { Formik, type FormikErrors, type FormikProps } from 'formik'
import React from 'react'
import { View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { SafeAreaView } from 'react-native-safe-area-context'

interface FormValues {
  email: string
}

function ForgotPassword () {
  const initialValues: FormValues = {
    email: ''
  }
  const router = useRouter()

  const handleCustomChange = (
    field: keyof FormValues,
    setFieldValue: FormikProps<FormValues>['setFieldValue'],
    setErrors: FormikProps<FormValues>['setErrors'],
    errors: FormikProps<FormValues>['errors']
  ) => (text: string) => {
    setErrors({ ...errors, [field]: undefined })
    void setFieldValue(field, text)
  }

  const handleCustomBlur = (
    field: keyof FormValues,
    handleBlur: FormikProps<FormValues>['handleBlur']
  ) => () => {
    handleBlur(field)
  }
  const handleForgotPasswordPress = (handleSubmit: FormikProps<FormValues>['handleSubmit'], errors: FormikErrors<FormValues>) => {
    handleSubmit()
  }
  return (
    <LinearGradient
      colors={[EStyleSheet.value('$primaryLGDark'), EStyleSheet.value('$primaryLGLight')]}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={styles.body}>
        <StatusBar style="light"/>
        <View style={styles.container}>
          <Button onPress={() => {router.back()}} buttonStyle={styles.backBtn}>
            <Feather name="arrow-left" size={24} color='white'/>
          </Button>
          <LoginHeader
            title="Forgot Password"
            subtitle="Enter your email we will send a passcode reset"
            emoji=""
          />
          <Formik
            initialValues={initialValues}
            validate={(values: FormValues) => {
              const errors: { email?: string } = {}
              if (!values.email) {
                errors.email = 'Email is required'
              } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                errors.email = 'Invalid email address'
              }
              return errors
            }}
            onSubmit={async (values) => {
              try {
                await CurrentUserStore.resetPassword({ email: values.email })
                router.navigate('/(auth)/sign')
              } catch (e) {
                console.log('not work', e)
              }
            }}
          >
            {({ handleBlur, handleSubmit, setFieldValue, setErrors, values, errors, touched, resetForm }) => {
              useFocusEffect(
                React.useCallback(() => {
                  resetForm()
                }, [resetForm])
              )
              const handleEmailChange = handleCustomChange(
                'email',
                setFieldValue,
                setErrors,
                errors
              )

              const handleEmailBlur = handleCustomBlur('email', handleBlur)
              return (
                <View style={styles.containerForm}>
                  <View style={styles.containerInput}>
                    <Input
                      label="Email"
                      icon="mail"
                      placeholder="Enter your email"
                      error={touched.email && errors.email}
                      value={values.email}
                      onChangeText={handleEmailChange}
                      onBlur={handleEmailBlur}
                    />
                  </View>

                  <Button onPress={() => {handleForgotPasswordPress(handleSubmit, errors)}}>
                    <ThemedText variant='button'>Send reset Password</ThemedText>
                  </Button>
                </View>
              )
            }}
          </Formik>

        </View>
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
    gap: 32,
    marginTop: 24
  },
  containerForm: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    gap: 24
  },
  containerInput: {
    width: '100%',
    gap: 24
  },
  backBtn: {
    width: 50,
    height: 50,
    borderRadius: 14,
    borderColor: 'rgba(255,255,255, 0.32)',
    borderWidth: 1
  }
})

export default ForgotPassword