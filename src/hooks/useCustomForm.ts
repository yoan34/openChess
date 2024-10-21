import { FormikErrors, FormikProps } from 'formik'

type FormValues = {
  email: string
  password: string
}

export const useCustomForm = () => {
  const handleCustomChange = (
    field: keyof FormValues,
    setFieldValue: FormikProps<FormValues>['setFieldValue'],
    setErrors: FormikProps<FormValues>['setErrors'],
    errors: FormikErrors<FormValues>
  ) => (value: string | Date) => {
    setErrors({ ...errors, [field]: undefined })
    if (typeof value === 'string') {
      void setFieldValue(field, value)
    }
  }
  const handleCustomBlur = (
    field: keyof FormValues,
    handleBlur: FormikProps<FormValues>['handleBlur']
  ) => () => {
    handleBlur(field)
  }

  return { handleCustomChange, handleCustomBlur }
}