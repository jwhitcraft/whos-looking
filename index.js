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
    socket.emit('connected');
    socket.on('disconnect', function() {
        // need to loop over everything to find the user and
        var person = people[socket.id];
        console.log('current_record: ' + person.current_record);

        if(!_.isUndefined(person.current_record)) {
            c_record = records.getRecordByName(person.current_record);
            if(!_.isUndefined(c_record)) {
                c_record.removeLooker(person);
            }
        }
        console.log('disconnected', people[socket.id]);
        delete people[socket.id];
    });

    socket.on('register', function(user) {
        console.log('register', user);
        people[socket.id] = new person(user, socket);
        sockets.push(socket);
        socket.emit('registered');
    })

    socket.on('leave-page', function(args) {
        var rec = records.getRecord(args.module, args.action, args.id);
        console.log('leave-page: ' + rec.name);
        rec.removeLooker(people[socket.id]);
    });

    socket.on('watch-page', function(args) {
        var rec = records.getRecord(args.module, args.action, args.id);
        var person = people[socket.id];
        console.log('current_record: ' + person.current_record);

        if(!_.isUndefined(person.current_record)) {
            c_record = records.getRecordByName(person.current_record);
            if(!_.isUndefined(c_record)) {
                c_record.removeLooker(person);
            }
        }

        rec.addLooker(person);
        console.log('watch-page: ' + rec.name);

        // send back the lookers for the current page
        var looker_data ={ 'count' : rec.count(), 'people': rec.getLookers() };
        console.log(looker_data);
        socket.emit('lookers', looker_data);
    });

    socket.on('get-lookers', function(args) {
        var rec = records.getRecord(args.module, args.action, args.id);
        console.log('get-lookers: ' + rec.name);
        socket.emit('lookers', { 'count' : rec.count(), 'people': rec.getLookers() });
    });
});
