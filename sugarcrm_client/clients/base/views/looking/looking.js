({
    tagName: 'span',
    fieldTag: 'a',

    ioSocket: undefined,

    registered: false,

    user_html: '',

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
            this.ioSocket = io.connect('http://localhost:5000');
            this.ioSocket.on('registered', _.bind(function() {
                this.registered = true;
            }, this));
            this.ioSocket.on('lookers', _.bind(function(data) {
                this.user_html = App.template.getView('looking.users')({users: _.toArray(data.people)});
                this.$el.find(this.fieldTag).data('content', this.user_html)
                debugger;
            }, this));

            app.on('app:view:change', function(name, attributes) {
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
