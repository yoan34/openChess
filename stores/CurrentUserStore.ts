import UserDoc, { type UserType } from '@/stores/Doc/UserDoc'
import auth, { type FirebaseAuthTypes } from '@react-native-firebase/auth'
import { action, makeObservable, observable, runInAction } from 'mobx'
import Toast from 'react-native-toast-message'

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
    } catch (e) {
      if ((e as FirebaseAuthTypes.NativeFirebaseAuthError).code) {
        const error = e as FirebaseAuthTypes.NativeFirebaseAuthError
        let code = error.code
        if (code === 'auth/user-not-found') {
          code = 'auth/email-not-found'
        }
        console.log('Error code', code)
        // showError(code)
      }
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