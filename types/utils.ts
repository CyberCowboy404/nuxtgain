type NoUndefinedField<T> = { [P in keyof T]-?: NoUndefinedField<NonNullable<T[P]>> }

type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

// Nullable type which made all items in generic object nullable
type Nullable<T> = { [P in keyof T]: T[P] | null }
