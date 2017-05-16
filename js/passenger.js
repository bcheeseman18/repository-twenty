
const View = require('ampersand-view');


module.exports = View.extend({
    template: document.querySelector('#view-passenger').innerHTML,

    bindings: {
        'model.name': '.name',
        'model.occupation': '.occupation',
        'model.status': '.status',
    },
});