var constants = require('./constants');
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
            return '+420' + this.randomIntLikeString(9);
        case phonePatternUSDom:
            /* (541) 754-3011 */
            return '(' + this.randomIntLikeString(3) + ') ' + this.randomIntLikeString(3) + '-' + this.randomIntLikeString(4);
        /* 754-3011 */
        case phonePatternUSLoc:
            return this.randomIntLikeString(3) + '-' + this.randomIntLikeString(4);
    }
};

exports.emailString = function (sample) {
    var parts = sample.split('@');
    var domain = parts[1].split('.');
    return this.hiFiRandomString(parts[0]) + '@' + this.hiFiRandomString(domain[0]) + '.' + this.hiFiRandomString(domain[1]);
};

exports.randomIntLikeString = function (len) {
    var text = '';
        for (var i = 0; i < len; i++)
        text += constants.NUMBERS.charAt(Math.floor(Math.random() * constants.NUMBERS.length));

    return text;
};

exports.hiFiRandomString = function (sample) {

    var text = '';

    for (var i = 0; i < sample.length; i++) {

        var s = sample[i];

        if (/^[aeiouy]$/.test(s)) {
            text += constants.SMALL_VOWELS.charAt(Math.floor(Math.random() * constants.SMALL_VOWELS.length));
        } else if (/^[AEIOUY]$/.test(s)) {
            text += constants.VOWELS.charAt(Math.floor(Math.random() * constants.VOWELS.length));
        } else if (/^[bcdfghjklmnpqrstvwxz]$/.test(s)) {
            text += constants.SMALL_CONSONANTS.charAt(Math.floor(Math.random() * constants.SMALL_CONSONANTS.length));
        } else if (/^[BCDFGHJKLMNPQRSTVWXZ]$/.test(s)) {
            text += constants.CONSONANTS.charAt(Math.floor(Math.random() * constants.CONSONANTS.length));
        } else if (/^[0-9]$/.test(s)) {
            text += constants.NUMBERS.charAt(Math.floor(Math.random() * constants.NUMBERS.length));
        } else {
            text += s;
        }
    }
    return text;
};

exports.randomString = function (sample) {

    if (mailPattern.test(sample)) {
        return this.emailString(sample);

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

    return this.hiFiRandomString(sample);
};
