import bcrypt from "bcrypt"

export const encrypt_password = async (password: string) => {
  let salt = await bcrypt.genSalt(10)
  let encrypted_password = await bcrypt.hash(password, salt)
  return encrypted_password
}

export const match_password = async (
  user_password: string,
  password: string
) => {
  let isMatch = await bcrypt.compare(password, user_password)
  return isMatch
}
