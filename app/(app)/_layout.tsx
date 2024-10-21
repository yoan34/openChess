import { currentUserStore } from '@/stores'
import { Redirect, Slot } from 'expo-router'
import { observer } from 'mobx-react-lite'

function AppLayout () {
  console.log('AppLayout')
  if (!currentUserStore.currentUser) {
    return (
      <Redirect href='/(auth)/sign'/>
    )
  }

  return (
    <Slot/>
  )
}

export default observer(AppLayout)