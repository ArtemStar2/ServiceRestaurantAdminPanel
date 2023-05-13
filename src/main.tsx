import { createContext } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './assets/scss/index.scss'
import Store from './store/store.ts'

interface State{
  store: Store
}

const store = new Store();
export const Context = createContext<State>({
  store,
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Context.Provider value={{
    store
  }}>
      <App />
  </Context.Provider>,
)
