/*
    this testing file requires jasmine-node to be installed locally in scoundrel directory
    this test is valid against unchanged original config.js file
*/
var request = require('request');

describe('request for string', function () {

    it('should return pre-defined string for "/static/string" route', function (done) {
        request("http://localhost:4343/static/string", function(error, response, body){
            expect(body).toBe('<!DOCTYPE html><html xmlns="http://www.w3.org/1999/xhtml" xml:lang="cs" lang="cs"><head><title>Some Page</title></head><body></body></html>');
            done();
        });
    });

});

describe('request for HTML file', function () {

    it('should return proper Content-Type header and response length', function (done) {
        request("http://localhost:4343/static/static-example", function(error, response, body){
            expect(response.headers['content-type']).toBe('text/html; charset=utf-8');
            expect(response.headers['content-length']).toEqual('298');
            done();
        });
    });

});

describe('request for JPG file', function () {

    it('should return proper Content-Type header and response length', function (done) {
        request("http://localhost:4343/static/jawa", function(error, response, body){
            expect(response.headers['content-type']).toBe('image/jpeg');
            expect(response.headers['content-length']).toEqual('12384');
            done();
        });
    });

});

describe('request for JSON response', function () {

    it('should return proper Content-Type header and response length', function (done) {
        request("http://localhost:4343/customers/list", function(error, response, body){
            expect(response.headers['content-type']).toBe('application/json');
            var jsonObj = JSON.parse(body);
            expect(Array.isArray(jsonObj)).toBe(true);
            expect(jsonObj.length).toBe(5);
            var obj = jsonObj[0];
            expect(obj.hasOwnProperty('CustomerId')).toBe(true);
            expect(obj.hasOwnProperty('Height')).toBe(true);
            expect(obj.hasOwnProperty('FirstName')).toBe(true);
            expect(obj.hasOwnProperty('SurName')).toBe(true);
            expect(obj.hasOwnProperty('Email')).toBe(true);
            expect(obj.hasOwnProperty('Phone')).toBe(true);
            expect(obj.hasOwnProperty('Contract')).toBe(true);
            expect(obj.hasOwnProperty('Interests')).toBe(true);
            done();
        });
    });

});