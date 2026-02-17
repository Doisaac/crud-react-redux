import { Button } from '@/components/ui/button'
import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '../components/ui/table'
import { Card, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useUsers } from '@/hooks/useUsers'

import { Pencil, Trash } from 'lucide-react'
import { useMemo, useState, type ChangeEvent } from 'react'
import { CreateNewUser } from './CreateNewUser'
import type { UserWithId } from '@/store/users/users.slice'
import { toast } from 'sonner'
import { CustomAlertDialog } from '@/components/custom/CustomAlertDialog'
import { Field } from '@/components/ui/field'
import { Input } from '@/components/ui/input'

export const ListOfUsers = () => {
  const { users, deleteUser } = useUsers()

  const [selectedUser, setSelectedUser] = useState<null | UserWithId>(null)
  const [userToDelete, setUserToDelete] = useState<string | null>(null)
  const [search, setSearch] = useState<string>('')

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target

    setSearch(value)
  }

  const onUserClick = async (githubUsername: string) => {
    try {
      await navigator.clipboard.writeText(githubUsername)
      toast.info('GitHub username copied!')
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message)
      }
    }
  }

  const filteredUsers = useMemo(() => {
    if (!search) return users

    return users.filter((user) =>
      user.name.toLowerCase().includes(search.toLowerCase()),
    )
  }, [search, users])

  const isDialogOpen = !!userToDelete

  return (
    <div className="flex max-w-3xl mx-auto flex-col items-center pb-16 p-6">
      <header className="py-16 flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl font-extrabold text-blue-800 animate-fade-in">
          MANAGE YOUR {''}
          <span className="text-zinc-800">GITHUB</span>
        </h1>

        <h1 className="text-6xl font-extrabold text-blue-800 animate-fade-in">
          FRIENDS
        </h1>
      </header>

      <Card className="w-full max-h-[600px] mt-2 px-2">
        <CardTitle>
          Users
          <Badge className="ml-2">{users.length}</Badge>
        </CardTitle>

        <Field orientation="horizontal">
          <Input
            type="search"
            placeholder="Search by name.."
            value={search}
            onChange={(event) => handleChange(event)}
          />
        </Field>

        <Table>
          <TableCaption>A list of users.</TableCaption>
          <TableHeader className="sticky top-0 bg-background z-10">
            <TableRow className="*:font-bold">
              <TableHead>Name</TableHead>
              <TableHead>Username</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers?.map((user) => (
              <TableRow
                key={user.id}
                onClick={() => onUserClick(user.github)}
                className="cursor-pointer"
              >
                <TableCell className="flex items-center gap-2">
                  <img
                    src={`https://unavatar.io/github/${user.github}`}
                    alt={`Avatar of ${user.github}`}
                    className="size-12 rounded-full shrink-0"
                  />
                  {user.name}
                </TableCell>
                <TableCell>{user.github}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant={'default'}
                      size={'icon'}
                      onClick={() => setSelectedUser(user)}
                    >
                      <Pencil size={52} />
                    </Button>
                    <Button
                      variant={'destructive'}
                      size={'icon'}
                      onClick={(event) => {
                        event.stopPropagation()
                        setUserToDelete(user.id)
                      }}
                      // onClick={() => deleteUser(user.id)}
                    >
                      <Trash size={52} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <CreateNewUser
        selectedUser={selectedUser}
        onCancelSelectedUser={() => setSelectedUser(null)}
      />

      <CustomAlertDialog
        open={isDialogOpen}
        onOpenChange={(open) => {
          if (!open) setUserToDelete(null)
        }}
        onConfirm={() => {
          if (!userToDelete) return

          deleteUser(userToDelete)
        }}
      />
    </div>
  )
}
