export default tagLabelAndId => ({
  operation: "CreateTag",
  response: {
    data: {
      createTag: {
        node: {
          tagType: "AUDIENCE",
          id: "audience/" + tagLabelAndId,
          label: tagLabelAndId,
          __typename: "TagDetail"
        },
        __typename: "CreateTagOutput"
      }
    }
  }
});
