export default function(win, stubs) {
  const { fetch } = win;
  // throw new Error("yes, we got here here");

  cy.stub(win, "fetch", (...args) => {
    const [url, request] = args;
    const postBody = JSON.parse(request.body);
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
