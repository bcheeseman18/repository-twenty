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
    let mpView = require('./multipassview'); 
    let passengerView = require('./passenger'); 

    let passModel = require('./passmodel'); 
    let multiPass = require('./multipass'); 

    let passengers = new multiPass(); 

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

    let mp = new mpView ({
        el: document.querySelector(), 
        model: passengers, 
    }); 

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
            taxiGrid.fuel -= 1;
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

    taxiGrid.on('change:fuel', function () {
        if (taxiGrid.x === taxiGrid.passx && taxiGrid.y === taxiGrid.passy) {
            taxiGrid.passx = Math.floor(Math.random() * 19);
            taxiGrid.passy = Math.floor(Math.random() * 19);
            passengers.generatePass();
            passengers.updatePass('pickedUp');
            taxiGrid.final += taxiGrid.fare;
            console.log('picked up');
        }
        if (taxiGrid.fuel <= 0) {
            taxiGrid.fuel = 0;
            taxiGrid.end = 'Game Over!'; 
        }

    });


     function generatePass () {
        this.add(new PassModel({
            name: namesList(),
            occupation: jobsList(),
            status: 'waiting',
        }));
    }

    function namesList () {
        let names = ['Jim', 'Dwight', 'Michael', 'Pam', 'Phylis', 'Erin', 'Stanley', 'Creed']
        let pickName = names[Math.floor(Math.random() * names.length)];
        return pickName;
    }

    function jobsList() {
        let jobs = ['paper salesman', 'karate instructor', 'business owner', 'manager', 'quality control', 'bike salesman', 'receptionist'];
        let pickJob = jobs[Math.floor(Math.random() * jobs.length)];
        return pickJob;
    }

    function updatePass (status) {
        this.at(this.length - 1).status = status;
    }

}); 