'use strict';

var path = require('path');
var fs = require('fs');

exports.getStaticContent = function (filePath) {
    var ext = path.extname(filePath).toLowerCase();
    switch (ext) {
        case '.html':
        case '.htm':
            return ['text/html; charset=utf-8', this.makeBuffer(filePath, false)];
        case '.json':
            return ['application/json', JSON.parse(this.makeBuffer(filePath, false))];
        case '.png':
            return ['image/png', this.makeBuffer(filePath, true)];
        case '.jpg':
        case '.jpeg':
            return ['image/jpeg', this.makeBuffer(filePath, true)];
        case 'gif':
            return ['image/gif', this.makeBuffer(filePath, true)];
        default:
            return ['text/html; charset=utf-8', 'Unsupported file type'];
    }
};

exports.makeBuffer = function (path, isBinary) {
    try {
        fs.accessSync(path);
    } catch (err) {
        var errStr = 'The configuration file path is incorrect or configuration file is an empty file.\r\n';
        console.error(colors.red(errStr));
        return errStr;
    }
    return isBinary ? fs.readFileSync(path) : fs.readFileSync(path, 'utf8');
};
