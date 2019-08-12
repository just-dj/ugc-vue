'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',

  SERVER_URL: '"http://127.0.0.1:9002"',
  // SERVER_URL: '"http://192.168.0.101:9002"',
});
