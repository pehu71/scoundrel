````javascript
exports.getConfig = function ()  {
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
                     * Scoundrel will try to mimic it.
                      * */
                    dataModel: { // todo: implement float, array, object
                        /* If you put number somewhere, Scoundrel will use same number of digits and preserve integer type */
                        CustomerId: 1756,
                        /* Any string field - Scoundrel will return 'ugly' randomly generated string. */
                        FirstName: "Stanley",
                        SurName: "Bonnett",
                        /* String matching common e-mail pattern.
                         * Scoundrel will return randomly generated e-mails matching e-mail pattern for this field.
                          * */
                        Email: "stan.bon@gmail.com",
                        /* If the field matches US Domestic, US Local or Czech telephone number pattern
                         * Scoundrel will mimic it and return randomly generated phone number corresponding to the
                          * same pattern.
                          * Feel free to implement yours.
                          * */
                        Phone: "(541) 754-3011"
                    }
                }
            }
        ]
    }
};
````
