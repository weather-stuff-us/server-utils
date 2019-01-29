'use strict'

// run a node script, returning stdout, stderr, status, signal, error

module.exports = runScript

const childProcess = require('child_process')

function runScript (scriptName, args = [], env = {}, opts = {}) {
  args = args.slice()
  args.unshift(scriptName)

  env = Object.assign({}, process.env, env)

  opts = Object.assign({}, opts, {
    env,
    timeout: 10 * 1000,
    encoding: 'utf8',
    windowHide: true
  })

  const result = childProcess.spawnSync('node', args, opts)

  const { stdout, stderr, status, signal, error } = result
  return { stdout, stderr, status, signal, error }
}
