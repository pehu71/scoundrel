var stringUtils = require('../lib/string-utils');
var constants = require('../lib/constants');

describe('function testCase', function () {


    it('constants.NUMBER_UNIT', function () {
        var reg = new RegExp(constants.NUMBER_UNIT);
        var str = '123.5 USE';
        var b = reg.test(str);

        expect(b).toBe(true);
    });

    it('constants.UNIT_NUMBER', function () {
        var reg = new RegExp(constants.UNIT_NUMBER);
        var str = 'CZK 125.6';

        var b = reg.test(str);
        expect(b).toBe(true);
    });


});


