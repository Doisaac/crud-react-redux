import { useAppDispatch, useAppSelector } from '@/store/hooks'
import {
  addNewUser,
  deleteUserById,
  editUserById,
  type User,
  type UserWithId,
} from '@/store/users/users.slice'

export const useUsers = () => {
  const users = useAppSelector((state) => state.users)
  const dispatch = useAppDispatch()

  const addUser = (user: User) => {
    dispatch(addNewUser(user))
  }

  const editUser = (user: UserWithId) => {
    dispatch(editUserById(user))
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
    editUser,
  }
}
