var constants = require('./constants');
var stringUtils = require('./string-utils');

var mailPattern = new RegExp(constants.EMAIL);
var phonePatternCS = new RegExp(constants.PHONE_NO_CS);
var phonePatternUSDom = new RegExp(constants.PHONE_NO_US_DOMESTIC);
var phonePatternUSLoc = new RegExp(constants.PHONE_US_LOCAL);
var unitNumberPattern = new RegExp(constants.UNIT_NUMBER);
var numberUnitPattern = new RegExp(constants.NUMBER_UNIT);


exports.randomIntNumber = function (sample) {
    var str = sample.toString();
    var numDigits = str.length;
    var factor = Math.pow(10, numDigits);

    return Math.round(factor * Math.random());
};

exports.randomFloatNumber = function (sample) {
    var floatStr = sample.toString();
    var components = floatStr.split('.');
    var whole = this.randomIntNumber(components[0]);
    var fraction = this.randomIntNumber(components[1]);
    var resStr = whole.toString() + '.' + fraction.toString();
    return parseFloat(resStr);
};

exports.randomStringCore = function (len, kind, sample) {

    var text = "";
    var possible;

    switch (kind) {
        case 'all':
            if (stringUtils.lettersOnly(sample)) {
                possible = constants.LETTERS;
            } else {
                possible = constants.ALL_CHARS;
            }
            break;
        case 'num':
            possible = constants.NUMBERS;
            break;
        case 'let':
            possible = constants.LETTERS;
            break;
        default:
            possible = constants.ALL_CHARS;
    }

    for (var i = 0; i < len; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    if (sample) {
        var charCase = stringUtils.testCase(sample);
        text = stringUtils.adjustCase(text, charCase);
    }

    return text;
};

exports.handleNumbers = function (sample) {

    var floatVer = parseFloat(sample);
    var intVer = parseInt(sample);

    if (floatVer === intVer) {
        return this.randomIntNumber(sample);
    }
    return this.randomFloatNumber(sample);
};

exports.unitNumber = function (sample) {
    var arr = sample.split(' ');
    return arr[0] + ' ' + this.handleNumbers(arr[1]);
};

exports.numberUnit = function (sample) {
    var arr = sample.split(' ');
    return this.handleNumbers(arr[0]) + ' ' + arr[1];
};

exports.phoneString = function (pattern) {

    switch (pattern) {
        case phonePatternCS:
            /* +420723148511 */
            return '+420' + this.randomStringCore(9, 'num');
        case phonePatternUSDom:
            /* (541) 754-3011 */
            return '(' + this.randomStringCore(3, 'num') + ') ' + this.randomStringCore(3, 'num') + '-' + this.randomStringCore(4, 'num');
        /* 754-3011 */
        case phonePatternUSLoc:
            return this.randomStringCore(3, 'num') + '-' + this.randomStringCore(4, 'num');
    }
};

exports.emailString = function () {
    return this.randomStringCore(4, 'let').toLowerCase() + '@' + this.randomStringCore(4, 'let').toLocaleLowerCase() + '.' + this.randomStringCore(3, 'let').toLowerCase();
};

exports.randomString = function (sample, len) {

    if (mailPattern.test(sample)) {
        return this.emailString();

    } else if (phonePatternCS.test(sample)) {
        return this.phoneString(phonePatternCS);

    } else if (phonePatternUSDom.test(sample)) {
        return this.phoneString(phonePatternUSDom);

    } else if (phonePatternUSLoc.test(sample)) {

        return this.phoneString(phonePatternUSLoc);
    } else if (numberUnitPattern.test(sample)) {

        return this.numberUnit(sample);
    } else if (unitNumberPattern.test(sample)) {

        return this.unitNumber(sample);
    }
    return this.randomStringCore(len, 'all', sample);
};

// todo: implement high fidelity mode
