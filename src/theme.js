// @flow

export default {
  global: {
    // colors: {
    //   'light-1': '#FAFAFA'
    // },
    font: {
      family: "'museo-sans',sans-serif",
      face: `
      @font-face {
        font-family:"museo-sans";
        src:url("https://use.typekit.net/af/620bf8/00000000000000000000e7fe/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n3&v=3") format("woff2"),url("https://use.typekit.net/af/620bf8/00000000000000000000e7fe/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n3&v=3") format("woff"),url("https://use.typekit.net/af/620bf8/00000000000000000000e7fe/27/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n3&v=3") format("opentype");
        font-style:normal;font-weight:300;
      }
      @font-face {
        font-family:"museo-sans";
        src:url("https://use.typekit.net/af/5cca6d/00000000000000000000e802/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=i3&v=3") format("woff2"),url("https://use.typekit.net/af/5cca6d/00000000000000000000e802/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=i3&v=3") format("woff"),url("https://use.typekit.net/af/5cca6d/00000000000000000000e802/27/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=i3&v=3") format("opentype");
        font-style:italic;font-weight:300;
      }
      @font-face {
        font-family:"museo-slab";
        src:url("https://use.typekit.net/af/aa4f4e/000000000000000000012043/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n5&v=3") format("woff2"),url("https://use.typekit.net/af/aa4f4e/000000000000000000012043/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n5&v=3") format("woff"),url("https://use.typekit.net/af/aa4f4e/000000000000000000012043/27/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n5&v=3") format("opentype");
        font-style:normal;font-weight:500;
      }
      @font-face {
        font-family: 'Zilla Slab';
        font-style: normal;
        font-weight: 600;
        src: local('Zilla Slab SemiBold'), local('ZillaSlab-SemiBold'), url(https://fonts.gstatic.com/s/zillaslab/v3/dFa5ZfeM_74wlPZtksIFYuUe6HOpW3pwfa0.woff2) format('woff2');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }
      `
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
      family: "'Zilla Slab',serif"
    },
    weight: 400
  }
};
