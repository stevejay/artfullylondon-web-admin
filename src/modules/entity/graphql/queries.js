// @flow

import gql from "graphql-tag";

export const EventForEditQuery = gql`
  query EventForEdit($id: ID!) {
    eventForEdit(id: $id) {
      node {
        id
        status
        version
        links {
          type
          url
        }
        images {
          id
          ratio
          copyright
          dominantColor
        }
        weSay
        notes
        description
        descriptionCredit
        name
        eventType
        occurrenceType
        costType
        summary
        soldOut
        dateFrom
        dateTo
        rating
        bookingType
        useVenueOpeningTimes
        timedEntry
        costFrom
        costTo
        bookingOpens
        venueGuidance
        duration
        minAge
        maxAge
        timesRanges {
          id
          dateFrom
          dateTo
          label
        }
        performances {
          day
          at
          timesRangeId
        }
        additionalPerformances {
          date
          at
        }
        specialPerformances {
          date
          at
          audienceTags {
            id
            label
          }
        }
        performancesClosures {
          date
          at
        }
        soldOutPerformances {
          date
          at
        }
        openingTimes {
          day
          from
          to
          timesRangeId
        }
        additionalOpeningTimes {
          date
          from
          to
        }
        specialOpeningTimes {
          date
          from
          to
          audienceTags {
            id
            label
          }
        }
        openingTimesClosures {
          date
          from
          to
        }
        audienceTags {
          id
          label
        }
        mediumTags {
          id
          label
        }
        styleTags {
          id
          label
        }
        geoTags {
          id
          label
        }
        reviews {
          source
          rating
        }
        talents {
          roles
          characters
          id
          talent {
            id
            firstNames
            lastName
            images {
              id
              copyright
              dominantColor
            }
          }
        }
        venueId
        venue {
          id
          name
        }
        eventSeriesId
        eventSeries {
          id
          name
        }
      }
    }
  }
`;

export const EventSeriesForEditQuery = gql`
  query EventSeriesForEdit($id: ID!) {
    eventSeriesForEdit(id: $id) {
      node {
        id
        status
        version
        links {
          type
          url
        }
        images {
          id
          ratio
          copyright
          dominantColor
        }
        weSay
        notes
        description
        descriptionCredit
        name
        eventSeriesType
        occurrence
        summary
      }
    }
  }
`;

export const TalentForEditQuery = gql`
  query TalentForEdit($id: ID!) {
    talentForEdit(id: $id) {
      node {
        id
        status
        version
        links {
          type
          url
        }
        images {
          id
          ratio
          copyright
          dominantColor
        }
        weSay
        notes
        description
        descriptionCredit
        firstNames
        lastName
        talentType
        commonRole
      }
    }
  }
`;

export const VenueForEditQuery = gql`
  query VenueForEdit($id: ID!) {
    venueForEdit(id: $id) {
      node {
        id
        status
        version
        links {
          type
          url
        }
        images {
          id
          ratio
          copyright
          dominantColor
        }
        weSay
        notes
        description
        descriptionCredit
        name
        venueType
        address
        postcode
        telephone
        email
        latitude
        longitude
        wheelchairAccessType
        disabledBathroomType
        hearingFacilitiesType
        hasPermanentCollection
        openingTimes {
          day
          from
          to
        }
        additionalOpeningTimes {
          date
          from
          to
        }
        openingTimesClosures {
          date
          from
          to
        }
        namedClosures
      }
    }
  }
`;
