const util = require('util')
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');

const config = require('./config.js');

const { requestedPath } = require('./utils/requestedPath');
const { sendError } = require('./utils/sendError');
const { sendSuccess } = require('./utils/sendSuccess');

const port = 3000;
const uploadsDirPath = '../uploads';

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use("/", express.static("../client/dist"));

app.get('/', (request, response) => {
    const indexFilePath = path.resolve('../client/dist/index.html');
    response.sendFile(indexFilePath);
});

/*
* /directory/add
* path=relative/path/to/new/directory
* */
app.post('/api/directory', (request, response) => {
    const newDirectoryPath = requestedPath(request);
    fs.mkdir(newDirectoryPath, (err) => {
        if (err) return sendError(response, err);
        sendSuccess(response);
    });
});

/*
* /directory?dir=relative/path/to/directory
* /directory - show root directory
* */
app.get('/api/directory', (request, response) => {
    const dirPath = requestedPath(request);
    fs.readdir(dirPath, {withFileTypes: true}, (err, files) => {
        if (err) return sendError(response, err);
        const dir = files
            .map((dirent) => {
                const dirItem = {
                    name: dirent.name,
                    type: dirent.isDirectory() ? 'directory' : 'file',
                };
                if (dirent.isFile()) {
                    dirItem.ext = path.parse(dirent.name).ext.toLowerCase().replace('.', '');
                }
                return dirItem;
            })
            .sort((a, b) => {
                if(a.type !== b.type) {
                    return a.type === 'directory' ? -1 : 1;
                }
                return 0;
            });
        response.json({
            status: 'success',
            data: dir,
        });
    });
});

app.put('/api/directory', (request, response) => {
    const oldDirectoryPath = requestedPath(request);
    const newDirectoryName = request.body.name;
    const baseDirectory = path.parse(oldDirectoryPath)['dir'];
    const newDirectoryPath = path.resolve(baseDirectory, newDirectoryName);
    fs.rename(oldDirectoryPath, newDirectoryPath, (err) => {
        if (err) return sendError(response, err);
        sendSuccess(response);
    });
});

app.delete('/api/directory', (request, response) => {
    const dirPath = requestedPath(request);
    fs.rmdir(dirPath, {recursive: true}, (err) => {
        if (err) return sendError(response, err);
        sendSuccess(response);
    });
});

app.post('/api/file/upload', (request, response) => {
    if (request.files.attachment) {
        const dir = requestedPath(request);
        const filePath = path.resolve(dir, request.files.attachment.name);
        request.files.attachment.mv(filePath, (err) => {
            if (err) return sendError(response, err);
            sendSuccess(response);
        });
    } else {
        sendError(response, null, 'field "attachment" is empty');
    }
});

app.post('/api/file/remote-upload', (request, response) => {
    if (request.body.url) {
        console.log(request.body.url);
        axios({
            method: 'get',
            url: decodeURIComponent(request.body.url),
            responseType: 'stream'
        })
            .then(function (response) {
                const contentType = response.headers['content-type'];
                if (config.allowedMimeTypes.includes(contentType)) {
                    const filePath = path.resolve(uploadsDirPath, 'ada_lovelace.jpg');
                    try {
                        response.data.pipe(fs.createWriteStream(filePath));
                    }
                    catch (e) {
                        console.log('oops!');
                    }
                }
                //console.log(response);
                //
            })
            .catch((error) => {
                console.log('this error');
                console.log(error);
            });
    }
    response.send('feature is under construction');
});

app.delete('/api/file', (request, response) => {
    const path = requestedPath(request);
    fs.unlink(path, (err) => {
        if (err) return sendError(response, err);
        sendSuccess(response);
    });
});

app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err);
    }
    console.log(`server is listening on ${port}`);
});
