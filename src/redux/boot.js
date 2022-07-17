import { store } from './store'
import { checkAuthorization } from './auth/action'

export default function Boot() {
  return new Promise(() => {
    store.dispatch(checkAuthorization())
  })
}