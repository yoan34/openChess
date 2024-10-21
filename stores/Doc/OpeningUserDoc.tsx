import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'
import { Document } from 'firestorter'

export type OpeningUserType = {
  senderId: string
  chatId: string
  content: string
  status: 'read' | 'unread' | 'unknown'
  createdAt: FirebaseFirestoreTypes.Timestamp
  file?: { uri: string; type: 'image' | 'video' }
}

export default class OpeningUser extends Document<MessageType> {

}
