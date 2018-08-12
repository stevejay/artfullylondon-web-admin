// @flow

export type SearchState = {
  searchParams: {
    term: string,
    entityType: string
  }
};

export type QuicksearchFormValues = {|
  +term: string
|};

export type BasicSearchFormValues = {|
  +term: string,
  +entityType: { id: string, label: string }
|};

export type SearchNode = {
  +id: string,
  +name: string,
  +entityType: string,
  +image?: ?string,
  +imageCopyright?: ?string,
  +imageRatio?: ?number,
  +imageColor?: ?string,
  +venueName?: ?string
};

export type AutocompleteNode = {
  +id: string,
  +name: string,
  +entityType: string
};
