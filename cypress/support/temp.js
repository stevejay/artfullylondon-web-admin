import entityCounts from "../fixtures/entity-counts";

function patcher(win) {
  console.log("event: window:before:load");

  const { fetch: actualFetch } = win;
  if (actualFetch.__PATCHED__) {
    return;
  }

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

  win.fetch.__PATCHED__ = true;
}

export default patcher;
