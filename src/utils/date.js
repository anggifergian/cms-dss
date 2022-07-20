import { format as Format, parseISO } from 'date-fns'

export const formatISODate = (value, format = "dd/MM/yyyy") => {
  const formattedValue = Format(parseISO(value), format);
  return formattedValue
}