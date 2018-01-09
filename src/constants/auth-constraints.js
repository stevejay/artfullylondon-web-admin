export const logInConstraint = {
  username: {
    presence: true,
    length: { minimum: 1, maximum: 100 }
  },
  password: {
    presence: true,
    length: { maximum: 30 }
  }
}
