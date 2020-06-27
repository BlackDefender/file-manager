import eventBus from '../plugins/eventBus';

const processResponse = (response, cb) => {
    if (response instanceof Error) {
        eventBus.emit('log', 'error', response.message);
    } else {
        cb(response.data);
    }
};

export default processResponse;
