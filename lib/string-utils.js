var packageJson = require('../package.json');

exports.printHelp = function () {
    var str = '\r\nScoundrel command line options:\r\n\r\n'
        + '--help\t\tdisplays this help\r\n'
        + '--ver\t\tdisplays version information\r\n'
        + '\<config.js>\truns scoundrel with given configuration.\r\n\r\n'
        + 'You can specify full path or just a name if your configuration file resides in the Scoundrel directory\r\n\r\n'
        + 'All command line parameters are mutually exclusive, Scoundrel accepts just one at a time.\r\n'
        + 'If you specify no parameter, you\'ll get this poor help.';
    console.log(str);
};

exports.printVersion = function () {
    var str = '\r\n' + packageJson.version;
    console.log(str);
};
