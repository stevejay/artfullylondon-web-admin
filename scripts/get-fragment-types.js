const fetch = require("node-fetch");
const fs = require("fs");
const path = require("path");
const log = require("loglevel");

const YOUR_API_HOST =
  "https://api-staging.artfully.london/graphql-service/admin";

fetch(`${YOUR_API_HOST}/graphql`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    query: `
      {
        __schema {
          types {
            kind
            name
            possibleTypes {
              name
            }
          }
        }
      }
    `
  })
})
  .then(result => result.json())
  .then(result => {
    // here we're filtering out any type information unrelated to unions or interfaces
    const filteredData = result.data.__schema.types.filter(
      type => type.possibleTypes !== null
    );
    result.data.__schema.types = filteredData;
    const destFile = path.resolve(__dirname, "../src/fragment-types.json");
    fs.writeFile(destFile, JSON.stringify(result.data), err => {
      if (err) {
        log.error("Error writing fragmentTypes file", err);
      } else {
        log.info("Fragment types successfully extracted!");
      }
    });
  });
