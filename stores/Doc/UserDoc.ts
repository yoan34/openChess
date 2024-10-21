import { Document } from 'firestorter'

export type UserType = {
  name: string
}
export default class UserDoc extends Document<UserType> {

}