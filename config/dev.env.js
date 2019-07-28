'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',

  JOB_URL: '"http://127.0.0.1:9002"',
  COLLECTION_URL: '"http://127.0.0.1:9003"'
// COLLECTION_URL: '"http://47.102.199.98:9003"'
});
