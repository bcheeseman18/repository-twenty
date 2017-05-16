
const View = require('ampersand-view');

const PassengerView = require('./passenger');

module.exports = View.extend({
    template: document.querySelector('#multi-passengers').innerHTML,
    
    render() {
        this.renderWithTemplate();
        this.renderCollection(this.collection, PassengerView, this.el.querySelector('ul'));
    }
});