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

export const ListOfUsers = () => {
  const { users, deleteUser } = useUsers()

  return (
    <div className="flex max-w-2xl mx-auto flex-col items-center p-2">
      <h1 className="text-3xl font-extrabold text-indigo-600">
        crud-react-redux
      </h1>

      <Card className="w-full mt-2 px-2">
        <CardTitle>
          Users
          <Badge className="ml-2">{users.length}</Badge>
        </CardTitle>

        <Table>
          <TableCaption>A list of users.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Id</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell className="flex items-center gap-2">
                  <img
                    src={`https://unavatar.io/github/${user.github}`}
                    alt={`Avatar of ${user.github}`}
                    className="size-12 rounded-full"
                  />
                  {user.name}
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant={'default'} size={'icon'}>
                      <Pencil size={52} />
                    </Button>
                    <Button
                      variant={'destructive'}
                      size={'icon'}
                      onClick={() => deleteUser(user.id)}
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
    </div>
  )
}
