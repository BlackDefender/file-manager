import eventBus from '../plugins/eventBus';

const processResponse = (response, cb) => {
    if (response instanceof Error) {
        eventBus.emit('log', 'error', response.message);
    } else if (response.data.status === 'success') {
        cb(response.data);
    } else {
        eventBus.emit('log', 'error', response.data.message);
    }
};

export default processResponse;
