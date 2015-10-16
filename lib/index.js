'use strict';
var config;
var configPath;
var packageJson = require('../package.json');
var constants = require('./constants');
var randomHelper = require('./random-helper');
var path = require('path');
var stringUtils = require('./string-utils');
var http = require('http');
var fs = require('fs');
var colors = require('colors/safe');

var loadConfig = function () {

    if (process.argv[2] === undefined) {
        stringUtils.printHelp();
        return false;
    } else if (process.argv[2].toLowerCase() === '--help') {
        stringUtils.printHelp();
        return false;
    } else if (process.argv[2].toLowerCase() === '--ver') {
        stringUtils.printVersion();
        return false;
    } else if (process.argv[2].match(/^--/) || process.argv[2].match(/^-/)) {
        stringUtils.printHelp();
        return false;
    }

    if (path.isAbsolute(process.argv[2])) {
        configPath = process.argv[2];
    } else {
        configPath = path.resolve(__dirname, '../', process.argv[2]);
    }

    if (configPath !== undefined) {
        try {
            fs.accessSync(configPath);
        } catch (err) {
            console.error(colors.red("The configuration file path is incorrect or configuration file is an empty file.\r\n"));
            return false;
        }
        config = require(configPath).getConfig();
    } else {
        console.error(colors.red('The configuration file was not specified.'));
        return false;
    }
    return true;
};

var modifyGivenObject = function (givenObj) {

    var keys = Object.keys(givenObj);
    var len = keys.length;

    for (var j = 0; j < len; j++) {

        switch (typeof givenObj[keys[j]]) {
            case 'number':
                givenObj[keys[j]] = randomHelper.handleNumbers(givenObj[keys[j]]);
                break;
            case 'string':
                givenObj[keys[j]] = randomHelper.randomString(givenObj[keys[j]], givenObj[keys[j]].length);
                break;
            case 'object':
                if (Array.isArray(givenObj[keys[j]])) {
                    givenObj[keys[j]] = modifyArray(givenObj[keys[j]]);
                } else {
                    givenObj[keys[j]] = modifyGivenObject(givenObj[keys[j]]);
                }
                break;
        }
    }
    return givenObj;
};

var modifyArray = function (arr) {

    arr.forEach(function (part, index, theArray) {
        switch (typeof part) {
            case 'number':
                theArray[index] = randomHelper.handleNumbers(part);
                break;
            case 'string':
                theArray[index] = randomHelper.randomString(part, part.length);
                break;
            case 'object':
                if (Array.isArray(part)) {
                    theArray[index] = modifyArray(part);
                } else {
                    theArray[index] = modifyGivenObject(part);
                }
                break;
        }
    });
    return arr;
};

var makeUniformArray = function (obj, n) {

    var result = [];
    for (var i = 0; i < n; i++) {
        result.push(obj);
    }
    return result;
};

var makeRandomArray = function (obj, n) {

    var result = [];
    for (var i = 0; i < n; i++) {

        var cloneOfObj = JSON.parse(JSON.stringify(obj));
        cloneOfObj = modifyGivenObject(cloneOfObj);
        result.push(cloneOfObj);
    }
    return result;
};

var getStatusCodeObject = function (code) {

    var codeObjects = constants.HTTP_STATUS_CODES;
    for (var i = 0; i < codeObjects.length; i++) {
        if (codeObjects[i].CODE === code) {
            return codeObjects[i];
        }
    }
    return codeObjects[0];
};

var shouldReturnData = function (status) {
    return status >= 200 && status < 400;
};

var resolveRoute = function (url, method) {

    var len = config['routes'].length
        , unMatchedPath;

    for (var i = 0; i < len; i++) {

        var route = config.routes[i];
        var pat = new RegExp(route.pathPattern);
        var urlMatch = pat.test(url);
        var methodMatch = method.toUpperCase() === route.method.toUpperCase();

        if (!urlMatch) {
            if (i === len - 1) unMatchedPath = url;
            continue;
        }
        var statusObj = getStatusCodeObject(route.requiredStatus);

        if (methodMatch) {

            if (route.responseData === undefined && route.responseString === undefined) {
                return 'Neither responseData nor responseString defined for this route';
            }

            if (route.responseData === undefined) {
                return {
                    status: statusObj,
                    data: route.responseString
                }
            } else if (route.responseData.entityCount > 1 || (route.responseData.entityCount <= 1 && route.responseData.alwaysReturnArray)) {

                if (route.responseData.modifyRandomly && route.responseData.entityCount > 1) {

                    return {
                        status: statusObj,
                        data: makeRandomArray(route.responseData.dataModel, route.responseData.entityCount)
                    };
                } else {

                    return {
                        status: statusObj,
                        data: makeUniformArray(route.responseData.dataModel, route.responseData.entityCount)
                    };
                }
            } else if (route.responseData.entityCount === 1) {

                return {
                    status: statusObj,
                    data: route.responseData.dataModel
                };
            } else {

                return {
                    status: statusObj,
                    data: {}
                };
            }
        }
    }
    var errorString = '';

    if (!urlMatch) {
        errorString += 'route not matched' + (unMatchedPath !== undefined ? ' "' + unMatchedPath + '"' : '');
    }
    if (!methodMatch) {
        errorString += errorString.length === 0 ? 'method not matched' : ', method not matched';
    }
    return errorString;
};

var runServer = function () {

    var server = http.createServer(function (request, response) {

        var startTime = new Date().getTime();
        var logString
            ,resString
            ,contentType
            ,isJson;

        var res = resolveRoute(request.url, request.method);
        var allOk = typeof res === 'object';

        if (typeof res.data === 'object') {
            contentType = 'application/json';
            isJson = true;
        } else {
            contentType = 'text/html; charset=utf-8';
            isJson = false;
        }

        if (allOk) {

            if (shouldReturnData(res.status.CODE)) {
                resString = isJson ? JSON.stringify(res.data) : res.data;
            } else {
                resString = JSON.stringify('');
            }

            response.writeHead(res.status.CODE, res.status.MSG, {
                'Content-Length': resString.length,
                'Content-Type': contentType,
                'Server': 'Scoundrel (' + packageJson.version + ')',
                'X-Powered-By': 'Node.js'
            });

            logString = 'Success: route "' + request.url + '" matched, returning ' + res.status.CODE
                + '(' + res.status.MSG + ')';

        } else {

            resString = JSON.stringify({message: res});

            response.writeHead(500, 'Scoundrel specific Error', {
                'Content-Length': resString.length,
                'Content-Type': 'application/json',
                'Server': 'Scoundrel (' + packageJson.version + ')',
                'X-Powered-By': 'Node.js'
            });

            logString = 'Fail: ' + res + ', returning 500';
        }
        response.write(resString);
        response.end();

        var delta = new Date().getTime() - startTime;
        if (allOk) {
            console.log(colors.green(logString + ', (' + delta + ' ms)'));
        } else {
            console.log(colors.red(logString + ', (' + delta + ' ms)'));
        }
    });

    server.listen(config.port);
    console.log(colors.green('Scoundrel v.' + packageJson.version + ' listening on ' + config.port + '...'));
};

if (loadConfig()) {
    runServer();
}