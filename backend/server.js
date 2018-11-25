/**
 * Module dependencies
 */
var cors = require('cors');
    async = require('async'),
    uuid = require('node-uuid'),
    fs = require('fs'),
    express = require('express'),
    bodyParser = require('body-parser'),
    errorHandler = require('errorhandler'),
    morgan = require('morgan'),
    api = require('./routes/api'),
    http = require('http'),
    path = require('path'),
    _ = require('lodash');

var app = module.exports = express();


/**
 * Configuration
 */

// all environments
app.set('port', process.env.PORT || 3030);
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '..', 'app')));
app.use(express.static(path.join(__dirname, '..', 'bower_components')));

var env = process.env.NODE_ENV || 'development';

// development only
if (env === 'development') {
  app.use(errorHandler());
}

// production only
if (env === 'production') {
  // TODO
}


/**
 * Routes
 */

var logger = require('log4js').getLogger('server.js');
var connections = {};
var history = {};

var router = express.Router();

router.get('/events', function (req, res) {
  // let request last as long as possible
  req.socket.setTimeout(0);

  var conn = {
    id: uuid.v4(),
    send: function (body) {
      res.write(body);
    }
  };
  connections[conn.id] = conn;

  // send headers for event-stream connection
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'X-Accel-Buffering': 'no' // Disable buffering for nginx
  });
  res.write('\n');
  res.write(Array(2049).join(' ') + '\n'); // 2kb padding for IE
  res.write(latest_events());

  req.on('close', function () {
    delete connections[conn.id];
  });
});

router.get('/dashboards/', function (request, response) {
    var result = [],
        rootNamespacesFolder = path.join(__dirname, '..', 'views', 'dashboards');

    if (!fs.existsSync(rootNamespacesFolder)) {
        rootNamespacesFolder = path.join(__dirname, '..', 'app', 'views', 'dashboards');
    }

    fs.readdir(rootNamespacesFolder, function (error, namespaces) {
        if (!error) {
            async.each(namespaces, function (namespace, callback) {
                var namespaceFolder = path.join(rootNamespacesFolder, namespace);
                if (fs.existsSync(namespaceFolder) && fs.statSync(namespaceFolder).isDirectory()) {
                    var currentNamespaceDashboards = [];
                    fs.readdir(namespaceFolder, function (err, namespacesDashboards) {
                        if (!err) {
                            namespacesDashboards.forEach(function (dashboard) {
                                currentNamespaceDashboards.push(dashboard.replace('.html', ''));
                            });

                            result.push({ "namespace": namespace, "dashboards": currentNamespaceDashboards});
                            callback();
                        }
                        else {
                            callback(err);
                        }
                    });
                }
                else {
                    callback();
                }
            },
            function (err) {
                if (!!err) {
                    response.status(500).send(err);
                }
                else {
                    response.send(result);
                }
            });
        }
        else {
            response.status(500).send(error);
        }
    });
});

router.get('/dashboards/:namespace', function (req, res) {
    var namespace = req.params.namespace;
    var result = [];

    var root = path.join(__dirname, '..', 'views', 'dashboards', namespace);
    if (!fs.exists(root)) {
        root = path.join(__dirname, '..','app', 'views', 'dashboards', namespace);
    }

    fs.readdir(root, function (err, files) {
        logger.trace('readdir [',root,']', files);
        async.each(files, function (file, callback) {
           fs.readFile(path.join(root, file), function (err, content) {
               content = content.toString();
               var description = null;
               var descriptionLine = '<!--description';

               if (content.indexOf(descriptionLine) >= 0) {
                   description = content.substring(descriptionLine.length, content.indexOf('-->'));
               }

               result.push({'name' : file.replace('.html',''), 'description' : description});
               callback();
           });
        }, function (err) {
            if (!!err) {
                result.status(500).send(err);
            }
            else {
                res.send(result);
            }
        });
    });
});

function send_event(id, body) {
    body.id = id;
    body.updatedAt = Date.now();
    var event = format_event(body);
    history[id] = event;
    for (var k in connections) {
        connections[k].send(event);
    }
}
global.send_event = send_event;

function format_event(body) {
    return 'data: ' + JSON.stringify(body) + '\n\n'; // won't work otherwise..
}

function latest_events() {
    var str = [];
    for (var id in history) {
        str.push(history[id]);
    }
    return str.join('');
}

// Load jobs files
var job_path = process.env.JOB_PATH || [__dirname, 'jobs'].join(path.sep);
fs.readdir(job_path, function (err, files) {
    if (err) throw err;
    for (var i in files) {
        var file = [job_path, files[i]].join(path.sep);
        if (file.match(/(\w*)\.job\.(js|coffee)$/)) {
            logger.trace('Loading job file:', files[i]);
            require(file);
        }
    }
});

app.use(router);

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
