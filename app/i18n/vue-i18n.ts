import { englishWords } from './en'
import { ukrainianWords } from './ua'

export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'en',
  messages: {
    en: englishWords,
    ua: ukrainianWords,
  },
}))
