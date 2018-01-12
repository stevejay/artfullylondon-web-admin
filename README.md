# Artfully London Admin App

## Prerequisites

1. Install `yarn` and `standard` globally.

1. Install firebase cli tools globally:

```bash
npm install -g firebase-tools
```

2. Copy the `build-constants.template.json` file to `build-constants.json`
(in the same directory) and populate the values appropriately.

## Detail

### Template HTML File

The site CSS is split into the main CSS and the startup CSS. The aim is to
get page content displayed as quickly as possible that indicates the site
is loading. The CSS for this content is inlined into the head of the 
site's HTML file. The main CSS is in it's own file and is linked to at the 
bottom of the body of the site's HTML file, along with the site's JavaScript
files.

The site's JavaScript is split into two files: app and vendor. The app file
contains the site specific JavaScript and the vendor file contains the
JavaScript from all the third-party packages that this site uses. The idea
is that the app code changes more frequently than the vendor code, so it will
hopefully often be the case that when the site is updated, the vendor file
will not have changed and it will only the the app file that the browser
needs to fetch afresh.

The links the the app and vendor Javascript files and the site CSS file all
contain file hashes in the file name, in order to version those files.

## NPM Package Issues

### moment

I have pinned the moment library to version 2.18.1 because of an error
with message ```Moment(...).tz is not a function```. The following issues
detail the error:

- https://github.com/moment/moment-timezone/issues/449
- https://github.com/moment/moment/issues/4216

### standard

I have installed a beta version of standard v11 to deal with an eslint error.

## TODO

- Look into using babili (for better tree-shaking?).
- https://github.com/MacKentoch/react-redux-bootstrap-webpack-starter/issues/5
- template.html scripting example: https://github.com/martiensk/VueScssSSR/blob/master/views/index.html

## License

[MIT](LICENSE)
