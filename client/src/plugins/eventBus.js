const eventBus = (() => {
    const eventsList = {};
    let instance;

    const eventExists = (event) => eventsList[event] instanceof Array;

    const on = (event, callBack) => {
        if (!eventExists(event)) {
            eventsList[event] = [];
        }
        eventsList[event].push(callBack);
        return instance;
    };

    const off = (event, callBack) => {
        if (eventExists(event)) {
            const index = eventsList[event].indexOf(callBack);
            if (index !== -1) eventsList[event].splice(index, 1);
        }
        return instance;
    };

    const emit = (event, ...data) => {
        if (eventExists(event)) {
            eventsList[event].forEach((callBack) => callBack(...data));
        }
        return instance;
    };

    instance = { on, off, emit };

    return instance;
})();

export default eventBus;
