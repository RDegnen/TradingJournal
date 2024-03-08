export interface FormatValueOptions {
  value: string | number | undefined | null
  prefix?: string
  includeSeparator: boolean
}

function formatSeparator(formattedValue: string) {
  const hasDecimal = formattedValue.match(/\.0*$/)
  let split: string[] = []
  if (hasDecimal) {
    split = formattedValue.split('.')
    formattedValue = split[0]
  }
  if (formattedValue !== '-') formattedValue = Number(formattedValue).toLocaleString()
  if (hasDecimal) formattedValue = `${formattedValue}.${split[1]}`
  return formattedValue
}

export function formatValue(options: FormatValueOptions) {
  const {
    value,
    prefix,
    includeSeparator
  } = options
  let formattedValue = value?.toString()
  if (!formattedValue) return ''

  if (includeSeparator) formattedValue = formatSeparator(formattedValue)

  if (prefix) formattedValue = `${prefix}${formattedValue}`

  return formattedValue
}