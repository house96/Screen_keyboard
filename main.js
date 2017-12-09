Keyboard.model =[];

function Keyboard() {

};

Keyboard.keyRender = function(target, keys) {
    var row;
    for (var i = 0; i < keys.length; i++) {
        this.model.push([]);
        row = document.createElement('div');
        row.classList.add('keyboard__row');
        target.appendChild(row);

        for (var j = 0; j < keys[i].length; j++) {
            this.model[i].push(new Key({
                value: keys[i][j],
                callback: function() {},
                target: row
            }));
    }
}
}

Keyboard.render = function(target, keys=[]) {
    if (target === undefined) {
        return;
    }
    var container = document.createElement('div');
    container.classList.add('keyboard__container');
    Keyboard.keyRender(container, keys);

        target.appendChild(container);

}
function Key(options) {
    if(options.callback === undefined) {
        callback = function() {};
    }
    this.value = options.value;
    this.callback = options.callback;
    this.render = function() {
        var key = document.createElement('div');

        key.classList.add('keyboard__key');
        key.innerHTML = this.value;
        key.addEventListener('click', this.callback);

        options.target.appendChild(key);
    };
    this.render();
}

window.onload = function () {
    var keyboardData = [
        ['q', 'w', 'e'],
        ['a', 's', 'd'],
        ['z', 'x', 'c']
    ];

    var keyboard = document.querySelector('#keyboard');
    Keyboard.render(keyboard, keyboardData);

    
    }
