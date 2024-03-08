import { ChangeEvent, KeyboardEvent, forwardRef, useState, useEffect } from 'react'
import { Input } from '@mui/material'
import { formatValue, normalizeValue } from './utils'

interface PriceInputProps {
  value?: number | string
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  onKeyDown?: (event: KeyboardEvent) => void
  onValueChange?: (value: string, formattedValue: string) => void
  prefix?: string
  includeSeparator?: boolean
}

const PriceInput = forwardRef<HTMLInputElement, PriceInputProps>((props, ref) => {
  const {
    value: userValue,
    onChange,
    onKeyDown,
    onValueChange,
    prefix,
    includeSeparator = false
  } = props
  const [stateValue, setStateValue] = useState(() => userValue ? userValue.toString() : '')

  useEffect(() => {
    if (!userValue) {
      setStateValue('')
    }
  }, [userValue])

  function processChange(value: string) {
    const normalizedValue = normalizeValue({ value, prefix, includeSeparator })
    onValueChange && onValueChange(normalizedValue, value)
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    if (!userValue) setStateValue(event.target.value)

    processChange(event.target.value)

    onChange && onChange(event)
  }

  function getDisplayValue() {
    if (userValue) {
      return formatValue({ value: userValue, prefix, includeSeparator })
    }
    return stateValue
  }

  return (
    <Input
      ref={ref}
      type="text"
      onChange={handleChange}
      value={getDisplayValue()}
      onKeyDown={onKeyDown}
    />
  )
})

export default PriceInput