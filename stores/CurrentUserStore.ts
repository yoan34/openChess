import UserDoc, { type UserType } from '@/stores/Doc/UserDoc'
import auth, { type FirebaseAuthTypes } from '@react-native-firebase/auth'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { action, makeObservable, observable, runInAction } from 'mobx'
import Toast from 'react-native-toast-message'

GoogleSignin.configure({
  webClientId: 'xxxx'
})
export default class CurrentUserStore extends UserDoc {
  currentUser: FirebaseAuthTypes.User | null = null

  constructor () {
    super()
    this.currentUser = auth().currentUser
    void this.observeAuth()

    makeObservable(this, {
      currentUser: observable,
      // hideSplashScreen: computed,
      updateUser: action
    })
  }

  static async signInWithEmail ({
    email,
    password
  }: { email: string; password: string }) {
    try {
      await auth().signInWithEmailAndPassword(email, password)
      console.log('is connect')
      return true
    } catch (e) {
      if ((e as FirebaseAuthTypes.NativeFirebaseAuthError).code) {
        const error = e as FirebaseAuthTypes.NativeFirebaseAuthError
        let title = ''
        let message = ''
        if (error.code === 'auth/invalid-credential') {
          title = 'Invalid Credentials'
          message = 'The email or password you entered is incorrect'
        }
        Toast.show({
          type: 'error',
          text1: title,
          text2: message
        })
        console.log('Error code', error.code)
      }
      return false
    }
  }

  static async signUpWithEmail ({
    email,
    password
  }: { email: string; password: string }) {
    try {
      await auth().createUserWithEmailAndPassword(email, password)
    } catch (e) {
      if ((e as FirebaseAuthTypes.NativeFirebaseAuthError).code) {
        // const error = e as FirebaseAuthTypes.NativeFirebaseAuthError
        // showError(error.code)
      }
    }
  }

  static async resetPassword ({
    email
  }: { email: string }) {
    console.log('in reset password')
    try {
      await auth().sendPasswordResetEmail(email)
      Toast.show({
        type: 'info',
        text1: 'Reset Password',
        text2: 'Password reset email sent. Check your inbox.'
      })
    } catch (e) {
      if ((e as FirebaseAuthTypes.NativeFirebaseAuthError).code) {
        // const error = e as FirebaseAuthTypes.NativeFirebaseAuthError
        // let code = error.code
        // if (code === 'auth/user-not-found') {
        //   code = 'auth/email-not-found'
        // }
        // showError(code)
      }
    }
  }

  static async signInWithGoogle () {
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true })
      const tokenData = await GoogleSignin.signIn()
      if (tokenData.data?.idToken) {
        const googleCredential = auth.GoogleAuthProvider.credential(tokenData.data.idToken)
        await auth().signInWithCredential(googleCredential)
        Toast.show({ type: 'success', text1: 'Successfully signed in with Google' })
      }
    } catch (error) {
      if (error instanceof Error) {
        Toast.show({ type: 'error', text1: 'Google sign-in error', text2: error.message })
      } else {
        Toast.show({ type: 'error', text1: 'Facebook sign-in error', text2: 'Unknown error' })
      }
      console.log(error)
    }
  }

  static async logout () {
    console.log('Logout')
    await auth().signOut()
    return null
  }

  async observeAuth () {
    if (this.currentUser) {
      try {
        await this.currentUser.reload()
      } catch (e) {
        if ((e as FirebaseAuthTypes.NativeFirebaseAuthError).code) {
          const error = e as FirebaseAuthTypes.NativeFirebaseAuthError
          if (error.code === 'auth/user-not-found') {
            console.log('Account deleted')
          } else if (error.code === 'auth/no-current-user') {
            console.log('User logout')
          }
        } else {
          console.warn(e)
        }
      }
    }
    auth().onAuthStateChanged((user) => {
      this.onAuthStateChanged(user)
    })
  }

  async updateUser (user: Partial<UserType>) {
    await this.update({
      user
    })
  }

  private onAuthStateChanged (user: FirebaseAuthTypes.User | null) {
    runInAction(() => {
      if (!user) {
        this.currentUser = null
        this.path = undefined
      } else {
        this.currentUser = user
        this.path = `users/${user.uid}`
      }
    })
  }
}