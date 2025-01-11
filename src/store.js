import { legacy_createStore as createStore } from 'redux'

const initialState = {
  sidebarShow: true,
  theme: 'light',
  loggedInUser: {
    loggedIn: false,
    pubkey: 'defaultPk1',
    npub: '',
  },
  profileBeingViewed: {
    selected: false,
    pubkey: 'defaultPk2',
    npub: '',
  },
}

const changeState = (state = initialState, { type, ...rest }) => {
  console.log(`redux store reset initialState`)
  switch (type) {
    case 'set':
      return { ...state, ...rest }
    default:
      return state
  }
}

const store = createStore(changeState)
export default store
