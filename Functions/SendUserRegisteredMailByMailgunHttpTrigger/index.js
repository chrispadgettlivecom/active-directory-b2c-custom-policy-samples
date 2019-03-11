const request = require("request");

function createBadRequestResponse() {
    return createResponse(400);
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
    if (!req.body || !req.body.email) {
        context.res = createBadRequestResponse();
        context.done();
        return;
    }

    request.post({
        url: `${getEnvironmentVariable("MAILGUN_API_BASE_URL")}/messages`,
        auth: {
            user: "api",
            pass: getEnvironmentVariable("MAILGUN_API_KEY")
        },
        form: {
            "from": getEnvironmentVariable("MAILGUN_FROM_MAIL_ADDRESS"),
            "to": getEnvironmentVariable("MAILGUN_TO_MAIL_ADDRESS"),
            "subject": "User Registered",
            "text": `A new user '${req.body.email}' has registered.`
        }
    }, function (err, response) {
        if (err || !isSuccessStatusCode(response.statusCode)) {
            context.res = createInternalServerErrorResponse();
            context.done();
            return;
        }

        context.res = createOKResponse();
        context.done();
    });
};
