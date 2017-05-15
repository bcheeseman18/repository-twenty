//taxi
/**
 * *Crazy Taxi Phase One*
Create an app with at least one model and at least one view that keeps track of a player inside of a grid. 
The grid should be 20x20 and the player's location should be represented using x and y coordinates. 
You should have an up, down, left, and right button that adjust the location (though players can't leave the 20x20 box). 
You should also keep track of the vehicles fuel, which decreases by one every move.
Lastly, you should display the grid on the screen and visually highlight the box that the player is currently in.
 * 
 */

window.addEventListener('load', function () {

    // 1. Create an instance of a model 
    // 2. Create an instance of a view
    // 3. Render the view once at the beginning

    let taxiModel = require('./taximodel'); //taxiModel/taxiView is a constructor. both words should be capitalized
    let taxiView = require('./taxiview');
    let taxi2View = require('./taxi2view');
    let passView = require('./passview'); 
    let endView = require('./endview'); 

    let taxiGrid = new taxiModel(); // 1. Create an instance of a model 
    taxiGrid.fuel = 30;
    taxiGrid.x = 0;
    taxiGrid.y = 0;
    taxiGrid.type = 'hybrid';
    taxiGrid.fare = 10;
    taxiGrid.passx = Math.floor(Math.random() * 19); 
    taxiGrid.passy = Math.floor(Math.random() * 19); 
    taxiGrid.final = 0; 
    taxiGrid.end = ''; 

    let tv = new taxiView({ // 2. Create an instance of a view
        // Anytime I create a view, I specify whwere it shows up in the DOM (el) and what 
        // data it uses to render (model)
        el: document.querySelector('#fuelsec'), //'el' = 'element'
        model: taxiGrid, //creates model, connects el and model
    });

    tv.render();  // 3. Render the view once at the beginning, 
    //calling the render function from the view file

    let tv2 = new taxi2View({
        el: document.querySelector('#type'),
        model: taxiGrid,
    });

    tv2.render();

    let pv = new passView({
        el: document.querySelector('#passloc'),
        model: taxiGrid, 
    }); 

    pv.render(); 

    let sel = document.querySelector('.passenger');
    sel.classList.remove('passenger');
    let cont = document.querySelector('.grid-container');
    cont.rows[taxiGrid.passy].cells[taxiGrid.passx].classList.add('passenger');

    let ev = new endView({
        el: document.querySelector('#gameOver'),
        model: taxiGrid, 
    });

    ev.render(); 


    let leftBtn = document.querySelector('#left');
    let rightBtn = document.querySelector('#right');
    let upBtn = document.querySelector('#up');
    let downBtn = document.querySelector('#down');
    let hybrid = document.querySelector('.hybrid');
    let guzzler = document.querySelector('.guzzler');


    hybrid.addEventListener('change', function () {
        taxiGrid.type = 'hybrid';
        taxiGrid.fare -= 10;
    });

    guzzler.addEventListener('change', function () {
        taxiGrid.type = 'guzzler';
        taxiGrid.fare += 10;
    });

    leftBtn.addEventListener('click', function () {
        taxiGrid.x -= 1;
        // taxiGrid.fuel -= 1;
        if (taxiGrid.type === 'hybrid') {
            taxiGrid.fuel -=1; 
        } else {
            taxiGrid.fuel -= 2; 
        }
    });

    rightBtn.addEventListener('click', function () {
        taxiGrid.x += 1;
        // taxiGrid.fuel -= 1;
        if (taxiGrid.type === 'hybrid') {
            taxiGrid.fuel -= 1;
        } else {
            taxiGrid.fuel -= 2;
        }
    });

    upBtn.addEventListener('click', function () {
        taxiGrid.y -= 1;
        // taxiGrid.fuel -= 1;
        if (taxiGrid.type === 'hybrid') {
            taxiGrid.fuel -= 1;
        } else {
            taxiGrid.fuel -= 2;
        }
    });

    downBtn.addEventListener('click', function () {
        taxiGrid.y += 1;
        // taxiGrid.fuel -= 1;
        if (taxiGrid.type === 'hybrid') {
            taxiGrid.fuel -= 1;
        } else {
            taxiGrid.fuel -= 2;
        }
    });

    taxiGrid.on('change', function () {
        console.log('hello');
        let sel = document.querySelector('.highlight');
        sel.classList.remove('highlight');
        let cont = document.querySelector('.grid-container');
        cont.rows[taxiGrid.y].cells[taxiGrid.x].classList.add('highlight');
    });

    taxiGrid.on('change', function () {
        console.log('hello');
        let selpass = document.querySelector('.passenger');
        selpass.classList.remove('passenger');
        let contpass = document.querySelector('.grid-container');
        contpass.rows[taxiGrid.passy].cells[taxiGrid.passx].classList.add('passenger');
    });
}); 