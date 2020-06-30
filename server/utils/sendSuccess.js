exports.sendSuccess = (response, data) => {
    const responseObject = { status: 'success' };
    if (data) responseObject.data = data;
    response.json(responseObject);
};
