exports.EMAIL = "^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,8})$";
exports.PHONE_NO_US_DOMESTIC = "^(\\+\\d{1,2}\\s)?\\(?\\d{3}\\)?[\\s.-]\\d{3}[\\s.-]\\d{4}$";
exports.PHONE_US_LOCAL = "^\\d{3}[\\s.-]\\d{4}$";
exports.PHONE_NO_CS = "^((?:\\+|00)420)? ?(\\d{3}) ?(\\d{3}) ?(\\d{3})$";
exports.NUMBER_UNIT = "^[0-9\\.]+\\s[^0-9]+$";
exports.UNIT_NUMBER = "^[^0-9]+\\s[0-9\\.]+$";
exports.VOWELS = "AEIOUY";
exports.SMALL_VOWELS = "aeiouy";
exports.CONSONANTS = "BCDFGHJKLMNPQRSTVWXZ";
exports.SMALL_CONSONANTS = "bcdfghjklmnpqrstvwxz";
exports.NUMBERS = "0123456789";

exports.HTTP_STATUS_CODES = [
    {
        CODE: 200,
        MSG: 'OK'
    },
    {
        CODE: 206,
        MSG: 'Partial Content'
    },
    {
        CODE: 301,
        MSG: 'Moved Permanently'
    },
    {
        CODE: 302,
        MSG: 'Found'
    },
    {
        CODE: 304,
        MSG: 'Not Modified'
    },
    {
        CODE: 307,
        MSG: 'Temporary Redirect'
    },
    {
        CODE: 400,
        MSG: 'Bad Request'
    },
    {
        CODE: 401,
        MSG: 'Unauthorized'
    },
    {
        CODE: 403,
        MSG: 'Forbidden'
    },
    {
        CODE: 404,
        MSG: 'Not Found'
    },
    {
        CODE: 408,
        MSG: 'Request Timeout'
    },
    {
        CODE: 500,
        MSG: 'Internal Server Error'
    },
    {
        CODE: 502,
        MSG: 'Bad Gateway'
    },
    {
        CODE: 503,
        MSG: 'Service Unavailable'
    }
];