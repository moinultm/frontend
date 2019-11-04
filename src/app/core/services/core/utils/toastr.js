"use strict";
exports.__esModule = true;

function success(title, content, toastr) {
    toastr.success(content, title);
}
exports.success = success;

function error(title, content, toastr) {
    toastr.error(content, title);
}
exports.error = error;

function warning(title, content, toastr) {
    toastr.warning(content, title);
}
exports.warning = warning;

function info(title, content, toastr) {
    toastr.info(content, title);
}
exports.info = info;
