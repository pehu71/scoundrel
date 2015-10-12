exports.testCase = function (sample) {
    var small = 0, big = 0;
    var bigPos = -1;

    for (var i = 0; i < sample.length; i++) {
        if (sample[i].toLowerCase() === sample[i]) small++;
        if (sample[i].toUpperCase() === sample[i]) {
            big++;
            bigPos = i;
        }
    }
    if (small === 0) return 'ALL_BIG';
    if (big === 0) return 'ALL_SMALL';
    if (big === 1 && bigPos === 0) return 'FIRST_BIG';
    return 'MIXED';
};

exports.adjustCase = function (sample, charCase) {
    switch (charCase) {
        case 'ALL_SMALL':
            return sample.toLowerCase();
            break;
        case 'ALL_BIG':
            return sample.toUpperCase();
            break;
        case 'MIXED':
            return sample;
            break;
        case 'FIRST_BIG':
            var arr = [];
            for (var i = 0; i < sample.length; i++) {
                if (i === 0) {
                    arr.push(sample[i].toUpperCase());
                } else {
                    arr.push(sample[i].toLowerCase());
                }
            }
            return arr.toString().replace(/,/g, '');
            break;
    }
};

exports.lettersOnly = function (sample) {
    for (var i = 0; i < sample.length; i++) {
        var tmp = parseInt(sample[i]);
        if (!isNaN(tmp)) {
            return false;
        }
    }
    return true;
};
