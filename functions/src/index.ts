import * as functions from "firebase-functions";
import { Rulebook } from "./Rulebook";
import Cors from "cors";

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript
const cors = Cors({
  origin: function (origin, callback) {
    callback(null, true)
  }
});

export const calculate = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    const body = JSON.parse(request.body)
    const { seed, cells, change } = body;
    response.setHeader('Content-Type', 'application/json')
    response.status(200).send(Rulebook.handle(seed, cells, change));
  })
  // response.setHeader('Access-Control-Allow-Origin', '*');
  // if (request.method === 'OPTIONS') {
  //   // Send response to OPTIONS requests
  //   response.setHeader('Access-Control-Allow-Methods', 'POST');
  //   response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  //   response.setHeader('Access-Control-Max-Age', '3600');
  //   response.status(204).send('');
  //   return
  // }
  // const { seed, cells, change } = request.body;
  // response.setHeader('Content-Type', 'application/json')
  // response.send(Rulebook.handle(seed, cells, change));
});

