# Artfully London Admin App

## Prerequisites

Install firebase cli tools globally:

```bash
npm install -g firebase-tools
```

Copy the `build-constants.template.json` file to `build-constants.json`
(in the same directory) and populate the values in that file.

## NPM Package Issues

### moment

I have pinned the moment library to version 2.18.1 because of an error
with message ```Moment(...).tz is not a function```. The following issues
detail the error:

- https://github.com/moment/moment-timezone/issues/449
- https://github.com/moment/moment/issues/4216

### standard

I have installed a beta version of standard v11 to deal with an eslint error.

## License

[MIT](LICENSE)
