({
    tagName: 'span',
    fieldTag: 'a',

    ioSocket: undefined,

    registered: false,

    users: [],

    count: 0,

    initialize: function(options)
    {
        this._super('initialize', [options]);
        if(app.api.isAuthenticated()) {
            this.ioSocket = io.connect('http://localhost:5000');
            this.ioSocket.on('registered', _.bind(function() {
                this.registered = true;
            }, this));
            this.ioSocket.on('lookers', _.bind(function(room, data) {
                this.count = _.size(data);
                this.users = data;
                this.render();
            }, this));

            app.on('app:view:change', function(name, attributes) {
                var page = {
                    'module': attributes.module,
                    'action': name,
                    'id': attributes.modelId
                }
                if (this.registered) {
                    this.ioSocket.emit('look-at-page', page);
                } else {
                    var user = {
                        id: app.user.get('id'),
                        name: app.user.get('full_name'),
                        image: app.user.get('picture')
                    };

                    this.ioSocket.emit('register', user, page);
                }
            }, this);
        } else {
            // we are not rendered, so listen to before('render') and stop it
            this.before('render', function() {
                return false;
            }, null, this);
        }
    },

    _dispose: function() {
        app.off('app:view:change', null, this);
        if(this.ioSocket) {
            this.ioSocket.disconnect();
            this.ioSocket = undefined;
        }
    }
})
