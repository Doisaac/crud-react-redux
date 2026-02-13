import { useState, type ChangeEvent } from 'react'

type FormState = Record<string, string>

export const useForm = <T extends FormState>(initialFormState: T) => {
  const [formState, setFormState] = useState<T>(initialFormState)

  // Change the values of the form state when a input element is changing
  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value: inputValue, name: inputName } = event.target

    setFormState((prevFormState) => ({
      ...prevFormState,
      [inputName as keyof T]: inputValue,
    }))
  }

  // Reset form values
  const onResetForm = () => {
    setFormState(initialFormState)
  }

  return {
    // Properties
    ...formState,
    formState,

    // Methods
    onInputChange,
    onResetForm,
  }
}
