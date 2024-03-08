export interface NormalizeValueOptions {
  value: string
  prefix?: string
  includeSeparator: boolean
}

export function normalizeValue(options: NormalizeValueOptions) {
  const {
    value,
    prefix,
    includeSeparator
  } = options
  let normalizedValue = value

  if (includeSeparator) normalizedValue = normalizedValue.replace(/,/g, '')

  if (prefix) normalizedValue = normalizedValue.replace(prefix, '')

  return normalizedValue
}