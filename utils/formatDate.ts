import { format } from 'date-fns'
import { enUS } from 'date-fns/locale'

export default function (dateStr: string) {
  return dateStr
    ? format(new Date(dateStr), 'PPPP', { locale: enUS })
    : undefined
}
