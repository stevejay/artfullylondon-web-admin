import { SubmissionError } from 'redux-form'

const ERROR = {
  _error: 'These values overlap with one or more existing entries.'
}

export function validateNewClosure (existingClosures, newClosure) {
  if (!closureIsAllowed(existingClosures, newClosure)) {
    throw new SubmissionError(ERROR)
  }
}

function closureIsAllowed (existingClosures, newClosure) {
  const dateMatches = existingClosures.filter(x => x.date === newClosure.date)

  // There are no existing closures for this date.
  if (dateMatches.length === 0) {
    return true
  }

  // We are trying to add one that can only be by itself.
  const hasTime = newClosure.from || newClosure.at
  if (!hasTime) {
    return false
  }

  // There is an existing closure that can only be by itself.
  if (dateMatches.findIndex(x => !x.from && !x.at) > -1) {
    return false
  }

  return (
    dateMatches.findIndex(
      x =>
        (newClosure.at && newClosure.at === x.at) ||
        (newClosure.from && newClosure.from < x.to && newClosure.to > x.from)
    ) === -1
  )
}

export function validateNewDayEntry (existingDayEntries, newDayEntry) {
  if (!dayEntryIsAllowed(existingDayEntries, newDayEntry)) {
    throw new SubmissionError(ERROR)
  }
}

function dayEntryIsAllowed (existingDayEntries, newDayEntry) {
  const dayMatches = existingDayEntries.filter(
    x =>
      x.day === newDayEntry.day &&
      (!newDayEntry.timesRangeId || newDayEntry.timesRangeId === x.timesRangeId)
  )

  // There are no existing times for this day (including times range id if it exists).
  if (dayMatches.length === 0) {
    return true
  }

  return (
    dayMatches.findIndex(
      x =>
        (newDayEntry.at && newDayEntry.at === x.at) ||
        (newDayEntry.from && newDayEntry.from < x.to && newDayEntry.to > x.from)
    ) === -1
  )
}

export function validateNewDateEntry (existingDateEntries, newDateEntry) {
  if (!dateEntryIsAllowed(existingDateEntries, newDateEntry)) {
    throw new SubmissionError(ERROR)
  }
}

function dateEntryIsAllowed (existingDateEntries, newDateEntry) {
  const dateMatches = existingDateEntries.filter(
    x => x.date === newDateEntry.date
  )

  // There are no existing times for this day.
  if (dateMatches.length === 0) {
    return true
  }

  return (
    dateMatches.findIndex(
      x =>
        (newDateEntry.at && newDateEntry.at === x.at) ||
        (newDateEntry.from &&
          newDateEntry.from < x.to &&
          newDateEntry.to > x.from)
    ) === -1
  )
}

export function validateNewTimesRange (existingTimesRanges, newTimesRange) {
  if (!timesRangeIsAllowed(existingTimesRanges, newTimesRange)) {
    throw new SubmissionError(ERROR)
  }
}

function timesRangeIsAllowed (existingTimesRanges, newTimesRange) {
  return (
    existingTimesRanges.findIndex(
      x =>
        (newTimesRange.dateFrom <= x.dateTo &&
          newTimesRange.dateTo >= x.dateFrom) ||
        (newTimesRange.label && x.label === newTimesRange.label)
    ) === -1
  )
}
