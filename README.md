# Introduction

A React.js SPA that demonstrates various front-end coding and testing practises. The site can be accessed [here](https://www.artfully-admin.site/), using the username `readonly` and the password `Readonly1`.

[![CircleCI](https://circleci.com/gh/stevejay/artfullylondon-web-admin/tree/master.svg?style=svg)](https://circleci.com/gh/stevejay/artfullylondon-web-admin/tree/master)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Overview

This React.js SPA features the following:

- CRUD GraphQL operations via [Apollo client](https://www.apollographql.com/docs/react/)
- Lean testing of an SPA, utilizing [Jest](https://jestjs.io/) for unit tests, [Storybook image screenshots](https://github.com/tsuyoshiwada/storybook-chrome-screenshot) and [Reg Suit](https://github.com/reg-viz/reg-suit) for visual regression testing, and Cypress for end-to-end testing
- [Flow](https://flow.org/) for static type checking of the JavaScript
- An approach to React component creation that separates the visual appearance from the behaviour implementation, as [described by Dan Abramov](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0).
- A module-based approach to the structuring of the app's source files
- [Circle CI](https://circleci.com/) for continuous integration and deployment
- Use of [Grommet](http://grommet.io/) component library (specifically a beta of the upcoming Version 2 of Grommet)
- Use of [React App Rewired](https://github.com/timarney/react-app-rewired) to avoid ejecting a project bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app)

## Development

All of the following can be run simultaneously locally&mdash;you just need a populated .env file:

- `yarn start` - runs the app locally
- `yarn storybook` - run storybook locally
- `yarn test` - run jest tests
- `yarn cypress` - run cypress tests
- `yarn run screenshot` - create/update storybook screenshots

### Build Size

You can check on the included packages in the build with the following, replacing the `xxxx` with the actual bundle checksum value:

```
source-map-explorer ./build/static/js/main.xxxx.js ./build/static/js/main.xxxx.js.map
```

## Limitations

I was unable to use a graphql/gql file loader with Babel or Webpack as Storybook does not pick it up.

## Troubleshooting

### Apollo Client

I might get [this problem](https://github.com/apollographql/apollo-link-state/issues/262) with Apollo Link State: "local client data getting nulled out after making a query that involves a round trip to the server." For the moment, reverting to 0.4.0 will fix the problem.

### Grommet Icons Inclusion

Make sure that the whole of the grommet-icons package does not get included in the production build.

This also requires uses of `withTheme`...

```
import { withTheme } from "grommet/components/hocs";
```

... to be translated to:

```
import { withTheme } from "grommet/es6/components/hocs";
```

### Firefox

If you get the 'performing a tls handshake to localhost' issue, follow the instructions [here](https://kb.mit.edu/confluence/display/istcontrib/Deleting+Cert8.db+for+Firefox) and then restart Firefox. (For OS X, the location for me was `~/Library/Application Support/Firefox/Profiles/` and I had to delete the `cert8.db` and `cert9.db` files.)

## Console Errors

Message: `Network error: Store reset while query was in flight(not completed in link chain)`
Bug: [Github issue](https://github.com/apollographql/apollo-client/issues/3766)

## TODO

- Add waiting for fonts to load in storybook-chrome-screenshot config: [here](https://github.com/tsuyoshiwada/storybook-chrome-screenshot#full-control-the-screenshot-timing)
- Add `yarn audit` when it is released.
- Add ${CIRCLE_SHA1:0:7} type thing to app build info.
- Check if yarn caching in `.circleci/config.yml` is done correctly
- Error boundaries!
- Circle CI:
  - linting
    https://groundberry.github.io/development/2017/06/11/create-react-app-linting-all-the-things.html
- Good idea of checking for swUpdate on router navigation:
  https://zach.codes/handling-client-side-app-updates-with-service-workers/
- Grommet
  - Upgrade from v2 beta to v2 rc when it is released.
- Look into getting smaller aws amplify builds: https://github.com/aws-amplify/amplify-js/wiki/Amplify-modularization
- Remove unused packages (mainly dev dependencies: jest-styled-components; ...).
- Improve this readme.
- Date FNS v2:
  - The alpha docs for it are [here](https://date-fns.org/v2.0.0-alpha.11/docs/parse).
- create-react-app v2:
  - I Might be able to use `jest-puppe-shots` when create-react-app upgrades to Jest v23.
  - It will support the ability to preprocess queries using graphql-tag/loader, but I'll have to see if Storybook picks it up.
- Look into something like this: https://github.com/Decisiv/styled-components-modifiers
- Use flow enums for the types?
- See if a submit-on-Enter fix appears for Formix FastField
- Yup for validation
- Why no descriptionCredit on almeida and british libary/museum pics?
- I'll need to use mapbox-gl but it is a huge library - use [react-loadable](https://github.com/jamiebuilds/react-loadable) to include it only on the venue and event edit pages.
- Look into https://www.graph.cool/
- Look into https://onsen.io/react/
- Look into https://react.semantic-ui.com/
- Look into https://ant.design/
- Container (data fetching), Handler, Presentation? Although DA mentions data _and_ behavior for containers.

## Maintenance

### Flow

To update flow types for used packages:

```
flow-typed install
```
