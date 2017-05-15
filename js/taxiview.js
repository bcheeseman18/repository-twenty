
// views present data - wits what the user sees and interacts with.
// (buttons, sliders, text). All DOM stuff goes here. 
// - template (html and dom elements)
// - events (click, etc)
// - bindings 

let View = require('ampersand-view'); 

module.exports = View.extend({
//template is defining what the view looks like in the DOM
    template: document.querySelector('#taxi-template').innerHTML,
// bindings Tie the model to the template 
    bindings: {
        //bindings should look like model.property : querySelector for where it goes 
        'model.fuel': '.fuel', 
        'model.x': '.xcor', 
        'model.y': '.ycor',
    }, 
    // Render: Gets called whenever the model changes. What needs to update
    render: function () {
        // 'Use the template I already defined to render.'
        this.renderWithTemplate(); 

    }, 

}); 