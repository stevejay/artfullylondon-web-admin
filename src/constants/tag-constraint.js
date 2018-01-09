export default {
  label: {
    presence: { disallowEmpty: true },
    length: { minimum: 3, maximum: 50 },
    format: /[&\w àáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿ-]+/i
  }
}
