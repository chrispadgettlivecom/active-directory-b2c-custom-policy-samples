const crypto = require("crypto");

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
    if (!req.body || !req.body.password) {
        context.res = createBadRequestResponse();
        context.done();
        return;
    }

    const hash = crypto.createHash("sha1");
    hash.update(req.body.password);
    const passwordHash = hash.digest("hex").toUpperCase();
    const passwordHashPrefix = passwordHash.slice(0, 5);
    const passwordHashSuffix = passwordHash.slice(5);
    const userAgent = getEnvironmentVariable("HIBP_API_USER_AGENT");

    request.get({
        url: `https://api.pwnedpasswords.com/range/${encodeURIComponent(passwordHashPrefix)}`,
        headers: {
            "User-Agent": userAgent
        }
    }, function (err, response, responseBody) {
        if (err || !isSuccessStatusCode(response.statusCode)) {
            context.res = createInternalServerErrorResponse();
            context.done();
            return;
        }

        const pwnedPasswords = responseBody.split("\n");

        pwnedPasswords.forEach(function (pwnedPassword) {
            const pwnedPasswordHashSuffix = pwnedPassword.slice(0, 35);

            if (pwnedPasswordHashSuffix === passwordHashSuffix) {
                context.res = createConflictResponse("This registration attempt has been blocked because the user password that you're using has been disclosed through a data breach.");
                context.done();
                return;
            }
        });

        context.res = createOKResponse();
        context.done();
    });
};
