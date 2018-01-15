export const logInConstraint = {
  username: {
    presence: true,
    length: { maximum: 100 }
  },
  password: {
    presence: true,
    length: { maximum: 30 }
  }
}
