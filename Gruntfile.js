
module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-string-replace');

    var ioServer = grunt.option('server');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            package: ["_package"],
            zip: ['<%= pkg.name %>*.zip']
        },
        config: {
            server: ioServer || 'http://locahost:5000'
        },
        copy: {
            package: {
                files: [
                    // includes files within path and its sub-directories
                    {
                        expand: true,
                        cwd: 'sugarcrm_client',
                        src: ['**'],
                        dest: '_package/'
                    },
                    {
                        expane: true,
                        src: ['node_modules/socket.io-client/socket.io.js'],
                        dest: '_package/include/javascript/socket.io.js'
                    }
                ]
            }
        },
        'string-replace': {
            server: {
                options: {
                    replacements: [
                        {
                            pattern: 'ioServer: \'http://localhost:5000\',',
                            replacement: 'ioServer: \'<%= config.server %>\','
                        }
                    ]
                },
                files: {
                    '_package/clients/base/views/looking/looking.js' : '_package/clients/base/views/looking/looking.js'
                }
            },
            pubdate: {
                options: {
                    replacements: [
                        {
                            pattern: '{{pubdate}}',
                            replacement: grunt.template.today("yyyy-mm-dd HH:MM:ss")
                        }
                    ]
                },
                files: {
                    '_package/manifest.php' : '_package/manifest.php'
                }
            }
        },
        compress: {
          main: {
            options: {
              archive: '<%= pkg.name %>-<%= grunt.template.today("mmddyyyy") %>.zip'
            },
            files: [
              {expand: true, cwd: '_package/', src: ['**'], dest: '../'}
            ]
          }
        }
    });

    grunt.registerTask('package', ['clean', 'copy', 'string-replace', 'compress:main', 'clean:package']);
};
