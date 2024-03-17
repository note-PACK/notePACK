const express = require("express");
const app = express();
const axios = require("axios");
const PORT = 3000;
const CLIENT_ID = "8327f086b19ab61b8eb0";
const CLIENT_SECRET = "8eaef1b15e646e35edd54595f69647dc5b6de11b";
var cors = require("cors");

app.use(cors());
//allows us to send data to express routes in  JSON format
// app.use(bodyParser.json()); //
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static())

app.get("/getAccessToken", (req, res) => {
  const requestToken = req.query.code;
  console.log("requestToken: ", requestToken);
  const params =
    "?client_id=" +
    CLIENT_ID +
    "&client_secret=" +
    CLIENT_SECRET +
    "&code=" +
    req.query.code;
  let tokenUrl = "https://github.com/login/oauth/access_token" + params;
  console.log("CP3: params on the back-end: ", params);
  console.log("tokenUrl: ", tokenUrl);

  axios({
    method: "post",
    url: tokenUrl,
    headers: {
      accept: "application/json",
    },
  }).then((response) => {
    const accessToken = response.data.access_token;
    console.log("CP4: ", response.data);
    //send response.data back to front end
    res.json(response.data);
  });
});

app.get("/getUserData", (req, res) => {
  console.log("**CP 8B**");
  req.get("Authorization");
  const userDataUrl = "https://api.github.com/user";

  axios({
    method: "GET",
    url: userDataUrl,
    headers: {
      Authorization: req.get("Authorization"),
    },
  }).then((response) => {
    res.json(response.data);
  });
});

app.use((req, res) => res.sendStatus(404));

app.use((err, req, res, next) => {
  const defaultErr = {
    log: `Express error handler caught unknown error: ${err}`,
    status: 500,
    message: { err: "An error occured" },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`CORS Server listening on port: ${PORT}`);
});

module.exports = app;
