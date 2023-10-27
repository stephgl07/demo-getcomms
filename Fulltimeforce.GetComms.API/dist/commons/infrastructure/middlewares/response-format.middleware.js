"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseFormatMiddleware = void 0;
function responseFormatMiddleware(req, res, next) {
    res.reply = (statusCode, data) => {
        const apiResponse = {
            statusCode,
            data
        };
        res.status(statusCode).json(apiResponse);
    };
    next();
}
exports.responseFormatMiddleware = responseFormatMiddleware;
//# sourceMappingURL=response-format.middleware.js.map