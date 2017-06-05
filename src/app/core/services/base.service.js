"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
require("rxjs/add/observable/throw");
var BaseService = (function () {
    function BaseService(http) {
        this.http = http;
    }
    /**
     * Find an object by its identifier
     * @param id the object identifier
     * @returns gets the object found
     */
    BaseService.prototype.findById = function (id) {
        return this.http.get(this.getServiceUrl() + '/' + id)
            .map(this.extractData);
    };
    /**
     * Find all the elements
     * @returns gets the list of objects found
     */
    BaseService.prototype.findAll = function () {
        return this.http.get(this.getServiceUrl())
            .map(this.extractData);
    };
    /**
     * Delete an object by its identifier field
     * @param id the object identifier
     * @returns gets the response
     */
    BaseService.prototype.delete = function (id) {
        return this.http.delete(this.getServiceUrl() + '/' + id);
    };
    /**
     * Gets an image resource
     * @param id
     * @param imageResourceUrl
     * @param contentType
     * @returns {Observable<R>}
     */
    BaseService.prototype.getImage = function (id, imageResourceUrl, contentType) {
        if (imageResourceUrl === void 0) { imageResourceUrl = '/image'; }
        if (contentType === void 0) { contentType = 'image/jpg'; }
        var headers = new http_1.Headers({ 'Content-Type': contentType });
        var options = new http_1.RequestOptions({ headers: headers, responseType: http_1.ResponseContentType.Blob });
        return this.http.get(this.getServiceUrl() + imageResourceUrl + '/' + id, options).map(function (res) {
            return new Blob([res.blob()], {
                type: res.headers.get('Content-Type')
            });
        });
    };
    /**
     * Insert the data
     * @param data the object containing the data to be inserted
     * @returns gets the response
     */
    BaseService.prototype.insert = function (data) {
        return this.http.post(this.getServiceUrl(), JSON.stringify(data));
    };
    /**
     * Updadte specific object into DB
     * @param fieldId the name of the field that identify the object
     * @param data the object to be updated
     * @returns gets the response
     */
    BaseService.prototype.update = function (fieldId, data) {
        return this.http.put(this.getServiceUrl() + '/' + data[fieldId], JSON.stringify(data));
    };
    /**
     * Extract data that arrives from the response
     * @param res the response
     */
    BaseService.prototype.extractData = function (res) {
        var body = res.json() || {};
        return body.data || body;
    };
    BaseService.prototype.extractBody = function (res) {
        return res.text();
    };
    BaseService.prototype.getBlob = function (res) {
        return res.blob();
    };
    return BaseService;
}());
exports.BaseService = BaseService;
