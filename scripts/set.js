window.onload = function() {

    /* GLOBAL VARIABLES */
    const menuView = document.getElementById("menu-view");  // main menu screen
    const gameView = document.getElementById("game-view");  // game screen
    const startGame = document.getElementById("start");     // start button
    const mainMenu = document.getElementById("back");       //main menu button

    /* FUNCTION DEFINITIONS */
    function game() {   //swapping visibility from menu to game by adding and removing a hidden class
        menuView.classList.add("hidden");
        gameView.classList.remove("hidden");
    }

    function menu() {   // swapping visibility from game to menu by adding and removing a hidden class
        gameView.classList.add("hidden");
        menuView.classList.remove("hidden");
    }

    /* MAIN FUNCTION - Beginning of Program */
    function main() {
        startGame.addEventListener("click", function() {
            game();
        })

        mainMenu.addEventListener("click", function() {
            menu();
        })
    }
    
    main();
}