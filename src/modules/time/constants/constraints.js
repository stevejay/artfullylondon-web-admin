const DAY_REGEX = /^[0123456]$/
const DATE_REGEX = /^[12]\d\d\d\/[01]\d\/[0123]\d$/
const OPTIONAL_TIME_REGEX = /^(?:[01][0-9]|2[0-3]):[0-5][0-9]$|^$/

const OPTIONAL_TO_OPENING_TIME_DEPENDENCY_ON_FROM_OPENING_TIME = {
  ensure: (value, attrs) => (!attrs.from && !value) || value > attrs.from,
  message: 'To time is not greater than From time'
}

const TO_OPENING_TIME_DEPENDENCY_ON_FROM_OPENING_TIME = {
  ensure: (value, attrs) => value > attrs.from,
  message: 'To time is not greater than From time'
}

const DATE_TO_DEPENDENCY_ON_DATE_FROM = {
  ensure: (value, attrs) => value > attrs.dateFrom,
  message: 'Date To is not greate than Date From'
}

export const TIMES_RANGE_CONSTRAINT = {
  dateFrom: {
    presence: { disallowEmpty: true },
    format: DATE_REGEX
  },
  dateTo: {
    presence: { disallowEmpty: true },
    format: DATE_REGEX,
    dependency: DATE_TO_DEPENDENCY_ON_DATE_FROM
  },
  label: {
    length: { minimum: 1, maximum: 20 }
  }
}

export const OPENING_TIME_CONSTRAINT = {
  day: {
    presence: { disallowEmpty: true },
    format: DAY_REGEX
  },
  from: {
    presence: { disallowEmpty: true },
    format: OPTIONAL_TIME_REGEX
  },
  to: {
    presence: { disallowEmpty: true },
    format: OPTIONAL_TIME_REGEX,
    dependency: TO_OPENING_TIME_DEPENDENCY_ON_FROM_OPENING_TIME
  }
}

export const PERFORMANCE_CONSTRAINT = {
  day: {
    presence: { disallowEmpty: true },
    format: DAY_REGEX
  },
  at: {
    presence: { disallowEmpty: true },
    format: OPTIONAL_TIME_REGEX
  }
}

export const ADDITIONAL_OPENING_TIME_CONSTRAINT = {
  date: {
    presence: { disallowEmpty: true },
    format: DATE_REGEX
  },
  from: {
    presence: { disallowEmpty: true },
    format: OPTIONAL_TIME_REGEX
  },
  to: {
    presence: { disallowEmpty: true },
    format: OPTIONAL_TIME_REGEX,
    dependency: TO_OPENING_TIME_DEPENDENCY_ON_FROM_OPENING_TIME
  }
}

export const ADDITIONAL_PERFORMANCE_CONSTRAINT = {
  date: {
    presence: { disallowEmpty: true },
    format: DATE_REGEX
  },
  at: {
    presence: { disallowEmpty: true },
    format: OPTIONAL_TIME_REGEX
  }
}

export const SPECIAL_OPENING_TIME_CONSTRAINT = {
  date: {
    presence: { disallowEmpty: true },
    format: DATE_REGEX
  },
  from: {
    presence: { disallowEmpty: true },
    format: OPTIONAL_TIME_REGEX
  },
  to: {
    presence: { disallowEmpty: true },
    format: OPTIONAL_TIME_REGEX,
    dependency: TO_OPENING_TIME_DEPENDENCY_ON_FROM_OPENING_TIME
  },
  audienceTags: {
    presence: { disallowEmpty: true }
  }
}

export const SPECIAL_PERFORMANCES_CONSTRAINT = {
  date: {
    presence: { disallowEmpty: true },
    format: DATE_REGEX
  },
  at: {
    presence: { disallowEmpty: true },
    format: OPTIONAL_TIME_REGEX
  },
  audienceTags: {
    presence: { disallowEmpty: true }
  }
}

export const OPENING_TIME_CLOSURE_CONSTRAINT = {
  date: {
    presence: { disallowEmpty: true },
    format: DATE_REGEX
  },
  from: {
    format: OPTIONAL_TIME_REGEX
  },
  to: {
    format: OPTIONAL_TIME_REGEX,
    dependency: OPTIONAL_TO_OPENING_TIME_DEPENDENCY_ON_FROM_OPENING_TIME
  }
}

export const PERFORMANCE_CLOSURE_CONSTRAINT = {
  date: {
    presence: { disallowEmpty: true },
    format: DATE_REGEX
  },
  at: {
    format: OPTIONAL_TIME_REGEX
  }
}
