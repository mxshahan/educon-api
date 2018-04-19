const shell = require('shelljs');

shell.exec('echo "Starting server side unit testing"');
shell.exec('jest --forceExit');
