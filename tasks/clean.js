const rimraf = require('rimraf');

rimraf('+(test|src)/**/*.+(js|map)', err => {
    if (err) {
        console.error(err);
    } else {
        console.log('Clean done');
    }
});