"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpHeaderTypes = exports.ResponseHeaders = void 0;
var ResponseHeaders;
(function (ResponseHeaders) {
    ResponseHeaders["TEXT_HTML"] = "text/html;charset=utf8;";
    ResponseHeaders["JAVASCRIPT"] = "text/javascript;charset=utf8;";
    ResponseHeaders["CSS"] = "text/css;charset=utf8;";
    ResponseHeaders["JSON"] = "text/json;charset=utf8;";
    ResponseHeaders["Image"] = "image/*";
})(ResponseHeaders = exports.ResponseHeaders || (exports.ResponseHeaders = {}));
var HttpHeaderTypes;
(function (HttpHeaderTypes) {
    HttpHeaderTypes["CONTENT_TYPE"] = "Content-Type";
})(HttpHeaderTypes = exports.HttpHeaderTypes || (exports.HttpHeaderTypes = {}));
