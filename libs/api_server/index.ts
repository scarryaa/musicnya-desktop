var process = require("process");

// Listen on a specific host via the HOST environment variable
var host = process.env.HOST || "0.0.0.0";
// Listen on a specific port via the PORT environment variable
var port = process.env.PORT || 3000;

var cors_proxy = require("cors-anywhere");
cors_proxy
  .createServer({
    originWhitelist: [], // Allow all origins
    setHeaders: {
      origin: "https://music.apple.com",
      'access-control-allow-origin': 'https://music.apple.com, https://localhost:4200, https://localhost:3000',
    },
  })
  .listen(port, host, function () {
    console.log("Running CORS Anywhere on " + host + ":" + port);
  });