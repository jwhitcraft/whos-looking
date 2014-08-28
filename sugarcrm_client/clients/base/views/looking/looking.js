({
    tagName: 'span',

    ioSocket: undefined,

    registered: false,

    initialize: function(options)
    {
        this._super('initialize', [options]);

        this.before('render', function() {
            return app.api.isAuthenticated();
        }, null, this);

        this.on('render', function() {
            this.$el.find('a').popover();
            if(app.user.has('id')) {
                var user = {
                    id: app.user.get('id'),
                    name: app.user.get('full_name'),
                    image: app.user.get('picture')
                };
                this.ioSocket.emit('register', user);
            }
        });

        if(app.api.isAuthenticated()) {
            this.on('init', function() {

                this.ioSocket = io.connect('http://localhost:5000');
                this.ioSocket.on('registered', _.bind(function() {
                    console.log('fuck you');
                    this.registered = true;
                }, this));
                this.ioSocket.on('lookers', _.bind(function(data) {
                    console.log(data);
                }, this));
            }, this);

            app.on('app:view:change', function(name, attributes) {
                debugger;
                if (this.registered) {
                    console.log('test', name, attributes);
                    var args = {
                        'module': attributes.module,
                        'action': name,
                        'id': attributes.modelId
                    }

                    this.ioSocket.emit('watch-page', args);
                }
            }, this);
        }
    },

    _dispose: function() {
        app.off('app:view:change', null, this);
        this.ioSocket.disconnect();
        this.ioSocket = undefined;
    }
})
