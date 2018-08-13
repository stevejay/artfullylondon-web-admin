export default {
  operation: "EntityCount",
  response: {
    data: {
      entityCount: {
        results: [
          { entityType: "EVENT", count: 1000, __typename: "EntityCount" },
          {
            entityType: "EVENT_SERIES",
            count: 2000,
            __typename: "EntityCount"
          },
          { entityType: "VENUE", count: 3000, __typename: "EntityCount" },
          { entityType: "TALENT", count: 4000, __typename: "EntityCount" }
        ],
        __typename: "EntityCountResult"
      }
    }
  }
};
