var Config = {
  baseUrl: "/app/data/",
  env: "development"
};

// @@ENV gets replaced by Broccoli
if ( "@@ENV" === "production") {
  Config.baseUrl = "http://localhost:9000/";
  Config.env = "production";
}

module.exports = Config;
