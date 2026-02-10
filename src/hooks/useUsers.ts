import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { deleteUserById } from '@/store/users/users.slice'

export const useUsers = () => {
  const users = useAppSelector((state) => state.users)
  const dispatch = useAppDispatch()

  const deleteUser = (id: string) => {
    dispatch(deleteUserById(id))
  }

  return {
    // Properties
    users,

    // Methods
    deleteUser,
  }
}
