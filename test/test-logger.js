'use strict'

const GENERATE_EXPECTED_FILES = false

const DATE_LEN = '2019-01-29 16:58:36.330'.length
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}.\d{3} /

const fs = require('fs')
const path = require('path')

const runTest = require('./lib/test-runner')(__filename)
const runScript = require('./lib/run-script')

runTest(async function nocolor (t) {
  testResult(t, 'nocolor', { FORCE_COLOR: '0' })
})

runTest(async function nocolorDebug (t) {
  testResult(t, 'nocolor-debug', { FORCE_COLOR: '0', LOG_LEVEL: 'debug' })
})

runTest(async function nocolorNotime (t) {
  testResult(t, 'nocolor-notime', { FORCE_COLOR: '0', LOG_NO_TIME: 'on' })
})

runTest(async function color (t) {
  testResult(t, 'color', { FORCE_COLOR: '1' })
})

runTest(async function colorDebug (t) {
  testResult(t, 'color-debug', { FORCE_COLOR: '1', LOG_LEVEL: 'debug' })
})

runTest(async function colorNotime (t) {
  testResult(t, 'color-notime', { FORCE_COLOR: '1', LOG_NO_TIME: 'on' })
})

// test the result of running the script
function testResult (t, expected, env) {
  const script = path.join(__dirname, 'fixtures', 'logger-script', 'script.js')
  const result = runScript(script, [], env)

  // basic stuff
  t.equals(result.stderr, '', 'stderr should be null')
  t.equals(result.status, 0, 'status should be 0')
  t.equals(result.signal, null, 'signal should be null')
  t.equals(result.error, undefined, 'error should be undefined')

  const actualLines = splitLines(result.stdout)

  const expectedFile = path.join(__dirname, 'fixtures', 'logger-script', `expected-${expected}.txt`)

  // useful when creating new tests :-)
  if (GENERATE_EXPECTED_FILES) {
    fs.writeFileSync(expectedFile, result.stdout)
  }

  const expectedLines = splitLines(fs.readFileSync(expectedFile, 'utf8'))

  const noTime = env.LOG_NO_TIME != null
  if (!noTime) {
    checkDateInLines(t, expectedLines)
  }

  const aLines = noTime ? actualLines : removeDateInLines(actualLines)
  const eLines = noTime ? expectedLines : removeDateInLines(expectedLines)

  t.same(aLines, eLines, 'stdout should be as expected')
  t.end()
}

function checkDateInLines (t, lines) {
  for (const line of lines) {
    t.ok(DATE_PATTERN.test(line), 'line should have date/time at beginning')
  }
}

function removeDateInLines (lines) {
  return lines.map(line => line.slice(DATE_LEN))
}

function splitLines (string) {
  return string.trim().split('\n').map(line => line.trim())
}
