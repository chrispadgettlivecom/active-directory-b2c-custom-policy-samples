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
        url: "https://api.sendgrid.com/v3/mail/send",
        auth: {
            bearer: getEnvironmentVariable("SENDGRID_API_KEY")
        },
        body: {
            personalizations: [
                {
                    to: [
                        {
                            email: getEnvironmentVariable("SENDGRID_TO_MAIL_ADDRESS")
                        }
                    ]
                }
            ],
            from: {
                email: getEnvironmentVariable("SENDGRID_FROM_MAIL_ADDRESS")
            },
            subject: "User Registered",
            content: [
                {
                    type: "text/plain",
                    value: `A new user '${req.body.email}' has registered.`
                }
            ]
        },
        json: true
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
