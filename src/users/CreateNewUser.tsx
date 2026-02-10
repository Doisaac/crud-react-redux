import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useUsers } from '@/hooks/useUsers'
import { useEffect, useState, type SubmitEvent } from 'react'

export const CreateNewUser = () => {
  const { addUser } = useUsers()
  const [result, setResult] = useState<'ok' | 'ko' | null>(null)

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()

    setResult(null)

    const form = event.target
    const formData = new FormData(form)

    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const github = formData.get('github') as string

    // Validations
    if (!name || !email || !github) {
      return setResult('ko')
    }

    addUser({
      email,
      github,
      name,
    })
    setResult('ok')
    form.reset()
  }

  useEffect(() => {
    if (result === null) return

    const timer = setTimeout(() => {
      setResult(null)
    }, 3000)

    return () => clearTimeout(timer)
  }, [result])

  return (
    <Card className="mt-4 w-full px-2">
      <CardTitle>Create New User</CardTitle>

      <form onSubmit={handleSubmit} className="space-y-3">
        <Input name="name" placeholder="Name" />
        <Input name="github" placeholder="Github username" />
        <Input name="email" placeholder="Email address" />

        <Button type="submit" variant={'default'}>
          Create User
        </Button>

        <span className="ml-2">
          {result === 'ok' && (
            <Badge className="bg-green-50 text-green-700">
              User successfully created
            </Badge>
          )}

          {result === 'ko' && (
            <Badge className="bg-red-50 text-red-700">
              Something went wrong. Complete the fields and try again.
            </Badge>
          )}
        </span>
      </form>
    </Card>
  )
}
