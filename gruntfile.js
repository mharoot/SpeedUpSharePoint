module.exports = function (grunt) { 
        require("matchdep")
        .filterDev("grunt-*")
        .filter(pkg => pkg !== "grunt-cli")
        .forEach(grunt.loadNpmTasks);
  
        // Project configuration. 
        grunt.initConfig({ 
            pkg: grunt.file.readJSON('package.json'), 
            cssmin: { 
                sitecss: { 
                    options: { 
                        banner: '' 
                    }, 
                    files: { 
                        './assets/css/master.min.css': [
                            './components/accordion/accordion.css',
                            './components/ada/ada.css',
                            './components/faq/faq.css',
                            './components/font-awesome/font-awesome.css',
                            './components/main/main.css',
                            './components/cost-calculator/cost-calculator.css',
                        ],
                    } 
                } 
            }, 
            uglify: { 
                options: { 
                    compress: true 
                }, 
                my_target: {
                    files: {
                        './assets/js/master.min.js': [
                            './components/accordion/accordion.js',
                            './components/ada/ada.js',
                            // './components/faq/faq.js',
                            // './components/font-awesome/font-awesome.js',
                            './components/main/main.js',
                            './components/cost-calculator/law.js',
                        ],
                    }
                }
            },
            watch: {
                css: {
                    files: ['./components/**/**/*.css'],
                    tasks: ['cssmin'],
                    options: {
                        spawn: false,
                    },
                },
                js: {
                    files: ['./components/**/**/*.js'],
                    tasks: ['uglify'],
                    options: {
                        spawn: false,
                    },
                },
            },
        }); 
        // Default task. 
        grunt.registerTask('default', ['uglify', 'cssmin', 'watch']); 
    };