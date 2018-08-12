export default {
  operation: "BasicSearch",
  response: {
    data: {
      basicSearch: {
        edges: [
          {
            node: {
              id: "talent/carrie-cracknell-theatre-director",
              entityType: "TALENT",
              status: "ACTIVE",
              name: "Carrie Cracknell",
              image: "9c5f6ba1e500481a97434374089b0539",
              imageCopyright: null,
              imageRatio: 1.1326352530541013,
              imageColor: "645e5b",
              __typename: "SearchTalent"
            },
            cursor:
              '[14.477183,"cracknell","Carrie",null,"talent/carrie-cracknell-theatre-director"]',
            __typename: "SearchEdge"
          }
        ],
        pageInfo: { hasNextPage: false, __typename: "PageInfo" },
        __typename: "SearchConnection"
      }
    }
  }
};
