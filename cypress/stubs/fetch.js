export default function(win, stubs) {
  const { fetch } = win;
  console.log("adding stubs");

  cy.stub(win, "fetch", (...args) => {
    const [url, request] = args;
    if (!request) {
      return fetch(...args);
    }

    const postBody = JSON.parse(request.body);

    console.log("intercepting...", url, JSON.stringify(postBody));

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

    return fetch(...args);
  });
}
