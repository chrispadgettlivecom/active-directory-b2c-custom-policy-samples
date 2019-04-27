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
    if (!req.body || !req.body.clientId || !req.body.policyId || !req.body.userId) {
        context.res = createBadRequestResponse();
        context.done();
        return;
    }

    request.post({
        url: `https://api.keen.io/3.0/projects/${getEnvironmentVariable("KEEN_PROJECT_ID")}/events/registrations`,
        headers: {
            "Authorization": getEnvironmentVariable("KEEN_WRITE_KEY")
        },
        body: {
            client: {
                id: req.body.clientId
            },
            policy: {
                id: req.body.policyId
            },
            request: {
                ip: req.body.requestIp
            },
            user: {
                id: req.body.userId,
                email: req.body.userEmail,
                phone_number: req.body.userPhoneNumber
            }
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
