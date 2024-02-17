const path = require('path');

module.exports = {
    // other webpack configurations...
    resolve: {
        fallback: {
            "path": require.resolve("path-browserify"),
            "os": require.resolve("os-browserify/browser"),
            "crypto": require.resolve("crypto-browserify")
        }
    }
};


