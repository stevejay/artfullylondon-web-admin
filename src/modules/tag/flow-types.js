// @flow

export type Tag = {|
  +tagType: string,
  +id: string,
  +label: string
|};

export type TagArray = Array<Tag>;

export type AddTagFormValues = {
  +label: string
};
