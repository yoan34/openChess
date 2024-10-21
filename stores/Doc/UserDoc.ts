import OpeningUser from '@/stores/Doc/OpeningUserDoc'
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'
import { Collection, Document } from 'firestorter'

export type UserType = {
  name: string
}
export default class UserDoc extends Document<UserType> {
  private _openings?: Collection<OpeningUser>

  get openings () {
    if (this._openings) return this._openings

    this._openings = new Collection<OpeningUser>(`${this.ref?.path}/openings`, {
      createDocument: (source, options) => new OpeningUser(source, options),
      query: (ref: FirebaseFirestoreTypes.CollectionReference) => {
        return ref.orderBy('createdAt', 'asc')
      }
    })

    return this._openings
  }
}