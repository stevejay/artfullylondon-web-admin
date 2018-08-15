// @flow

export default {
  global: {
    font: {
      family: "'museo-sans',sans-serif",
      weight: 300, // TODO may be invalid key
      face: ""
    }
  },
  text: {
    xsmall: { size: "12px", height: 1.5 },
    small: { size: "14px", height: 1.43 },
    medium: { size: "16px", height: 1.375 },
    large: { size: "20px", height: 1.375 },
    xlarge: { size: "24px", height: 1.1875 },
    xxlarge: { size: "72px", height: 1.125 }
  },
  icon: {
    color: "#AAAAAA",
    size: {
      small: "20px",
      medium: "24px",
      large: "48px",
      xlarge: "96px",
      xxlarge: "150px",
      xxxlarge: "256px"
    }
  },
  anchor: {
    // TODO see if a fix happens for text decoration appearing on hover.
    // If so then I can lose the following override:
    textDecoration: "none !important"
  },
  heading: {
    font: {
      family: "'Zilla Slab',sans-serif"
    },
    weight: 400
  },
  input: {
    weight: 300
  }
};
