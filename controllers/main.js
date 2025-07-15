const connectDB = require("../database/connect");
const https = require("https");

const get_home = (req, res) => {
  return res.status(200).render("home.ejs");
};

const put_countries_visited = async (req, res) => {
  const db = await connectDB();
  const { country } = req.body;
  if (country !== "none") {
    await db.collection("countries").updateOne(
      { [country]: { $exists: true } },
      { $inc: { [country]: 1 } },
      { upsert: true } // if not exists, create it
    );
  }
  const data = await db
    .collection("countries")
    .find({}, { projection: { _id: 0 } })
    .toArray();

  const result = {};

  data.forEach((doc) => {
    const [key, value] = Object.entries(doc)[0];
    result[key] = value;
  });

  return res.status(200).json(result);
};

const get_countries_visited = async (req, res) => {
  const db = await connectDB();
  const data = await db
    .collection("countries")
    .find({}, { projection: { _id: 0 } })
    .toArray();

  const result = {};

  data.forEach((doc) => {
    const [key, value] = Object.entries(doc)[0];
    result[key] = value;
  });

  return res.status(200).json(result);
};

const get_location = (req, res) => {
  const { latitude, longitude } = req.body;
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

  const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${process.env.OPENCAGE_KEY}`;

  https
    .get(url, (resp) => {
      let data = "";
      resp.on("data", (chunk) => {
        data += chunk;
      });

      resp.on("end", () => {
        const json = JSON.parse(data);
        const country = json.results[0]?.components?.country || "Unknown";
        const city = json.results[0]?.components?.city || "Unknown";
        res.json({ ip, country, city });
      });
    })
    .on("error", (err) => {
      console.error("Error:", err.message);
      res.status(500).json({ error: "Failed to get location" });
    });
};

module.exports = {
  get_home,
  put_countries_visited,
  get_location,
  get_countries_visited,
};
