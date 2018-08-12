export default {
  operation: "EntityCount",
  response: {
    data: {
      entityCount: {
        results: [
          { entityType: "EVENT", count: 1, __typename: "EntityCount" },
          { entityType: "EVENT_SERIES", count: 2, __typename: "EntityCount" },
          { entityType: "VENUE", count: 3, __typename: "EntityCount" },
          { entityType: "TALENT", count: 4, __typename: "EntityCount" }
        ],
        __typename: "EntityCountResult"
      }
    }
  }
};
