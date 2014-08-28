var _ = require('lodash'),
    socketio = require('socket.io')(),
    person = require('./libs/person'),
    records = require('./libs/records')(),
    http = require('http'),
    app = require('express')(),
    server = http.createServer(app),
    port = process.env.PORT || 5000
    sockets = [],
    people = {},
    io = socketio.listen(server);

server.listen(port);

io.on('connection', function(socket){
    console.log('connected');
    socket.on('disconnect', function() {
        // need to loop over everything to find the user and
        console.log('disconnected');
        delete people[socket.id];
    });

    socket.on('register', function(user) {
        console.log('register', user);
        people[socket.id] = new person(user, socket);
        sockets.push(socket);
    })

    socket.on('leave-page', function(args) {
        var rec = records.getRecord(args.module, args.page);
        console.log('leave-page: ' + args.module + ' -- ' + args.page);
        rec.removeLooker(people[socket.id]);
    });

    socket.on('watch-page', function(args) {
        var rec = records.getRecord(args.module, args.page);
        console.log('watch-page: ' + args.module + ' -- ' + args.page);
        rec.addLooker(people[socket.id]);
    });

    socket.on('get-lookers', function(args) {
        console.log('get-lookers: ' + args.module + ' -- ' + args.page);
        var rec = records.getRecord(args.module, args.page);
        socket.emit('lookers', { 'count' : rec.count(), 'people': rec.getLookers() });
    });
});
