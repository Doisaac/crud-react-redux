import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

interface Props {
  actionMessage?: string
  cancelMessage?: string
  description?: string
  onConfirm: () => void
  onOpenChange: (open: boolean) => void
  open: boolean
  title?: string
}

export const CustomAlertDialog = ({
  actionMessage = 'Delete user',
  cancelMessage = 'Cancel',
  description,
  onConfirm,
  onOpenChange,
  open,
  title = 'This action cannot be undone. The user will be permanently removed.',
}: Props) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{cancelMessage}</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm} variant={'destructive'}>
            {actionMessage}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
