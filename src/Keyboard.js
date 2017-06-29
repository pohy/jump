let keyboard = null;

export default class Keyboard {
    constructor() {
        window.addEventListener('keydown', this.onKey);
        window.addEventListener('keypress', this.onKey);
        window.addEventListener('keyup', this.onKey);

        this.listeners = [];
        this.id = 0;
    }

    static getInstance() {
        if (!keyboard) {
            keyboard = new Keyboard();
        }
        return keyboard;
    }

    onKey = ({type, key}) => {
        this.listeners
            .filter(keyAndType)
            .forEach(call);

        function call({callback}) {
            callback();
        }

        function keyAndType({type: listenerType, key: listenerKey}) {
            return listenerType === type && listenerKey === key;
        }
    };

    onPress(key, callback) {
        return this._addKeyListener(key, 'keypress', callback);
    }
    onDown(key, callback) {
        return this._addKeyListener(key, 'keydown', callback);
    }
    onUp(key, callback) {
        return this._addKeyListener(key, 'keyup', callback);
    }
    _addKeyListener(key, type, callback) {
        this.listeners.push(new KeyboardListener(type, key, this.id, callback));
        return this.id++;
    }
};

class KeyboardListener {
    constructor(type, key, id, callback) {
        this.type = type;
        this.key = key;
        this.id = id;
        this.callback = callback;
    }
}
