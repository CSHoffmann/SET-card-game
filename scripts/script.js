window.onload = function() {

    /* GLOBAL SCOPE VARIABLES */
    const menuView = document.getElementById("menu-view");  // main menu screen
    const gameView = document.getElementById("game-view");  // game screen
    const menuBtn = document.getElementById("back");        // back to main menu button
    const startBtn = document.getElementById("start");      // start button
    const displayTime = document.getElementById("time");    // display for time in game view
    const gameBoard = document.getElementById("game");      // game board


    /* FUNCTION DEFINITIONS */
    function game() {   //swapping visibility from menu to game by adding and removing a hidden class
        menuView.classList.add("hidden");
        gameView.classList.remove("hidden");

        for(i = 0; i < 12; i++) { // creates 12 divs with class "card" and appends them to game board
            var card = document.createElement("div"); 
            card.classList.add("card"); 
            gameBoard.appendChild(card); 
        }
    }

    function menu() {   // swapping visibility from game to menu by adding and removing a hidden class
        gameView.classList.add("hidden");
        menuView.classList.remove("hidden");

        gameBoard.textContent = ""; // hack that removes all child elements, probably not the best solution but will serve as temp solution
    }

    function startTimer() { // starts timer based on user selected option
       let userTime = document.getElementById("dropdown").value;

       if (userTime == "none") {
           countUpTimer(userTime, displayTime);
       } else {
           countDownTimer(userTime, displayTime);
       }
    }

    function countDownTimer(duration, display) { // timer starts from given time and counts down to 0
        duration = parseInt(duration);
        let timer = setInterval(() => {
            let seconds = duration % 60;
            let minutes = Math.floor(duration / 60);

            seconds = seconds < 10 ? "0"+seconds : seconds; 
            display.textContent = "0"+minutes+":"+seconds; 
            
            if(--duration < 0) { // interval ends once total time falls to 0
                clearInterval(timer);
            }
            if(menuBtn.addEventListener("click", function() {clearInterval(timer)})); // clears timer
        }, 1000);
    }

    function countUpTimer(duration, display) { // timer starts at 0 and increments up indefinitely
        duration = 0;
        let timer = setInterval(() => {
            let seconds = duration % 60;
            let minutes = Math.floor(duration / 60);

            seconds = seconds < 10 ? "0"+seconds : seconds;
            minutes = minutes < 10 ? "0"+minutes : minutes;

            display.textContent = minutes+":"+seconds;
            ++duration; // time increments by 1

            if(menuBtn.addEventListener("click", function() {clearInterval(timer)})); // clears timer
        }, 1000);
    }

    /* MAIN FUNCTION - Beginning of Program */
    function main() {
        startBtn.addEventListener("click", function() {
            startTimer();
            game();
        })

        menuBtn.addEventListener("click", function() {
            menu();
        })
    }
    
    main();
}