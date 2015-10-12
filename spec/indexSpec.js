var stringUtils = require('../lib/string-utils');

describe('function testCase', function () {


    it('should return proper mode by case', function () {

        var res = stringUtils.lettersOnly('aklaa');
        expect(res).toBe(true);
    });


});


