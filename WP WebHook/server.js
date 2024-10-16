import express from "express";
import axios from "axios";
import dotenv from 'dotenv';


const app = express();
app.use(express.json());
dotenv.config();


const { WEBHOOK_VERIFY_TOKEN, GRAPH_API_TOKEN, PORT, MY_TOKEN } = process.env;

// app.get("/webhook", (req, res) => {
//     const mode = req.query["hub.mode"];
//     const token = req.query["hub.verify_token"];
//     const challenge = req.query["hub.challenge"];


//     // check the mode and token sent are correct
//     if (mode === 'subscribe' && token === MY_TOKEN) {
//         res.status(200).send(challenge);
//     } else {
//         res.sendStatus(403);
//     }

// })


// app.post("/webhook", async (req, res) => {
//     console.log("Incoming webhook message:", JSON.stringify(req.body, null, 2));
//     const initial = req.body.entry?.[0]?.changes[0]?.value;

//     const message = initial.messages?.[0];
//     const business_phone_number_id = initial?.metadata?.phone_number_id;
//     const from = message.from;

//     if (message?.type === "text") {

//         await axios({
//             method: "POST",
//             url: `https://graph.facebook.com/v18.0/${business_phone_number_id}/messages?access_token=${GRAPH_API_TOKEN}`,
//             headers: {
//                 "Content-Type":"application/json"
//             },
//             data: {
//                 messaging_product: "whatsapp",
//                 to: from,
//                 text: {
//                     body: 'hi there mr man'
//                 },
//             }
//         })

//         res.sendStatus(200);
//     }
// });

/* ----- */
app.post("/webhook", async (req, res) => {
  // log incoming messages
  console.log("Incoming webhook message:", JSON.stringify(req.body, null, 2));

  // check if the webhook request contains a message
  // details on WhatsApp text message payload: https://developers.facebook.com/docs/whatsapp/cloud-api/webhooks/payload-examples#text-messages
  const message = req.body.entry?.[0]?.changes[0]?.value?.messages?.[0];

  // check if the incoming message contains text
  if (message?.type === "text") {
    // extract the business number to send the reply from it
    const business_phone_number_id =
      req.body.entry?.[0].changes?.[0].value?.metadata?.phone_number_id;

    // send a reply message as per the docs here https://developers.facebook.com/docs/whatsapp/cloud-api/reference/messages
    await axios({
      method: "POST",
      url: `https://graph.facebook.com/v18.0/${business_phone_number_id}/messages`,
      headers: {
        Authorization: `Bearer ${GRAPH_API_TOKEN}`,
      },
      data: {
        messaging_product: "whatsapp",
        to: message.from,
        text: { body: "Echo: " + message.text.body },
        context: {
          message_id: message.id, // shows the message as a reply to the original user message
        },
      },
    });

    // mark incoming message as read
    await axios({
      method: "POST",
      url: `https://graph.facebook.com/v18.0/${business_phone_number_id}/messages`,
      headers: {
        Authorization: `Bearer ${GRAPH_API_TOKEN}`,
      },
      data: {
        messaging_product: "whatsapp",
        status: "read",
        message_id: message.id,
      },
    });
  }

  res.sendStatus(200);
});

// accepts GET requests at the /webhook endpoint. You need this URL to setup webhook initially.
// info on verification request payload: https://developers.facebook.com/docs/graph-api/webhooks/getting-started#verification-requests
app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  // check the mode and token sent are correct
  if (mode === "subscribe" && token === WEBHOOK_VERIFY_TOKEN) {
    // respond with 200 OK and challenge token from the request
    res.status(200).send(challenge);
    console.log("Webhook verified successfully!");
  } else {
    // respond with '403 Forbidden' if verify tokens do not match
    res.sendStatus(403);
  }
});

app.get("/", (req, res) => {
  res.send(`<pre>Welcome Lee webhook.</pre>`);
});

app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`);
});
