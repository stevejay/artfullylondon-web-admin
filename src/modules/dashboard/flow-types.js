// @flow

export type EntityCount = {
  +entityType: string,
  +count: number
};

export type EntityCountResult = {
  +entityCount: {
    +results: Array<EntityCount>
  }
};
