const request = require("request");

function createBadRequestResponse() {
    return createResponse(400);
}

function createConflictResponse(userMessage) {
    return createResponse(409, {
        "version": "1.0.0",
        "status": 409,
        "userMessage": userMessage
    });
}

function createInternalServerErrorResponse() {
    return createResponse(500);
}

function createOKResponse() {
    return createResponse(200);
}

function createResponse(statusCode, body) {
    return {
        status: statusCode,
        body: body || {}
    };
}

function getEnvironmentVariable(name) {
    const value = process.env[name];

    if (!value) {
        throw new Error(`InvalidSetting: ${name} is missing.`);
    }

    return value;
}

function isSuccessStatusCode(statusCode) {
    return statusCode >= 200 && statusCode < 300;
}

module.exports = function (context, req) {
    if (!req.body || !req.body.account) {
        context.res = createBadRequestResponse();
        context.done();
        return;
    }

    const userAgent = getEnvironmentVariable("HIBP_API_USER_AGENT");

    request.get({
        url: `https://haveibeenpwned.com/api/v2/breachedaccount/${encodeURIComponent(req.body.account)}`,
        headers: {
            "User-Agent": userAgent
        }
    }, function (err, response) {
        if (err || (!isSuccessStatusCode(response.statusCode) && response.statusCode !== 404)) {
            context.res = createInternalServerErrorResponse();
            context.done();
            return;
        }

        if (response.statusCode === 200) {
            context.res = createConflictResponse("This registration attempt has been blocked because the user account that you're using has been disclosed through a data breach.");
            context.done();
            return;
        }

        context.res = createOKResponse();
        context.done();
    });
};
