import { ListOfUsers } from './users/ListOfUsers'
import { store } from './store/store'
import { Provider } from 'react-redux'
import { Toaster } from 'sonner'

export const CrudReactReduxApp = () => {
  return (
    <Provider store={store}>
      <ListOfUsers />
      <Toaster richColors />
    </Provider>
  )
}
