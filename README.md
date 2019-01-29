@weather-stuff-us/server-utils - server utilities for weather-stuff-us
================================================================================

This packages contains utility functions for use with other [weather-stuff-us][]
servers.

[weather-stuff-us]: https://weather-stuff-us.github.io/

api
================================================================================

This package exports the following functions:

## `createLogger(fileName)`

Creates a logger to write structured messages to stdout.

The `fileName` parameter should be the file name of the module using the
logger, and so is typically invoked as:

    const serverUtil = require('@weather-stuff-us/server-util)
    ...
    const logger = serverUtils.createLogger(__filename)

The logger object returned has four methods:

- `error(args ...)`
- `warn(args ...)`
- `info(args ...)`
- `debug(args ...)`

All methods take the same parameters as [`console.log()`][console.log].

[console.log]: https://nodejs.org/dist/latest-v10.x/docs/api/console.html#console_console_log_data_args

The methods write the arguments to stdout, preceded by the following:

- the date
- the time
- the level (error, warn, info, debug)
- the name of the package that used the logger
- the package-relative file name of the file that used the logger

For example:

    logger.info('a message', 42)

    2019-01-29 18:13:51.886 [INFO]  @weather-stuff-us/server-utils test/fixtures/logger-script/script.js - a message 42

Logging is influenced by the following environment variables:

- `LOG_LEVEL` - if set to `debug`, messages written with `logger.debug()` will
  be written to stdout, otherwise they won't

- `LOG_NO_TIME` - if set to any value, the date and time will not be printed

- `FORCE_COLOR` - if set to `0`, colors will not be used; if set to `1`, colors
  will be used; otherwise the [chalk][] package determines if colors will be
  used.

[chalk]: https://npmjs.org/package/chalk


install
================================================================================

This package is not available on `npm`, but can be installed from GitHub:

    npm install github:weather-stuff-us/server-utils


license
================================================================================

This package is licensed under the MIT license.  See the [LICENSE.md][] file
for more information.


contributing
================================================================================

Awesome!  We're happy that you want to contribute.

Please read the [CONTRIBUTING.md][] file for more information.


[LICENSE.md]: LICENSE.md
[CONTRIBUTING.md]: CONTRIBUTING.md
