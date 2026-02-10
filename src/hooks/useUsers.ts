import { useAppDispatch, useAppSelector } from '@/store/hooks'
import {
  addNewUser,
  deleteUserById,
  type User,
} from '@/store/users/users.slice'

export const useUsers = () => {
  const users = useAppSelector((state) => state.users)
  const dispatch = useAppDispatch()

  const addUser = (user: User) => {
    dispatch(addNewUser(user))
  }

  const deleteUser = (id: string) => {
    dispatch(deleteUserById(id))
  }

  return {
    // Properties
    users,

    // Methods
    addUser,
    deleteUser,
  }
}
