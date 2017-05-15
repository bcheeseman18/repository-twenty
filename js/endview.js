let View = require('ampersand-view'); 

module.exports = View.extend({
//template is defining what the view looks like in the DOM
    template: document.querySelector('#end-template').innerHTML,
// bindings Tie the model to the template 
    bindings: {
        //bindings should look like model.property : querySelector for where it goes 
        'model.final': '.finalscore', 
        'model.end': '.endgame', 
    }, 
    // Render: Gets called whenever the model changes. What needs to update
    render: function () {
        // 'Use the template I already defined to render.'
        this.renderWithTemplate(); 

    }, 

}); 