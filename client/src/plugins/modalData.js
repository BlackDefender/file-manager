import store from '../store/index';

let currentModalName;
let currentResolve;

store.subscribe((mutation, state) => {
    if (mutation.type === `${currentModalName}/hide`) {
        currentResolve({ ...state[currentModalName].formData });
    }
});

async function modalData(modalName) {
    return new Promise((resolve) => {
        currentModalName = modalName;
        currentResolve = resolve;
        store.commit(`${currentModalName}/show`);
    });
}

export default modalData;
