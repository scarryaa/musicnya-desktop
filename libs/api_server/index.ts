var process = require('process');

// Listen on a specific host via the HOST environment variable
var host = process.env.HOST || '0.0.0.0';
// Listen on a specific port via the PORT environment variable
var port = process.env.PORT || 3000;

var cors_proxy = require('cors-anywhere');
cors_proxy
	.createServer({
		originWhitelist: [], // Allow all origins
		methodWhitelist: ['GET', 'HEAD', 'POST', 'PUT', 'DELETE'],
		setHeaders: {
			origin: 'https://music.apple.com',
			'access-control-allow-origin':
				'https://music.apple.com, https://localhost:4200, https://localhost:3000',
			// set recieved headers
			'access-control-allow-headers': 'Origin, X-Requested-With, Content-Type, Accept, Range',
			'access-control-allow-methods': '*',
			'access-control-allow-credentials': 'true',
			'access-control-max-age': '86400'
		}
	})
	.listen(port, host, function () {
		console.log('Running CORS Anywhere on ' + host + ':' + port);
	});
