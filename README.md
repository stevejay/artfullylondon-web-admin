# Introduction

A React.js SPA that demonstrates various front-end coding and testing practises. The site can be accessed [here](https://www.artfully-admin.site/), using the username `readonly` and the password `Readonly1`.

## Packages

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app), and uses [React App Rewired](https://github.com/timarney/react-app-rewired) to extend its build configuration.

## Development

All of the following can be run simultaneously locally--you just need a populated .env file:

- `yarn start` - runs the app locally
- `yarn storybook` - run storybook locally
- `yarn test` - run jest tests
- `yarn cypress` - run cypress tests
- `yarn run screenshot` - create/update storybook screenshots

You can check on the included packages in the build with the following, replacing the `xxxx` with the actual bundle checksum value:

```
source-map-explorer ./build/static/js/main.xxxx.js ./build/static/js/main.xxxx.js.map
```

## Limitations

I was unable to use a graphql/gql file loader with Babel or Webpack as Storybook does not pick it up.

## Troubleshooting

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

## TODO

- Circle CI:
  - cypress
  - linting
  - store test results
- Good idea of checking for swUpdate on router navigation:
  https://zach.codes/handling-client-side-app-updates-with-service-workers/
- Grommet
  - Upgrade from v2 beta to v2 rc when it is released.
- Look into getting smaller aws amplify builds: https://github.com/aws-amplify/amplify-js/wiki/Amplify-modularization
- Remove unused packages (mainly dev dependencies: jest-styled-components; ...).
- Complete this readme.
- Error boundaries.
- Date FNS v2:
  - The alpha docs for it are [here](https://date-fns.org/v2.0.0-alpha.11/docs/parse).
- create-react-app v2:
  - I Might be able to use `jest-puppe-shots` when create-react-app upgrades to Jest v23.
  - It will support the ability to preprocess queries using graphql-tag/loader, but I'll have to see if Storybook picks it up.
- Improve image snapshot testing:
  - Look into using [reg-suit](https://github.com/reg-viz/reg-suit).
- Look into something like this: https://github.com/Decisiv/styled-components-modifiers
- Use flow enums for the types?
- See if a submit-on-Enter fix appears for Formix FastField
- Yup for validation
- Why no descriptionCredit on almeida and british libary/museum pics?
- I'll need to use mapbox-gl but it is a huge library - use [react-loadable](https://github.com/jamiebuilds/react-loadable) to include it only on the venue and event edit pages.

## Maintenance

### Flow

To update flow types for used packages:

```
flow-typed install
```
