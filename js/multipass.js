let Collection = require('ampersand-collection');
let PassModel = require('./passmodel');

    module.exports = Collection.extend({
    model: PassModel,
    }); 