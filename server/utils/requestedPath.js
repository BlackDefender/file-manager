const path = require('path');
const { uploadsDirPath } = require('../config');

exports.requestedPath = (request) => {
    let relativePath;
    if (request.method === 'GET') {
        relativePath = request.query.path || '';
    } else {
        relativePath = request.body.path || '';
    }
    return path.resolve(uploadsDirPath,relativePath);
};
