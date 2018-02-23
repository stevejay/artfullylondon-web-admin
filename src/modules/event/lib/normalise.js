export function normaliseMoney (value) {
  return value.replace(/[^\d.]/g, '')
}
