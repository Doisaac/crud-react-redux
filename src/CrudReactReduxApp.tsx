import { ListOfUsers } from './users/ListOfUsers'
import { store } from './store/store'
import { Provider } from 'react-redux'

export const CrudReactReduxApp = () => {
  return (
    <Provider store={store}>
      <ListOfUsers />
    </Provider>
  )
}
