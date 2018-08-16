// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

import entityCounts from "../fixtures/entity-counts";

// Import commands.js using ES2015 syntax:
import "./commands";

// Alternatively you can use CommonJS syntax:
// require('./commands')

let fetchPatched = false;

Cypress.on("window:before:load", win => {
  if (fetchPatched) {
    return;
  }

  const { fetch: actualFetch } = win;

  win.fetch = (...args) => {
    const [url, request] = args;
    if (!request) {
      return actualFetch(...args);
    }
    const postBody = JSON.parse(request.body);
    console.log("intercepting...", url);
    const stubs = [entityCounts];

    if (url.indexOf("graphql") !== -1) {
      let promise;

      stubs.some(stub => {
        if (postBody.operationName === stub.operation) {
          // console.log("Stubbing", stub.operation);
          promise = Promise.resolve({
            ok: true,
            text() {
              return Promise.resolve(JSON.stringify(stub.response));
            }
          });
          return true;
        }
        return false;
      });

      if (promise) {
        return promise;
      } else {
        throw new Error(`Real Fetch Getting Called With Args: ${args}`);
      }
    }

    return actualFetch(...args);
  };

  fetchPatched = true;
});
