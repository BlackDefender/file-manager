exports.sendError = (response, err, message) => {
    const responseObject = { status: 'error' };
    if (err) responseObject.message = err.message;
    if (message) responseObject.message = message;
    response.json(responseObject);
};
