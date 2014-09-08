
module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-string-replace');

    var ioServer = grunt.option('server');
    ioServer = ioServer || 'http://locahost:5000'

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        config: {
            server: ioServer
        },
        shell: {
            cleanup : {
                command: 'rm -rf <%= pkg.name %>*.zip'
            },
            make_package : {
                command: [
                    'mkdir _package',
                    'cp -r sugarcrm_client/* _package',
                    'cp node_modules/socket.io-client/socket.io.js _package/include/javascript/socket.io.js'
                ].join('&&')
            },
            cleanup_pkg: {
                command: 'rm -rf _package'
            },
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
              {expand: true, cwd: '_package/', src: ['**'], dest: '../'}, // includes files in path and its subdirs
            ]
          }
        }
    });

    grunt.registerTask('package', ['shell:cleanup', 'shell:make_package', 'string-replace', 'compress:main', 'shell:cleanup_pkg']);
    grunt.registerTask('cleanup', ['shell:cleanup', 'shell:cleanup_pkg'])
};
