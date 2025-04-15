const express = require("express");
const cors = require("cors");
const request = require("request");

const app = express();
app.use(cors());

app.get("/*", (req, res) => {
  const url = req.params[0];
  if (!url) return res.status(400).send("No URL provided");
  request
    .get(url)
    .on("error", () => res.status(500).send("Error fetching stream"))
    .pipe(res);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Proxy listening on port ${PORT}`);
});
