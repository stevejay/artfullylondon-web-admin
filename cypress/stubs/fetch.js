export default function(win, stubs) {
  const { fetch } = win;
  cy.stub(win, "fetch", (...args) => {
    console.log("Handling fetch stub", args);
    const [url, request] = args;
    const postBody = JSON.parse(request.body);
    if (url.indexOf("graphql") !== -1) {
      let promise;

      stubs.some(stub => {
        if (postBody.operationName === stub.operation) {
          console.log("Stubbing", stub.operation);
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
