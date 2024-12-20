import CurrentUserStore from '@/stores/CurrentUserStore'
import OpeningStore from '@/stores/OpeningStore'

const currentUserStore = new CurrentUserStore()
const openingStore = new OpeningStore()

export {
  currentUserStore,
  openingStore
}
