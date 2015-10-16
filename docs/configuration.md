````javascript
exports.getConfig = function () {
    return {
        /* The port number on localhost, on which Scoundrel will listen to your requests. */
        port: 4343,
        /* Route definitions */
        routes: [
            {
                /* The path will be resolved against regular expression. If no match,
                 * Scoundrel will return status of 500 along with JSON object containing message 'path not matched'
                 * */
                pathPattern: "/customers/list",
                /* The method will be matched. If no match, Scoundrel will return status of 500
                 * with JSON object containing message 'method not matched'
                 * */
                method: "GET",
                /* Supported statuses required from Scoundrel in response:
                 * 200, 206, 301, 302, 304, 307 - Scoundrel will return required data model - see below along with
                 * required status code and status message in headers
                 * 400, 401, 403, 404, 408, 500, 502, 503 - Scoundrel will return apropriate status code and message
                 * and empty response
                 * */
                requiredStatus: 200,
                /* Set the data you want to have in response */
                responseData: {
                    /* number of model entities returned in array */
                    entityCount: 5,
                    /* if set to true, Scoundrel will modify the fields on each entity object
                     * and return non-uniform data. Otherwise all returned entities will look alike
                     * if set to 0, a valid empty JSON object or array will be returned */
                    modifyRandomly: true,
                    /* If set to true, the entity will be returned in array even if there is none or just one */
                    alwaysReturnArray: true,
                    /* the sample data model
                     * Scoundrel will try to mimic it. */
                    dataModel: {
                        /* If you put integer number somewhere, Scoundrel will use same number of digits and preserve integer type */
                        CustomerId: 1756,
                        /* If you put float number somewhere, Scoundrel will try to mimic the float number and preserve float type */
                        Height: 3.25,
                        /* Any string field - Scoundrel will return 'ugly' randomly generated string.
                        * Scoundrel tries to mimic case of the string, so:
                         * - if the string is in all small letters, the random generated will be in all small
                        *  - if it's all big, it will be generated all big
                        *  - if the first letter is big and the rest small, the generated string will look alike
                         * - if the string consists of letters only, will stay letters only
                         * - if it contains numbers, it will most likely contain some
                        * */
                        FirstName: "Stanley",
                        SurName: "Bourneigh",
                        /* String matching common e-mail pattern.
                         * Scoundrel will return randomly generated e-mails matching e-mail pattern for this field
                         * E-mails are generated all small letters, no numbers in it
                         * */
                        Email: "stan.bon@gmail.com",
                        /* If the field matches US Domestic, US Local or Czech telephone number pattern
                         * Scoundrel will mimic it and return randomly generated phone number corresponding to the
                         * same pattern. Feel free to implement yours.
                         * */
                        Phone: "(541) 754-3011",
                        /* You can put a nested object of course. The rules for mimicking particular fields are still
                        * the same as stated above for primitive types
                        * */
                        Contract: {
                            Type: "CDN 123",
                            Length: 3,
                            Discount: 0.15
                        },
                        /* And let us nest some more */
                        Interests: [
                            1,
                            2.23,
                            'movies',
                            /* object inside array works */
                            {
                                interestKind: 0
                            },
                            /* array inside array works as well */
                            [
                                '$ 125.6', '150 CZK', '15 m'
                            ]
                        ]
                    }
                }
            },
            /* route returning a predefined string instead of JSON */
            {
                pathPattern: "/static/string",
                method: "GET",
                requiredStatus: 200,
                responseString: '<!DOCTYPE html><html xmlns="http://www.w3.org/1999/xhtml" xml:lang="cs" lang="cs"><head><title>Some Page</title></head><body></body></html>'
            }
        ]
    }
};
````
