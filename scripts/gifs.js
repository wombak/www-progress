const https = require("https");
const fs = require("fs");
const { GIF_COUNT } = require("../src/utils");

require("dotenv").config();

const searchApi = "https://api.giphy.com/v1/gifs/search";
const apiKey = process.env.GIPHY_API_KEY;
const q = "cool";

const url = `${searchApi}?q=${q}&limit=${GIF_COUNT}&api_key=${apiKey}`;

https.get(url, res => {
  res.setEncoding("utf8");
  let body = "";

  res.on("data", data => {
    body += data;
  });

  res.on("end", () => {
    body = JSON.parse(body);
    const urls =
      body && body.data
        ? body.data.map(b => b.images.fixed_width_downsampled.url)
        : [];

    fs.writeFileSync("src/gifs.json", JSON.stringify(urls, null, 4));
  });
});

module.exports = {
  GIF_COUNT
};
