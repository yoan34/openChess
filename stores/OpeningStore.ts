import { action, makeObservable, observable, runInAction } from 'mobx'
import { Collection } from 'firestorter'
import OpeningDoc, { type OpeningType } from '@/stores/Doc/OpeningDoc'
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'

export default class OpeningStore {
  openingsCollection: Collection<OpeningDoc>

  constructor () {
    this.openingsCollection = new Collection('openings', {
      createDocument: (source, options) => new OpeningDoc(source, options)
    })

    makeObservable(this, {
      createOpening: action,
    })
  }

  async createOpening (opening: Partial<OpeningType>) {
    try {
      const newOpening = {
        ...opening,
        createdAt: FirebaseFirestoreTypes.Timestamp.now()
      }

      const openingDoc = await this.openingsCollection.add(newOpening)
      console.log('Opening créé avec succès')

      return openingDoc
    } catch (error) {
      console.error('Erreur lors de la création de l\'opening:', error)
      throw error
    }
  }

  // Fonction Firestore pour récupérer une opening par ID (ne touche pas MobX)
  async fetchOpeningById (openingId: string): Promise<OpeningDoc | null> {
    try {
      const openingDoc = new OpeningDoc(`openings/${openingId}`)

      await openingDoc.fetch() // Récupère le document depuis Firestore

      if (!openingDoc.exists) {
        console.log(`Opening avec l'ID ${openingId} n'existe pas.`)
        return null
      }

      return openingDoc
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'opening:', error)
      throw error
    }
  }

}
