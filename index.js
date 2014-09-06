var _ = require('lodash'),
    socketio = require('socket.io')(),
    person = require('./libs/person'),
    http = require('http'),
    app = require('express')(),
    server = http.createServer(app),
    port = process.env.PORT || 5000
    people = {},
    io = socketio.listen(server);

server.listen(port);

/**
 * Generate Room Name based on what is passed in
 */
function generateRoomName(module, action, id) {
    var name = module + '---' + action;

    if (!_.isUndefined(id)) {
        name += '---' + id;
    }

    return name;
}

/**
 * Find Users in a given room
 */
function findClientsSocket(roomId, namespace) {
    var res = [],
        ns = io.of(namespace || '/');    // the default namespace is "/"
    if (ns && ns.adapter.rooms[roomId]) {
        _.forEach(_.keys(ns.adapter.rooms[roomId]), function(socket_id) {
            // todo: make sure we only brodcast back unique users.
            if(!_.isUndefined(people[socket_id])) {
                res.push(people[socket_id]);
            }
        });
    }
    return res;
}

/**
 * Broadcast a message to all sockets a given room
 */
function broadcastRoomCount(room)
{
    clients = findClientsSocket(room)
    console.log('broadcastFor: ' + room, clients);
    io.sockets.in(room).emit('lookers', room, clients);
}

/**
 * Switch what page a socket is looking at
 */
function lookAtPage(socket, page)
{
    if (socket.room) {
        socket.leave(socket.room);
        broadcastRoomCount(socket.room)
    }

    socket.room = generateRoomName(page.module, page.action, page.id);
    socket.join(socket.room);
    broadcastRoomCount(socket.room)
}

/**
 * Do the Server Stuff here
 */
io.on('connection', function(socket){
    /**
     * Clean up on Disconnect
     */
    socket.on('disconnect', function() {
        // need to loop over everything to find the user and
        var person = people[socket.id];
        console.log('disconnected', people[socket.id]);
        delete people[socket.id];
        // leave the room
        socket.leave(socket.room);
    });

    /**
     * Register a new socket with the user info and the starting page
     */
    socket.on('register', function(user, page) {
        if (_.isUndefined(people[socket.id])) {
            console.log('register', user);
            people[socket.id] = new person(user, socket);
        }

        lookAtPage(socket, page);
    });

    /**
     * Change what page is being looked at for a socket
     */
    socket.on('look-at-page', function(page) {
        lookAtPage(socket, page);
    });
});
