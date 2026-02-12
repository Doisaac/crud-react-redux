import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export interface User {
  name: string
  email: string
  github: string
}

interface UserWithId extends User {
  id: string
}

const DEFAULT_STATE: UserWithId[] = [
  {
    id: '1',
    name: 'Douglas Barrera',
    email: 'doisaac@gmail.com',
    github: 'Doisaac',
  },
  {
    id: '2',
    name: 'Linus Torvalds',
    email: 'linus@example.com',
    github: 'torvalds',
  },
  {
    id: '3',
    name: 'Hazel Calderón',
    email: 'hazelpinguina@example.com',
    github: 'LezahA',
  },
  {
    id: '4',
    name: 'Gabriel Calderón',
    email: 'gabyhaterdelinux@example.com',
    github: 'gabo-cc',
  },
  {
    id: '5',
    name: 'Margaret Hamilton',
    email: 'margaret@example.com',
    github: 'mhamilton',
  },
  {
    id: '6',
    name: 'Tim Berners-Lee',
    email: 'tim@example.com',
    github: 'timbl',
  },
]

// Get users from local storage
const initialState: UserWithId[] = (() => {
  const persistedState = localStorage.getItem('__redux__state__')

  try {
    if (persistedState) {
      return (JSON.parse(persistedState).users as UserWithId[]) || []
    }
  } catch {
    return DEFAULT_STATE
  }

  return DEFAULT_STATE
})()

export const usersSlice = createSlice({
  name: 'userslice',
  initialState,
  reducers: {
    addNewUser: (state, { payload }: PayloadAction<User>) => {
      state.push({
        ...payload,
        id: crypto.randomUUID(),
      })
    },
    deleteUserById: (state, { payload }: PayloadAction<string>) => {
      return state.filter((user) => user.id !== payload)
    },
    rollbackUser: (state, { payload }: PayloadAction<UserWithId>) => {
      const isUserAlreadyDefined = state.find((user) => user.id === payload.id)
      if (!isUserAlreadyDefined) {
        return [...state, payload]
      }
    },
  },
})

export const { addNewUser, deleteUserById, rollbackUser } = usersSlice.actions
export default usersSlice.reducer
