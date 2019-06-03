import Message from './message.js';

let instance;

function notice({duration=1.5, content=""}) {
    instance = instance || Message.newInstance();
    instance.add({
        content,
        duration
    })
}

export default {
    init(options) {
        return notice(options);
    }
}