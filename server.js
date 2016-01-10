var connect = require('connect'),
	http = require('http'),
	modRewrite = require('connect-modrewrite'),
	serveStatic = require('serve-static');

var app = connect();
app.use(modRewrite([
	function(req, res, next){
		if (req.method == 'POST') {
			res.setHeader('Location', req.url);
			res.statusCode = 303;
			res.end('');
		} else {
			next();
		}
	},
	'^[^\\.]*$ /index.html [L]'
]));
app.use(serveStatic(__dirname + '/public'));
http.createServer(app).listen(process.env.PORT || 5000);
