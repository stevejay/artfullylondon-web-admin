# Introduction

A React.js SPA that demonstrates various front-end coding and testing practises.

## Packages

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app), and uses [React App Rewired](https://github.com/timarney/react-app-rewired) to extend its build configuration.

## Development

All of the following can be run simultaneously locally--you just need a populated .env file:

- `yarn start` - runs the app locally
- `yarn storybook` - run storybook locally
- `yarn test` - run jest tests
- `yarn cypress` - run cypress tests
- `yarn run screenshot` - create/update storybook screenshots

## Limitations

- I can't use a graphql/gql file loader in babel or webpack as Storybook doesn't pick it up.

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

- remove named exports from components
- Look into this: https://github.com/reg-viz/reg-suit
  https://stackoverflow.com/questions/50408579/backstopjs-set-common-selector-for-all-scenarios
- Might be able to use jest-puppe-shots when create-react-app upgrades to Jest v23.
- Look into something like this: https://github.com/Decisiv/styled-components-modifiers
- rename utils to formatters?
- Use flow enums for the types?
- See if a submit-on-Enter fix appears for Formix FastField
- Yup for validation
- create-react-app@2.0.0 will support the ability to preprocess queries using graphql-tag/loader
- Error boundaries
- Why no descriptionCredit on almeida and british libary/museum pics?
- Date FNS v2: https://date-fns.org/v2.0.0-alpha.11/docs/parse
- Service worker
  - If possible, configure your production environment to serve the generated service-worker.js with HTTP caching disabled.
- check images from cdn have cache headers.
- mapbox-gl is a huge library - use [react-loadable](https://github.com/jamiebuilds/react-loadable) to use it only on the venue and event edit pages.
- source-map-explorer main.js main.js.map

## Maintenance

### Flow

To update flow types for used packages:

```
flow-typed install
```
