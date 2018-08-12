// @flow

export type Link = { +type: string, +url: string };
export type LinkArray = Array<Link>;

export type Image = {
  +id: string,
  +dominantColor: string,
  +copyright?: string
};
export type ImageArray = Array<Image>;

export type Tag = { +id: string, +label: string };
export type TagArray = Array<Tag>;

export type Review = {
  +source: string,
  +rating: number
};

export type EventTalent = {
  +roles: ?Array<string>,
  +characters: ?Array<string>,
  +id: string,
  +talent: {
    +id: string,
    +firstNames: ?string,
    +lastName: string,
    +images: ?ImageArray
  }
};

export type OpeningTime = {
  +from?: string,
  +to?: string
};

export type DayOpeningTime = {
  +day: number,
  +from: string,
  +to: string,
  +timesRangeId: string
};

export type DateOpeningTime = {
  +date: string,
  +from: string,
  +to: string
};

export type DateClosedTimeRange = {
  +date: string,
  +from: ?string,
  +to: ?string
};

export type TimesRange = {
  +id: string,
  +dateFrom: string,
  +dateTo: string,
  +label: string
};

export type Performance = {
  +at?: string
};

export type DayPerformance = {
  +day: number,
  +at: string,
  +timesRangeId: ?string
};

export type DatePerformance = {
  +date: string,
  +at: string
};

export type SpecialPerformance = {
  +date: string,
  +at: string,
  +audienceTags?: ?TagArray
};

export type DateClosedTimeAt = {
  +date: string,
  +at: ?string
};

export type SpecialOpeningTime = {
  +date: string,
  +from: string,
  +to: string,
  +audienceTags?: ?TagArray
};

export type EventForEdit = {
  +id: string,
  +status: string,
  +version: number,
  +links: ?LinkArray,
  +images: ?ImageArray,
  +weSay: ?string,
  +notes: ?string,
  +description: ?string,
  +descriptionCredit: ?string,
  +name: string,
  +eventType: string,
  +occurrenceType: string,
  +dateFrom: ?string,
  +dateTo: ?string,
  +costType: string,
  +costFrom: ?number,
  +costTo: ?number,
  +summary: string,
  +soldOut: ?boolean,
  +rating: number,
  +bookingType: string,
  +bookingOpens: ?string,
  +venueGuidance: ?string,
  +timedEntry: ?boolean,
  +duration: ?string,
  +minAge: ?number,
  +maxAge: ?number,
  +useVenueOpeningTimes: boolean,
  +timesRanges: ?Array<TimesRange>,
  +openingTimes: ?Array<DayOpeningTime>,
  +additionalOpeningTimes: ?Array<DateOpeningTime>,
  +specialOpeningTimes: ?Array<SpecialOpeningTime>,
  +openingTimesClosures: ?Array<DateClosedTimeRange>,
  +performances: ?Array<DayPerformance>,
  +additionalPerformances: ?Array<DatePerformance>,
  +specialPerformances: ?Array<SpecialPerformance>,
  +performancesClosures: ?Array<DateClosedTimeAt>,
  +soldOutPerformances: ?Array<DatePerformance>,
  +audienceTags: ?TagArray,
  +mediumTags: ?TagArray,
  +styleTags: ?TagArray,
  +geoTags: ?TagArray,
  +reviews: ?Array<Review>,
  +talents: ?Array<EventTalent>,
  +venueId: string,
  +venue: {
    +id: string,
    +name: string
  },
  +eventSeriesId: ?string,
  +eventSeries: ?{
    +id: string,
    +name: string
  }
};

export type EventSeriesForEdit = {
  +id: string,
  +status: string,
  +version: number,
  +links: ?LinkArray,
  +images: ?ImageArray,
  +weSay: ?string,
  +notes: ?string,
  +description: ?string,
  +descriptionCredit: ?string,
  +name: string,
  +eventSeriesType: string,
  +occurrence: string,
  +summary: string
};

export type TalentForEdit = {
  +id: string,
  +status: string,
  +version: number,
  +links: ?LinkArray,
  +images: ?ImageArray,
  +weSay: ?string,
  +notes: ?string,
  +description: ?string,
  +descriptionCredit: ?string,
  +firstNames: ?string,
  +lastName: string,
  +talentType: string,
  +commonRole: string
};

export type VenueForEdit = {
  +id: string,
  +status: string,
  +version: number,
  +links: ?LinkArray,
  +images: ?ImageArray,
  +weSay: ?string,
  +notes: ?string,
  +description: ?string,
  +descriptionCredit: ?string,
  +name: string,
  +venueType: string,
  +address: string,
  +postcode: string,
  +telephone: ?string,
  +email: ?string,
  +latitude: number,
  +longitude: number,
  +wheelchairAccessType: string,
  +disabledBathroomType: string,
  +hearingFacilitiesType: string,
  +hasPermanentCollection: boolean,
  +openingTimes: ?Array<DayOpeningTime>,
  +additionalOpeningTimes: ?Array<DateOpeningTime>,
  +openingTimesClosures: ?Array<DateClosedTimeRange>,
  +namedClosures: ?Array<string>
};
