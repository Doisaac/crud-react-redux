import { useEffect, useState, type SubmitEvent } from 'react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Card, CardTitle } from '@/components/ui/card'
import { Field, FieldDescription } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { useForm, type InputValidators } from '@/hooks/useForm'
import { useUsers } from '@/hooks/useUsers'
import { cn } from '@/lib/utils'
import type { UserWithId } from '@/store/users/users.slice'

const initialFormState = {
  name: '',
  github: '',
  email: '',
}

const validators: InputValidators<typeof initialFormState> = {
  name: [
    (name: string) => name.length > 0,
    'Name must be at least 1 character',
  ],
  github: [
    (githubUsername: string) => githubUsername.length > 0,
    'Github username must be at least 1 character',
  ],
  email: [
    (email: string) =>
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email),
    'Email must be valid',
  ],
}

interface CreateNewUserProps {
  selectedUser?: UserWithId | null
  onCancelSelectedUser: () => void
}

export const CreateNewUser = ({
  selectedUser,
  onCancelSelectedUser,
}: CreateNewUserProps) => {
  const {
    name,
    github,
    email,
    onInputChange,
    onResetForm,
    nameValid,
    githubValid,
    emailValid,
    onSetSelectedUser,
    isFormValid,
  } = useForm(initialFormState, validators)

  useEffect(() => {
    // Reset form when no user is selected
    if (!selectedUser) {
      onResetForm()
      return
    }

    onSetSelectedUser({
      name: selectedUser.name,
      email: selectedUser.email,
      github: selectedUser.github,
    })
  }, [selectedUser, onSetSelectedUser, onResetForm])

  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false)
  const { addUser, editUser } = useUsers()

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()
    setHasSubmitted(true)

    // Validations
    if (!isFormValid) {
      return
    }

    // Check if user is editing
    if (selectedUser) {
      editUser({
        id: selectedUser.id,
        email,
        github,
        name,
      })
      toast.success('User successfully updated')
    } else {
      addUser({
        email,
        github,
        name,
      })
      toast.success('User successfully added')
    }

    setHasSubmitted(false)
    onCancelSelectedUser()
    onResetForm()
  }

  return (
    <Card className="mt-4 w-full px-2">
      <CardTitle>{selectedUser ? 'Edit User' : 'Create New User'}</CardTitle>

      <form onSubmit={handleSubmit} className="space-y-3">
        <Field>
          <Input
            name="name"
            value={name}
            onChange={onInputChange}
            placeholder="Name"
            className={cn(
              hasSubmitted &&
                nameValid &&
                'transition-colors border-red-500 focus-visible:ring-red-500',
            )}
          />

          <FieldDescription className="text-red-600/70">
            {hasSubmitted && nameValid}
          </FieldDescription>
        </Field>

        <Field>
          <Input
            name="github"
            value={github}
            onChange={onInputChange}
            placeholder="Github username"
            className={cn(
              hasSubmitted &&
                githubValid &&
                'transition-colors border-red-500 focus-visible:ring-red-500',
            )}
          />

          <FieldDescription className="text-red-600/70">
            {hasSubmitted && githubValid}
          </FieldDescription>
        </Field>

        <Field>
          <Input
            name="email"
            value={email}
            onChange={onInputChange}
            placeholder="Email address"
            className={cn(
              hasSubmitted &&
                emailValid &&
                'transition-colors border-red-500 focus-visible:ring-red-500',
            )}
          />

          <FieldDescription className="text-red-600/70">
            {hasSubmitted && emailValid}
          </FieldDescription>
        </Field>

        {selectedUser ? (
          <Button type="submit" variant={'default'}>
            Edit User
          </Button>
        ) : (
          <Button type="submit" variant={'default'}>
            Create User
          </Button>
        )}

        {selectedUser && (
          <Button
            type="button"
            variant={'outline'}
            className="ml-2"
            onClick={onCancelSelectedUser}
          >
            Cancel
          </Button>
        )}
      </form>
    </Card>
  )
}
