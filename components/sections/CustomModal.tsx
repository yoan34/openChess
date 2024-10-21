import ThemedText from '@/components/ThemedText'
import EStyleSheet from '@/constants/Theme'
import { observer } from 'mobx-react-lite'
import React, { ReactNode } from 'react'
import { View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Modal from 'react-native-modal'

interface CustomModalProps {
  isVisible: boolean
  title?: string
  onClose: () => void
  children: ReactNode
}

function CustomModal ({ isVisible, onClose, title, children }: CustomModalProps) {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      style={styles.modal}
      backdropOpacity={0.6}
    >
      <LinearGradient
        colors={[EStyleSheet.value('$primaryLGDark'), EStyleSheet.value('$primaryLGLight')]}
        style={{ borderTopLeftRadius: 24,borderTopRightRadius: 24, paddingBottom: 42 }}
        >
        <View style={styles.container}>
          <View style={styles.topDecoration}>
          </View>
          <View style={styles.header}>
            {title && (
              <View style={styles.title}>
                <ThemedText variant='profileModalTitle'>{title}</ThemedText>
              </View>
            )}
          </View>
          <View style={styles.content}>
            {children}
          </View>
        </View>
      </LinearGradient>
    </Modal>
  )
}

const styles = EStyleSheet.create({
  header: {
    width: '100%',
    position: 'absolute',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'space-between',
    top: 0
  },
  modal: {
    position: 'relative',
    justifyContent: 'flex-end',
    margin: 0
  },
  title: {

  },
  container: {
    alignItems: 'center'
  },
  topDecoration: {
    position: 'absolute',
    top: -20,
    left: '50%',
    marginLeft: -50
  },
  closeButton: {
    position: 'absolute',
    top: -10,
    left: 0,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1
  },

  content: {
    marginTop: 40,
    width: '100%',
    gap: 16
  }
})

export default observer(CustomModal)