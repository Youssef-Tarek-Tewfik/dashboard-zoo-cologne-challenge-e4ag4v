export const calculateAgeInYears = (birthdate: Date): Number => {
  const today = new Date()
  const differenceInMilliseconds = today.getTime() - birthdate.getTime()

  return Math.round(differenceInMilliseconds / (1000 * 60 * 60 * 24 * 365))
}
