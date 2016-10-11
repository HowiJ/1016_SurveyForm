var bodyParser  = require('body-parser'),
    express     = require('express'),
    path        = require('path'),
    app         = express();

app.use(express.static(path.join(__dirname, './static')));
app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

////////////////////////////////////////////////////////////
//                         Routes                         //
////////////////////////////////////////////////////////////
app.get('/', function(req, res) {
    res.render('index');
})
app.post('/results', function(req, res) {
    console.log(req.body);
    res.render('results', {data: req.body});
})


var server = app.listen(8000, function() {
    console.log('Survey Form on 8000');
})
var io = require('socket.io').listen(server);

////////////////////////////////////////////////////////////
//                        Sockets                         //
////////////////////////////////////////////////////////////
io.sockets.on('connection', function(socket) {
    console.log(socket.id);
    socket.on('send_data', function(data){
        console.log(data);
        socket.emit('receive_data', data);
    })
})
