// @flow

const NARROW = {
  width: 414,
  height: 600,
  deviceScaleFactor: 2
};

const WIDE = {
  width: 800,
  height: 600,
  deviceScaleFactor: 2
};

export const narrow = { viewport: NARROW };
export const wide = { viewport: WIDE };
export const allWidths = { viewport: [NARROW, WIDE] };
