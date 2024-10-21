import { currentUserStore } from '@/stores'
import { Redirect, Slot } from 'expo-router'
import { observer } from 'mobx-react-lite'

function AuthLayout () {
  console.log('AuthLayout')
  if (currentUserStore.currentUser) {
    return (
      <Redirect href='/(app)/(tabs)/openings'/>
    )
  }

  return (
    <Slot/>
  )
}

export default observer(AuthLayout)