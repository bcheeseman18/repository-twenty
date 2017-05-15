
// models: store data. Never ever doing DOM stuff here. 

let State = require('ampersand-state'); // how we create models

module.exports = State.extend({

    props: { // 'properties' - will have this in all model files
        fuel: 'number', 
        x: 'number',
        y: 'number', 

        fare: 'number', 
        type: 'string', 

        passx: 'number', 
        passy: 'number',

        final: 'number', 
        end: 'string',  
    },

});

