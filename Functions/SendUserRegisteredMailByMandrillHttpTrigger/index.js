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
        url: "https://mandrillapp.com/api/1.0/messages/send.json",
        form: {
            key: getEnvironmentVariable("MANDRILL_API_KEY"),
            message: {
                text: `A new user '${req.body.email}' has registered.`,
                subject: "User Registered",
                from_email: getEnvironmentVariable("MANDRILL_FROM_MAIL_ADDRESS"),
                to: [
                    {
                        email: getEnvironmentVariable("MANDRILL_TO_MAIL_ADDRESS"),
                        type: "to"
                    }
                ]
            }
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
