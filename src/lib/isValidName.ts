const reserved = ["404", "login", "logout", "index", "admin"]

export const isValidName = (name: string): boolean => {
  return /^[a-zA-Z0-9_\-]+$/.test(name) && !reserved.includes(name)
}
