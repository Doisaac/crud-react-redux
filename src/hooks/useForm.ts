import { useCallback, useMemo, useState, type ChangeEvent } from 'react'

type FormState = Record<string, string>

type InputValidatorFn<T> = (value: T) => boolean

export type InputValidators<T> = {
  [K in keyof T]?: [InputValidatorFn<T[K]>, string]
}

type FormValidation<T> = {
  [K in keyof T as `${string & K}Valid`]: null | string
}

export const useForm = <T extends FormState>(
  initialFormState: T,
  inputValidators: InputValidators<T> = {} as InputValidators<T>,
) => {
  const [formState, setFormState] = useState<T>(initialFormState)

  // Creates the validators result
  const formValidation = useMemo(() => {
    const formCheckedValues = {} as FormValidation<T>

    for (const field of Object.keys(inputValidators) as Array<keyof T>) {
      const validatorEntry = inputValidators[field]

      // Skip if no validator exists for this input
      if (!validatorEntry) continue

      const [fn, errorMessage] = validatorEntry
      const isValid = fn(formState[field])

      const newKey = `${String(field)}Valid` as keyof FormValidation<T>

      formCheckedValues[newKey] = (
        isValid ? null : errorMessage
      ) as FormValidation<T>[typeof newKey]
    }

    return formCheckedValues
  }, [formState, inputValidators])

  const isFormValid = useMemo(() => {
    for (const field of Object.keys(formValidation) as Array<
      keyof FormValidation<T>
    >) {
      if (formValidation[field] !== null) {
        return false
      }
    }
    return true
  }, [formValidation])

  // Change the values of the form state when a input element is changing
  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value: inputValue, name: inputName } = event.target

    setFormState((prevFormState) => ({
      ...prevFormState,
      [inputName as keyof T]: inputValue,
    }))
  }

  // Reset form values
  const onResetForm = useCallback(() => {
    setFormState(initialFormState)
  }, [initialFormState])

  const onSetSelectedUser = useCallback((user: T) => {
    setFormState(user)
  }, [])

  return {
    // Properties
    ...formState,
    formState,

    ...formValidation,
    isFormValid,

    // Methods
    onInputChange,
    onResetForm,
    onSetSelectedUser,
  }
}
