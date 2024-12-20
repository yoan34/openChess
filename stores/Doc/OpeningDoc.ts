import { Document, Collection } from 'firestorter'
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'

export type OpeningType = {
  name: string
  moves: string[]  // Liste des coups sous forme de notations
  userId: string   // ID de l'utilisateur qui a créé l'opening
  createdAt: FirebaseFirestoreTypes.Timestamp
}

export default class OpeningDoc extends Document<OpeningType> {

}
