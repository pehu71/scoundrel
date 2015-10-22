var packageJson = require('../package.json');
var colors = require('colors/safe');

exports.printHelp = function () {
    var str = '\r\nScoundrel command line options:\r\n\r\n'
        + '--help\t\tdisplays this help\r\n'
        + '--ver\t\tdisplays version information\r\n'
        + '\<config.js>\truns scoundrel with given configuration.\r\n\r\n'
        + 'You can specify full path or just a name if your configuration file resides in the Scoundrel directory.\r\n\r\n'
        + 'All command line parameters are mutually exclusive, Scoundrel accepts just one at a time.\r\n'
        + 'If you specify no parameter, Scoundrel will run with its default \"config.js\" file placed in its root directory.';
    console.log(str);
};

exports.printVersion = function () {
    var str = '\r\n' + packageJson.version;
    console.log(str);
};

exports.printRunningDefault = function () {
    var str = 'Since there was no config file specified, Scoundrel is running with its default "config.js"';
    console.log(colors.yellow(str));
};

exports.checkRoutes = function (config) {
    var result = [];

    config.routes.forEach(function (part, index) {
        if (!part.hasOwnProperty('pathPattern')) result.push('route[' + index + '] missing "pathPattern"');
        if (!part.hasOwnProperty('method')) result.push('route[' + index + '] missing "method"');
        if (!part.hasOwnProperty('requiredStatus')) result.push('route[' + index + '] missing "requiredStatus"');
        if (!part.hasOwnProperty('responseData') && !part.hasOwnProperty('responseString') && !part.hasOwnProperty('fileName'))
            result.push('route[' + index + '] missing either "responseData" or "responseString" or "fileName"');
     });

    return result;
};

exports.printBadConfig = function (errorInfo) {

    console.log(colors.red('There are errors in your route definitions. See list below:'));

    errorInfo.forEach(function (part, index) {
        console.log(colors.red(part));
    });
    console.log(colors.red('Exiting scoundrel intentionally due to configuration error'));
};
