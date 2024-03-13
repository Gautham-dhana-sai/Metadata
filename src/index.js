const TestingRoutes = require("./Routes/testing_routes");
const MetaDataTest = require("./Routes/metadata_test_routes");
const YTDLRoutes = require("./Routes/ytdl_test_routes");

const routes = [MetaDataTest, YTDLRoutes, TestingRoutes];

module.exports = routes;
