window.onload = function() {

    /* GLOBAL SCOPE VARIABLES */
    const menuView = document.getElementById("menu-view");  // main menu screen
    const gameView = document.getElementById("game-view");  // game screen
    const menuBtn = document.getElementById("back");        // back to main menu button
    const startBtn = document.getElementById("start");      // start button


    /* FUNCTION DEFINITIONS */
    function game() {   //swapping visibility from menu to game by adding and removing a hidden class
        menuView.classList.add("hidden");
        gameView.classList.remove("hidden");
    }

    function menu() {   // swapping visibility from game to menu by adding and removing a hidden class
        gameView.classList.add("hidden");
        menuView.classList.remove("hidden");
    }

    function timer() {
        /* 
            get the user selected value of time (in seconds) from the dropdown
            track two variables, the minutes place and seconds place
            minute [0, 5] and seconds [0, 59]
            Special case: if user selectes "unlimited" then the timer starts at 0:00 and increments each second
        */
    }

    /* MAIN FUNCTION - Beginning of Program */
    function main() {
        startBtn.addEventListener("click", function() {
            /* when the start button is pressed, the set counter should equal 0, the timer should 
            start based on the time selected and the view should change to game view */
            // set count is 0
            let set = 0;
            // call timer function
            game();
        })

        menuBtn.addEventListener("click", function() {
            menu();
        })
    }
    
    main();
}