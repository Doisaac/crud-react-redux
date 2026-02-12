import { configureStore, type Middleware } from '@reduxjs/toolkit'
import { toast } from 'sonner'

import { listenerMiddleware, startAppListening } from './listenerMiddleware'
import userReducer, { deleteUserById, rollbackUser } from './users/users.slice'

const persistenceMiddleware: Middleware = (store) => (next) => (action) => {
  next(action)
  localStorage.setItem('__redux__state__', JSON.stringify(store.getState()))
}

startAppListening({
  actionCreator: deleteUserById,
  effect: (action, listenerApi) => {
    const userIdToRemove = action.payload
    // Get the state before the action occurs
    const previousState = listenerApi.getOriginalState()
    const userToRemove = previousState.users.find(
      (user) => user.id === userIdToRemove,
    )

    fetch(`https://jsonplaceholder.typicode.com/ussdfers/${action.payload}`, {
      method: 'DELETE',
    })
      .then((res) => {
        if (res.ok) {
          return toast.success(`User ${userIdToRemove} deleted`)
        }

        throw new Error(`Error deleting the user ${action.payload}`)
      })
      .catch(() => {
        toast.error(`Error deleting the user ${userIdToRemove}`)

        if (userToRemove) {
          listenerApi.dispatch(rollbackUser(userToRemove))
        }
      })
  },
})

export const store = configureStore({
  reducer: {
    users: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(persistenceMiddleware)
      .prepend(listenerMiddleware.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
