function Keyboard() {
    var _model = [];

    this.getModel = function () {
        return _model;
    }

    this.setModel = function (value) {
        _model = value;
    }

    this.pushModel = function (value) {
        _model.push(value);

        return _model;
    }
    this.tabButton = function () {

    }

    this.capsButton = function () {

        for (var i = 0; i < _model.length; i++) {
            for (var j = 0; j < _model[i].length; j++) {
                _model[i][j].value = _model[i][j].value.toUpperCase();

            }
        }
    }
    this.updateValue = function () {
        for (var i = 0; i < _model.length; i++) {
            for (var j = 0; j < _model[i].length; j++) {
                _model[i][j].element.innerHTML = _model[i][j].value;

            }
        }
    }
};

Keyboard.keyRender = function (target, keys) {
    var row;
    for (var i = 0; i < keys.length; i++) {
        new Key().pushModel([]);
        row = document.createElement('div');
        row.classList.add('keyboard__row');
        target.appendChild(row);

        for (var j = 0; j < keys[i].length; j++) {
            var model = new Key().getModel();
            model[i].push(new Key({
                value: keys[i][j].value,
                callback: keys[i][j].callback || keys.callbacks.input,
                target: row,
                element: null
            }));
            new Key().setModel(model);
        }
    }
}
Key.prototype = new Keyboard();
Keyboard.render = function (target, keys = []) {
    if (target === undefined) {
        return;
    }
    var container = document.createElement('div');
    container.classList.add('keyboard__container');
    Keyboard.keyRender(container, keys);

    target.appendChild(container);

}

function Key(options = {}) {
    if (options.callback === undefined) {
        options.callback = function () {};
    }
    this.value = options.value;
    this.callback = options.callback;
    this.render = function () {
        options.element = document.createElement('div');

        options.element.classList.add('keyboard__key');
        options.element.innerHTML = this.value;
        options.element.addEventListener('click', this.callback);
        this.element = options.element;
        if (options.target) {
            options.target.appendChild(options.element);
        }
    }

    this.render();
}

window.onload = function () {
    var callbacks = {
        caps: function () {
            new Key().capsButton();
            new Key().updateValue();
        },
        tab: function () {
            console.log(this, 'tab')
        },
        input: function () {
            console.log(this, 'input');
        }
    }
    var keyboardData = [
        [{
            value: 'Tab',
            callback: callbacks.tab
        }, {
            value: 'q'
        }, {
            value: 'w'
        }, {
            value: 'e'
        }],
        [{
            value: 'Caps',
            callback: callbacks.caps
        }, {
            value: 'a'
        }, {
            value: 's'
        }, {
            value: 'd'
        }],
        [{
            value: 'Shft'
        }, {
            value: 'z'
        }, {
            value: 'x'
        }, {
            value: 'c'
        }]
    ];

    keyboardData.callbacks = callbacks;
    var keyboard = document.querySelector('#keyboard');
    Keyboard.render(keyboard, keyboardData);

}