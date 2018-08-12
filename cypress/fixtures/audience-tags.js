export default {
  operation: "GetTags",
  response: {
    data: {
      tags: {
        nodes: [
          {
            tagType: "AUDIENCE",
            id: "audience/16-plus",
            label: "16 plus",
            __typename: "TagDetail"
          },
          {
            tagType: "AUDIENCE",
            id: "audience/adults-only",
            label: "adults only",
            __typename: "TagDetail"
          },
          {
            tagType: "AUDIENCE",
            id: "audience/families",
            label: "families",
            __typename: "TagDetail"
          }
        ],
        __typename: "TagsResult"
      }
    }
  }
};
