const TestingRoutes = require("./TestRoutes/testing_routes");
const MetaDataTest = require("./TestRoutes/metadata_test_routes");
const YTDLRoutes = require("./TestRoutes/ytdl_test_routes");
const YTSRoutes = require("./TestRoutes/yt_search_routes");
const SignupRoutes = require("./Authentication/signup");
const LoginRoutes = require("./Authentication/login");

const routes = [
  MetaDataTest,
  YTDLRoutes,
  YTSRoutes,
  TestingRoutes,
  SignupRoutes,
  LoginRoutes,
];

module.exports = routes;
